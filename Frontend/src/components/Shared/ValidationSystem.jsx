import React from 'react';
import '../../styles/validation.css';

const ValidationSystem = ({ message, type }) => {
  return (
    <div className={`validation-message ${type}`}>
      {message}
    </div>
  );
};

export default ValidationSystem;