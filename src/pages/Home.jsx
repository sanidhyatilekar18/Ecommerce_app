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
    <div className="p-6 max-w-7xl mx-auto">
    <div className="bg-blue-100 p-6 rounded-xl mb-10 text-center shadow-md">
      <h2 className="text-4xl font-bold text-blue-800">Big Summer Sale! 🛍️</h2>
      <p className="text-lg mt-2 text-blue-700">Up to 50% off on selected items. Grab your favorites now!</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
  {["Mens", "Womens"].map((cat) => (
    <button
      key={cat}
      onClick={() => navigate(`/${cat.toLowerCase()}`)}
      className="bg-gray-100 hover:bg-blue-600 text-xl font-semibold hover:text-white p-4 rounded-lg shadow"
    >
      {cat}
    </button>
  ))}
</div>
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
  key={product.id}
  className="border rounded-xl p-4 shadow hover:shadow-lg hover:scale-[1.02] transition-transform bg-white"
>
  <img
    src={product.thumbnail}
    alt={product.title}
    className="w-full h-48 object-contain rounded"
  />
  <h2 className="mt-2 text-lg font-semibold">{product.title}</h2>
  <p className="text-gray-700 text-xl">₹{Math.round(product.price * 80)}</p>
  <div className="flex justify-between mt-3">
    <button
      onClick={() => navigate(`/products/${product.id}`)}
      className="h-10 px-4 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
    >
      View
    </button>
    <button className="h-10 px-4 bg-green-600 text-white text-sm rounded hover:bg-green-700">
      Add to Cart
    </button>
  </div>
</div>

        ))}
      </div>
    </div>
  );
}

export default Home;
