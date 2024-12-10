// src/components/ThankYou.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ThankYou.css';

const ThankYou = () => {
  return (
    <div className="thank-you-container">
      <div className="thank-you-content">
        <h1>Thank you for completing the survey!</h1>
        <p>Your participation is greatly appreciated.</p>
      </div>
    </div>
  );
};

export default ThankYou;
