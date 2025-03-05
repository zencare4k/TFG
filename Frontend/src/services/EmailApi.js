import emailjs from 'emailjs-com';

export const sendSupportEmail = async (templateParams) => {
  return await emailjs.send('service_oxurxxs', 'template_37iampg', templateParams, 'B-kJoB9UDT4MRmInH');
};

export const sendConfirmationEmail = async (name, email) => {
  const response = await fetch('https://nodemailer-server-b74j.onrender.com/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, message: 'Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.' })
  });

  if (!response.ok) {
    throw new Error('Error al enviar el correo de confirmación');
  }
};