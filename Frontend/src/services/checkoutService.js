export const processCheckout = async ({ address, cartItems, total, token }) => {
  const response = await fetch("http://localhost:5000/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ address, cartItems, total }),
  });
  return response;
};