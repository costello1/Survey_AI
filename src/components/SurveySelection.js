// src/surveys/AISurvey.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/Survey.css';
import updateExcel from '../utils/excel'; // Importa la funzione updateExcel

const AISurvey = () => {
  const [formData, setFormData] = useState({
    understandingAI: '',
    AIApplications: [],
    familiarityMLDL: '',
    MLAlgorithms: [],
    understandingEthicsAI: '',
    usedAIModel: ''
  });

  const navigate = useNavigate();

  // Gestisce i cambiamenti per le domande a scelta singola (radio buttons)
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gestisce i cambiamenti per le domande a scelta multipla (checkboxes)
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...formData[name], value]
      });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter((item) => item !== value)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const collectionRef = collection(db, 'AISurvey');
      const docRef = await addDoc(collectionRef, formData);
      
      // Opzionalmente, includi l'ID del documento
      const dataToUpdate = { id: docRef.id, ...formData };
      
      // Aggiorna Excel in Firebase Storage
      await updateExcel('AISurvey', dataToUpdate);
      
      navigate('/thank-you');
    } catch (error) {
      console.error('Errore nell\'invio del sondaggio: ', error);
      alert('Errore nell\'invio del sondaggio. Riprova.');
    }
  };

  return (
    <div className="survey-container">
      <h1>Survey sull'Intelligenza Artificiale</h1>
      <form onSubmit={handleSubmit} className="survey-form">

        {/* Domanda 1: Comprensione dell'IA */}
        <div className="survey-question">
          <p>1. Qual è la tua comprensione del concetto di Intelligenza Artificiale (IA)?</p>
          <label>
            <input
              type="radio"
              name="understandingAI"
              value="No knowledge"
              onChange={handleRadioChange}
              required
            />
            No knowledge
          </label>
          <label>
            <input
              type="radio"
              name="understandingAI"
              value="Basic knowledge"
              onChange={handleRadioChange}
            />
            Basic knowledge
          </label>
          <label>
            <input
              type="radio"
              name="understandingAI"
              value="Intermediate knowledge"
              onChange={handleRadioChange}
            />
            Intermediate knowledge
          </label>
          <label>
            <input
              type="radio"
              name="understandingAI"
              value="Advanced knowledge"
              onChange={handleRadioChange}
            />
            Advanced knowledge
          </label>
        </div>

        {/* Domanda 2: Applicazioni dell'IA */}
        <div className="survey-question">
          <p>2. Quali tra le seguenti applicazioni rientrano nell'ambito dell'IA? (Puoi selezionare più opzioni)</p>
          <label>
            <input
              type="checkbox"
              name="AIApplications"
              value="Virtual assistance (e.g., Siri, Alexa)"
              onChange={handleCheckboxChange}
            />
            Virtual assistance (e.g., Siri, Alexa)
          </label>
          <label>
            <input
              type="checkbox"
              name="AIApplications"
              value="Recommendation systems (e.g., Netflix, Amazon)"
              onChange={handleCheckboxChange}
            />
            Recommendation systems (e.g., Netflix, Amazon)
          </label>
          <label>
            <input
              type="checkbox"
              name="AIApplications"
              value="Medical diagnostics"
              onChange={handleCheckboxChange}
            />
            Medical diagnostics
          </label>
          <label>
            <input
              type="checkbox"
              name="AIApplications"
              value="Autonomous vehicles"
              onChange={handleCheckboxChange}
            />
            Autonomous vehicles
          </label>
          <label>
            <input
              type="checkbox"
              name="AIApplications"
              value="Not sure"
              onChange={handleCheckboxChange}
            />
            Not sure
          </label>
        </div>

        {/* Domanda 3: Familiarità con ML e DL */}
        <div className="survey-question">
          <p>3. Quanto sei familiare con i concetti di Machine Learning e Deep Learning?</p>
          <label>
            <input
              type="radio"
              name="familiarityMLDL"
              value="Never heard of them"
              onChange={handleRadioChange}
              required
            />
            Never heard of them
          </label>
          <label>
            <input
              type="radio"
              name="familiarityMLDL"
              value="I have a basic understanding"
              onChange={handleRadioChange}
            />
            I have a basic understanding
          </label>
          <label>
            <input
              type="radio"
              name="familiarityMLDL"
              value="I have an intermediate understanding and can explain the difference"
              onChange={handleRadioChange}
            />
            I have an intermediate understanding and can explain the difference
          </label>
          <label>
            <input
              type="radio"
              name="familiarityMLDL"
              value="I have an advanced understanding and practical experience"
              onChange={handleRadioChange}
            />
            I have an advanced understanding and practical experience
          </label>
        </div>

        {/* Domanda 4: Algoritmi di Machine Learning */}
        <div className="survey-question">
          <p>4. Quali algoritmi di apprendimento automatico conosci? (Puoi selezionare più opzioni)</p>
          <label>
            <input
              type="checkbox"
              name="MLAlgorithms"
              value="Decision trees"
              onChange={handleCheckboxChange}
            />
            Decision trees
          </label>
          <label>
            <input
              type="checkbox"
              name="MLAlgorithms"
              value="Artificial neural networks"
              onChange={handleCheckboxChange}
            />
            Artificial neural networks
          </label>
          <label>
            <input
              type="checkbox"
              name="MLAlgorithms"
              value="Support Vector Machines (SVM)"
              onChange={handleCheckboxChange}
            />
            Support Vector Machines (SVM)
          </label>
          <label>
            <input
              type="checkbox"
              name="MLAlgorithms"
              value="Clustering algorithms (e.g., K-means)"
              onChange={handleCheckboxChange}
            />
            Clustering algorithms (e.g., K-means)
          </label>
          <label>
            <input
              type="checkbox"
              name="MLAlgorithms"
              value="I don't know any"
              onChange={handleCheckboxChange}
            />
            I don't know any
          </label>
        </div>

        {/* Domanda 5: Comprensione dell'Etica nell'IA */}
        <div className="survey-question">
          <p>5. In che misura comprendi l'importanza dell'etica nell'IA?</p>
          <label>
            <input
              type="radio"
              name="understandingEthicsAI"
              value="I'm not aware of ethical implications"
              onChange={handleRadioChange}
              required
            />
            I'm not aware of ethical implications
          </label>
          <label>
            <input
              type="radio"
              name="understandingEthicsAI"
              value="I have a basic knowledge"
              onChange={handleRadioChange}
            />
            I have a basic knowledge
          </label>
          <label>
            <input
              type="radio"
              name="understandingEthicsAI"
              value="I'm well-informed about ethical implications"
              onChange={handleRadioChange}
            />
            I'm well-informed about ethical implications
          </label>
          <label>
            <input
              type="radio"
              name="understandingEthicsAI"
              value="I'm very aware and can discuss ethical challenges in detail"
              onChange={handleRadioChange}
            />
            I'm very aware and can discuss ethical challenges in detail
          </label>
        </div>

        {/* Domanda 6: Utilizzo di Modelli di IA */}
        <div className="survey-question">
          <p>6. Hai mai utilizzato o implementato un modello di IA? Se sì, in quale contesto?</p>
          <label>
            <input
              type="radio"
              name="usedAIModel"
              value="No, never"
              onChange={handleRadioChange}
              required
            />
            No, never
          </label>
          <label>
            <input
              type="radio"
              name="usedAIModel"
              value="Yes, for an academic project"
              onChange={handleRadioChange}
            />
            Yes, for an academic project
          </label>
          <label>
            <input
              type="radio"
              name="usedAIModel"
              value="Yes, for a personal project"
              onChange={handleRadioChange}
            />
            Yes, for a personal project
          </label>
          <label>
            <input
              type="radio"
              name="usedAIModel"
              value="Yes, for a professional project"
              onChange={handleRadioChange}
            />
            Yes, for a professional project
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AISurvey;
