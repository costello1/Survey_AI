// src/components/SurveySelection.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Survey.css';

const SurveySelection = () => (
  <div className="container survey-selection">
    <h1>Benvenuto</h1>
    <p>Quale tra questi questionari vuoi scegliere?</p>
    <ul>
      <li><Link to="/survey/running">Running</Link></li>
      <li><Link to="/survey/trekking">Trekking</Link></li>
      <li><Link to="/survey/calcetto">Calcetto</Link></li>
      <li><Link to="/survey/padel">Padel</Link></li>
      <li><Link to="/survey/beachvolley">Beach Volley</Link></li>
    </ul>
  </div>
);

export default SurveySelection;
