import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=194&skip=0')
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-contain"
            />
            <h2 className="mt-2 text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-700 text-xl">₹{Math.round(product.price * 80)}</p>
            <button
              onClick={() => navigate(`/products/${product.id}`)}
              className="mt-3 h-10 w-20 bg-blue-600 text-white text-xl rounded"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
