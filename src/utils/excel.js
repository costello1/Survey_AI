// src/utils/updateExcel.js
import * as XLSX from 'xlsx';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Aggiorna un file Excel in Firebase Storage con nuovi dati del sondaggio.
 *
 * @param {string} surveyType - Il tipo/nome del sondaggio (es. 'AISurvey').
 * @param {Object} data - I dati del sondaggio da aggiungere.
 */
const updateExcel = async (surveyType, data) => {
  const storage = getStorage();
  const fileName = `${surveyType}.xlsx`;
  const fileRef = ref(storage, fileName);

  let workbook;

  try {
    // Tenta di ottenere il file Excel esistente
    const url = await getDownloadURL(fileRef);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch Excel file: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);
    workbook = XLSX.read(fileData, { type: 'array' });
  } catch (error) {
    if (error.code === 'storage/object-not-found') {
      // Se il file non esiste, crea un nuovo workbook e foglio
      workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([]), 'Surveys');
    } else {
      console.error('Error fetching the Excel file:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante
    }
  }

  // Accede al foglio 'Surveys' o lo crea se non esiste
  let worksheet = workbook.Sheets['Surveys'];
  if (!worksheet) {
    worksheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Surveys');
  }

  // Aggiunge i nuovi dati al foglio 'Surveys'
  XLSX.utils.sheet_add_json(worksheet, [data], { skipHeader: true, origin: -1 });

  // Scrive il workbook aggiornato in un buffer
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  // Carica il file Excel aggiornato nuovamente su Firebase Storage
  await uploadBytes(fileRef, blob);
};

export default updateExcel;
