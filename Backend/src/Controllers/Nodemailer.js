import nodemailer from "nodemailer";

export const sendOrderConfirmation = async (req, res) => {
  const { email, name, orderSummary, cardMasked, products } = req.body;

  if (!email || !orderSummary || !cardMasked || !products || !Array.isArray(products)) {
    return res.status(400).json({ message: "Faltan datos para enviar el correo." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Construye el HTML de los productos con imagen y resumen
    const productsHtml = products.map(
      (p) => `
        <div style="margin-bottom:20px;">
          <img src="${p.imageUrl}" alt="${p.name}" style="max-width:120px;display:block;margin-bottom:5px;" />
          <div><b>${p.name}</b> x${p.quantity} - €${(p.price * p.quantity).toFixed(2)}</div>
        </div>
      `
    ).join("");

    await transporter.sendMail({
      from: `"Tu Tienda" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirmación de compra",
      html: `
        <h2>¡Gracias por tu compra, ${name}!</h2>
        <p>Resumen del pedido:</p>
        ${productsHtml}
        <pre>${orderSummary}</pre>
        <p>Tarjeta utilizada: <b>${cardMasked}</b></p>
      `,
    });

    res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al enviar el correo", error: error.message });
  }
};