import emailjs from 'emailjs-com';

export const sendSupportEmail = async (templateParams) => {
  return await emailjs.send('service_oxurxxs', 'template_37iampg', templateParams, 'B-kJoB9UDT4MRmInH');
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