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

    // CSS para el correo
    const emailCss = `
      <style>
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          background: #f7f6f2;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .email-container {
          background: #fff;
          border-radius: 8px;
          max-width: 500px;
          margin: 24px auto;
          padding: 24px 32px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.08);
          border: 1px solid #eee;
        }
        h2 {
          color: #8D7B31;
          margin-top: 0;
          text-align: center;
        }
        .order-summary {
          background: #f9f9f9;
          border-radius: 6px;
          padding: 16px;
          margin: 18px 0;
          border: 1px solid #eee;
        }
        .product-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .product-item {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #eee;
          padding: 10px 0;
        }
        .product-item:last-child {
          border-bottom: none;
        }
        .product-img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 6px;
          margin-right: 16px;
          border: 1px solid #ddd;
        }
        .product-info {
          flex: 1;
        }
        .product-name {
          font-weight: bold;
          color: #8D7B31;
          margin-bottom: 4px;
        }
        .product-qty {
          color: #555;
          font-size: 0.95em;
        }
        .product-price {
          color: #333;
          font-size: 1em;
          margin-left: 8px;
        }
        .footer {
          margin-top: 24px;
          text-align: center;
          color: #888;
          font-size: 0.95em;
        }
      </style>
    `;

    // Construye el HTML de los productos con imagen y resumen
    const productsHtml = products.map(
      (p) => `
        <li class="product-item">
          <img src="${p.imageUrl}" alt="${p.name}" class="product-img" />
          <div class="product-info">
            <div class="product-name">${p.name}</div>
            <div class="product-qty">Cantidad: ${p.quantity}</div>
            <div class="product-price">Precio: €${(p.price * p.quantity).toFixed(2)}</div>
          </div>
        </li>
      `
    ).join("");

 const last4 = cardMasked ? cardMasked.slice(-4) : "****";

// ...resto del código...
await transporter.sendMail({
  from: `"Tu Tienda" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Confirmación de compra",
  html: `
    <html>
      <head>
        ${emailCss}
      </head>
      <body>
        <div class="email-container">
          <h2>¡Gracias por tu compra, ${name}!</h2>
          <div class="order-summary">
            <ul class="product-list">
              ${productsHtml}
            </ul>
          </div>
          <div class="order-summary">
            <b>Resumen:</b>
            <pre>${orderSummary}</pre>
            <p>Tarjeta utilizada: <b>**** **** **** ${last4}</b></p>
          </div>
          <div class="footer">
            <p>Gracias por confiar en nuestra tienda.</p>
          </div>
        </div>
      </body>
    </html>
  `,
});

    res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al enviar el correo", error: error.message });
  }
};