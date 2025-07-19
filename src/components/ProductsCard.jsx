
import { Link } from 'react-router-dom';
const ProductCard = ({ product }) => {
const roundedPrice = Math.round(product.price * 80);
return (
    <Link to={`/products/${product.id}`} className="block">
    <div className="border rounded-xl p-4 shadow-md hover:scale-105 transition">
      <img src={product.thumbnail} alt={product.title} className="h-full w-full object-cover rounded" />
      <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
      <p className="text-sm text-gray-600">{product.brand}</p>
      <p className="text-blue-600 font-bold mt-1">₹ {roundedPrice}</p>
    </div>
    </Link>
);
};

export default ProductCard;
