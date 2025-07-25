import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Rating from '../components/Ratings';
import { getEstimatedDeliveryDate } from '../utils/date';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  const mockReviews = [
    {
      user: "Riya S.",
      rating: 4.5,
      comment: "Great quality product, totally worth the price!",
    },
    {
      user: "Arjun T.",
      rating: 4.0,
      comment: "Nice value. Delivery was fast too.",
    },
    {
      user: "Neha P.",
      rating: 5.0,
      comment: "Exceeded expectations! Would recommend.",
    },
  ];

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error('Error fetching product:', err));
  }, [id]);

  if (!product) {
    return <div className="p-6 text-xl text-center mt-24">Loading...</div>;
  }

  return (
    <div className="p-6 mt-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-[400px] object-contain border rounded-xl shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-700 text-lg">{product.description}</p>

            <div className="text-2xl font-semibold text-green-600">
              ₹{Math.round(product.price * 80)}
            </div>

            <div className="text-sm text-gray-600">
              Brand: <span className="font-medium">{product.brand}</span>
            </div>
            <div className="text-sm text-gray-600">
              Category: <span className="font-medium capitalize">{product.category}</span>
            </div>

            <p className="text-green-600 font-medium mt-1">
              🚚 Estimated Delivery: {getEstimatedDeliveryDate()}
            </p>

            <Rating rating={product.rating} />
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full md:w-fit bg-blue-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockReviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md border transition"
            >
              <div className="font-semibold text-gray-800">{review.user}</div>
              <Rating rating={review.rating} />
              <p className="text-gray-700 mt-2 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
