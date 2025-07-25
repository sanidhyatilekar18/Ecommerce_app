

import { Link } from 'react-router-dom';
import Rating from './Ratings';
const ProductsCard = ({ product, viewMode }) => {
  const roundedPrice = Math.round(product.price * 80);

  return (
    <Link to={`/products/${product.id}`} className="block">
      <div
        className={`border rounded-xl p-4 shadow-md transition hover:shadow-lg ${
          viewMode === 'list' ? 'flex gap-4 items-center' : ''
        }`}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className={`rounded object-cover ${
            viewMode === 'list' ? 'w-40 h-32' : 'w-full h-full'
          }`}
        />

        <div className={viewMode === 'list' ? 'flex-1' : ''}>
          <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
          <p className="text-sm text-gray-600">{product.brand}</p>
          <p className="text-blue-600 font-bold mt-1">₹ {roundedPrice}</p>
               <Rating rating={product.rating} />

        </div>
      </div>
    </Link>
  );
};

export default ProductsCard;
