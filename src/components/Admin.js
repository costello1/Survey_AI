// src/components/Admin.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import * as XLSX from 'xlsx';
import '../styles/Survey.css';

const Admin = () => {
  const [message, setMessage] = useState('');

  /**
   * Genera un file Excel per il sondaggio AISurvey recuperando i dati da Firestore.
   *
   * @param {string} surveyType - Il tipo/nome del sondaggio (es. 'AISurvey').
   */
  const generateExcel = async (surveyType) => {
    try {
      console.log(`Inizio generazione Excel per: ${surveyType}`);
      const q = query(collection(db, surveyType)); // Rimosso orderBy('nome') se 'nome' non esiste
      console.log('Esecuzione query Firestore...');
      const querySnapshot = await getDocs(q);
      
      let surveyData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Converti gli array in stringhe separate da virgole
        const formattedData = {
          ...data,
          AIApplications: data.AIApplications ? data.AIApplications.join(', ') : '',
          MLAlgorithms: data.MLAlgorithms ? data.MLAlgorithms.join(', ') : '',
        };
        surveyData.push(formattedData);
      });
      
      console.log(`Dati recuperati e formattati: ${JSON.stringify(surveyData)}`);
      
      if (surveyData.length === 0) {
        alert(`Nessun dato trovato per ${surveyType}.`);
        return;
      }
      
      const worksheet = XLSX.utils.json_to_sheet(surveyData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Surveys');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${surveyType}.xlsx`; // Nome del file aggiustato
      a.click();
      window.URL.revokeObjectURL(url);
      
      console.log('File Excel generato e download avviato.');
    } catch (error) {
      console.error(`Errore nella generazione di Excel per ${surveyType}: `, error);
      alert(`Errore nella generazione di Excel per ${surveyType}. Controlla la console per dettagli.`);
    }
  };

  /**
   * Genera il file Excel per AISurvey.
   */
  const handleGenerateAISurveyExcel = async () => {
    const surveyType = 'AISurvey'; // Tipo di sondaggio specifico

    try {
      await generateExcel(surveyType);
      setMessage('File Excel di AISurvey generato con successo!');
    } catch (error) {
      console.error('Errore nella generazione del file Excel di AISurvey: ', error);
      setMessage('Errore nella generazione del file Excel di AISurvey. Riprova.');
    }
  };

  return (
    <div className="admin-container">
      <h1>Pannello Admin</h1>
      <button onClick={handleGenerateAISurveyExcel}>Genera File Excel di AISurvey</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Admin;
