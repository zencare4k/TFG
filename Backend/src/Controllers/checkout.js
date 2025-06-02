import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processCheckout = async (req, res) => {
  const { address, cartItems, total } = req.body;
  const user = req.user;

  try {
    // Crea un PaymentIntent real en Stripe (monto en céntimos)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: "eur",
      payment_method_types: ["card"],
      description: `Compra de ${user.email}`,
      receipt_email: user.email,
      metadata: {
        userId: user.id,
        address: JSON.stringify(address),
        cart: JSON.stringify(cartItems),
      },
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      message: "PaymentIntent creado correctamente (Stripe)",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error en el pago", error: error.message });
  }
};