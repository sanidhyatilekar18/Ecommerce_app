
export const getEstimatedDeliveryDate = () => {
  const daysToAdd = Math.floor(Math.random() * 4) + 4; // 4 to 7 days
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);

  return deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
