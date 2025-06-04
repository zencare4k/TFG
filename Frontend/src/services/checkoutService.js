export const processCheckout = async ({ address, cartItems, total, token }) => {
  return await fetch("/checkout", { // <-- SOLO /checkout
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ address, cartItems, total })
  });
};