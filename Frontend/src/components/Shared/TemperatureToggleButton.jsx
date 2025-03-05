import React from 'react';

const TemperatureToggleButton = ({ toggleTemperatureUnit, temperatureUnit }) => (
  <button onClick={toggleTemperatureUnit} className="toggle-button">
    Cambiar a °{temperatureUnit === 'C' ? 'F' : 'C'}
  </button>
);

export default TemperatureToggleButton;