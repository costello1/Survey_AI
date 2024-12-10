// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AISurvey from './surveys/AISurvey';
import Admin from './components/Admin';
import ThankYou from './components/ThankYou';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<AISurvey />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
