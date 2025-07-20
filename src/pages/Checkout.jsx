import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { db } from '../firebase'; // Uncomment if using Firestore
// import { addDoc, collection } from 'firebase/firestore';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.address) {
      toast.error('Please fill in all fields');
      return;
    }

    const orderData = {
      ...form,
      items: cartItems,
      total: Math.round(total * 80),
      createdAt: new Date(),
    };

    // Firestore save logic (optional)
    // try {
    //   await addDoc(collection(db, 'orders'), orderData);
    // } catch (err) {
    //   toast.error('Failed to save order');
    //   return;
    // }

    toast.success('Order placed successfully!');
    clearCart();
    navigate('/order-success');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-30 bg-white rounded shadow ">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'email', 'phone', 'address'].map((field) => (
          <input
            key={field}
            type={field === 'email' ? 'email' : 'text'}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        ))}
        <div className="mt-4 text-lg font-semibold">
          Total: ₹{Math.round(total * 80)}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
