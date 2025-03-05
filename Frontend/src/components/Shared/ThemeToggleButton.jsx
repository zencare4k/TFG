import React from 'react';

const ThemeToggleButton = ({ toggleTheme, theme }) => (
  <button onClick={toggleTheme} className="toggle-button">
    Cambiar a tema {theme === 'light' ? 'oscuro' : 'claro'}
  </button>
);

export default ThemeToggleButton;