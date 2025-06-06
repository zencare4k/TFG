export const processCheckout = async ({ address, cartItems, total, token }) => {
  return await fetch("https://tfg-5q0w.onrender.com/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ address, cartItems, total })
  });
};