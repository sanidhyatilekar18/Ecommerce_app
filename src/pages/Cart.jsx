import React, { useContext } from 'react';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
          <div className="text-right text-xl font-bold mt-6">Total: &#8377;{Math.round(totalPrice * 80)}</div>
        </div>
      )}
    </div>
  );
}

export default Cart;
