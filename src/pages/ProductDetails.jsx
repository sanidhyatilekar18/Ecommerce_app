import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error('Error fetching product:', err));
  }, [id]);

  if (!product) {
    return <div className="p-6 text-xl">Loading...</div>;
  }

  return (
    <div className="p-6 mt-20 flex flex-col md:flex-row gap-6">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full md:w-1/2 h-auto object-contain"
      />
      <div>
        <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-700 mb-2 text-lg">{product.description}</p>
        <p className="text-lg font-semibold text-green-600 mb-2">
          ₹{Math.round(product.price * 80)}
        </p>
        <p className="text-2xl text-gray-500 mb-2">Brand: {product.brand}</p>
        <p className="text-2xl text-gray-500 mb-2">Category: {product.category}</p>
        <p className="text-xl text-yellow-600">Rating: {product.rating}⭐</p>
        <button className="mt-8 w-45 h-20 text-2xl bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer ">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
