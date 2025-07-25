
export const COUPONS = {
  SAVE10: {
    type: "percentage",
    discount: 10,
    minTotal: 500, // only applicable if cart total > ₹500
  },
  FLAT50: {
    type: "flat",
    discount: 50,
    minTotal: 300,
  },
};
