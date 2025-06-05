import Stripe from "stripe";
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processCheckout = async (req, res) => {
  const { address, cartItems, total } = req.body;
  const user = req.user;

  // Decodifica el token manualmente para depuración
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.decode(token);
      console.log("Token decodificado:", decoded);
    } catch (err) {
      console.log("Error al decodificar el token:", err.message);
    }
  }

  console.log("Usuario recibido en checkout:", user);

  try {
    if (
      !user ||
      !user.email ||
      !cartItems ||
      !Array.isArray(cartItems) ||
      cartItems.length === 0
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Datos de usuario o carrito inválidos" });
    }

 const productIds = cartItems.map(item => item.productId || item._id).join(',');
const productSummary = cartItems.map(item => `${item.name}x${item.quantity}`).join(', ');

const paymentIntent = await stripe.paymentIntents.create({
  amount: Math.round(total * 100),
  currency: "eur",
  payment_method_types: ["card"],
  description: `Compra de ${user.email}`,
  receipt_email: user.email,
  metadata: {
    userId: user.id,
    address: `${address.street}, ${address.city}`,
    productIds, // Ejemplo: "id1,id2,id3"
    productSummary // Ejemplo: "Camiseta x2, Pantalón x1"
  },
});

    return res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      message: "PaymentIntent creado correctamente (Stripe)",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error en el pago", error: error.message });
  }
};