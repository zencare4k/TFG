import React from 'react';
import '../../styles/notification.css';

const NotificationSystem = ({ message, type }) => {
  if (!message) return null; // No renderizar nada si no hay mensaje
  return <div className={`notification ${type}`}>{message}</div>;
};

export default NotificationSystem;