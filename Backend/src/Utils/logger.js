// src/utils/logger.js
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
});

export default logger;  // Cambia a exportación por defecto
