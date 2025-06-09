import emailjs from 'emailjs-com';
import axios from "axios";
export const sendSupportEmail = async (templateParams) => {
  return await emailjs.send(
    'service_oxurxxs',      // ID de servicio
    '4e352b25-eaf1-40f6-b9bb-86f0f22258bd',     // ID de plantilla
    templateParams,         // { from_name, reply_to, message }
    'B-kJoB9UDT4MRmInH'     // User ID
  );
};

export const sendOrderConfirmationEmail = async ({ name, email, orderSummary, cardMasked, products }) => {
  const response = await fetch('https://tfg-5q0w.onrender.com/api/email/order-confirmation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, orderSummary, cardMasked, products })
  });

  if (!response.ok) {
    throw new Error('Error al enviar el correo de confirmación');
  }
};

// Recuperación de contraseña
const API_URL = 'https://tfg-5q0w.onrender.com/api/auth';
export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await axios.post(`${API_URL}/reset-password`, { token, password });
  return response.data;
};