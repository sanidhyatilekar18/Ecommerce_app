import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid'; // Optional icon, or use FontAwesome

const OrderSuccess = () => {
  return (
   <div className="flex items-center justify-center min-h-[70vh] p-6 bg-gray-50">
  <div className="bg-white p-8 rounded shadow-md text-center max-w-md">
    <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4 mx-auto" />
    <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
    <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
    <Link
      to="/"
      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
    >
      Continue Shopping
    </Link>
  </div>
</div>
  );
};

export default OrderSuccess;
