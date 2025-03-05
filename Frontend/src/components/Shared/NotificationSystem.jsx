import React from 'react';
import '../../styles/notification.css';

const NotificationSystem = ({ message, type }) => {
  return (
    <div className={`notification-message ${type}`}>
      {message}
    </div>
  );
};

export default NotificationSystem;