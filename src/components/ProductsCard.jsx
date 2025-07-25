import { Link } from 'react-router-dom';
import Rating from './Ratings';

const ProductsCard = ({ product, viewMode }) => {
  const roundedPrice = Math.round(product.price * 80);

  return (
    <Link to={`/products/${product.id}`} className="block">
      <div
        className={`border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 ease-in-out bg-white ${
          viewMode === 'list' ? 'flex gap-6 items-center' : ''
        }`}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className={`rounded-xl object-cover bg-gray-50 ${
            viewMode === 'list' ? 'w-36 h-32' : 'w-full h-48 object-contain'
          }`}
        />

        <div className={`mt-3 ${viewMode === 'list' ? 'mt-0 flex-1' : ''}`}>
          <h2 className="text-lg font-bold text-gray-800 line-clamp-1">{product.title}</h2>
          <p className="text-sm text-gray-500 mb-1 line-clamp-1">{product.brand}</p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-blue-600 font-semibold text-base">₹ {roundedPrice}</p>
            <span className="text-xs text-green-600 font-medium">
              {product.discountPercentage}% OFF
            </span>
          </div>
          <Rating rating={product.rating} />
        </div>
      </div>
    </Link>
  );
};

export default ProductsCard;
