import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { COUPONS } from "../utils/coupons";
import { getEstimatedDeliveryDate } from '../utils/date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const applyCoupon = () => {
    const coupon = COUPONS[couponCode.toUpperCase()];
    const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    if (!coupon) {
      toast.error("Invalid coupon code");
      return;
    }

    if (total < coupon.minTotal) {
      toast.error(`Minimum order ₹${coupon.minTotal} required for this coupon`);
      return;
    }

    let discount = 0;
    if (coupon.type === "percentage") {
      discount = (coupon.discount / 100) * total;
    } else if (coupon.type === "flat") {
      discount = coupon.discount;
    }

    setDiscountAmount(discount);
    setAppliedCoupon(couponCode.toUpperCase());
    toast.success(`Coupon ${couponCode.toUpperCase()} applied!`);
  };

  const finalTotal = Math.round((totalPrice - discountAmount) * 80);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-4">
                <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">&#8377;{item.price} each</p>
                  <p className="text-sm text-gray-600">Delivery by {getEstimatedDeliveryDate()}</p>

                  <div className="flex items-center mt-2">
                    <button onClick={() => decreaseQty(item.id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                    <span className="px-4">{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-lg font-bold">&#8377;{Math.round((item.price * item.quantity) * 80)}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-red-600 text-md mt-2 ">
                  <FontAwesomeIcon icon={faTrash} size='lg' />
                </button>
              </div>
            </div>
          ))}

          {/* COUPON SECTION */}
          <div className="flex items-center gap-3 mt-6">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border rounded px-3 py-2 w-1/2"
            />
            <button
              onClick={applyCoupon}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Apply
            </button>
          </div>

      
          <div className="text-right mt-6 text-lg">
            <p>Subtotal: <span className="font-semibold">&#8377;{Math.round(totalPrice * 80)}</span></p>
            {appliedCoupon && (
              <>
                <p className="text-green-600">Discount ({appliedCoupon}): -₹{Math.round(discountAmount * 80)}</p>
                <p className="text-xl font-bold text-blue-700 mt-1">Total: ₹{finalTotal}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
