

import { useEffect, useState } from 'react';
import { getProductsByCategory, categoryMap } from '../utils/api';
import ProductsCard from '../components/ProductsCard';
import { useLocation } from 'react-router-dom';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Men');
  const [viewMode, setViewMode] = useState('grid');
 const [minPrice, setMinPrice] = useState(500);
const [maxPrice, setMaxPrice] = useState(50000); 

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await getProductsByCategory(categoryMap[activeCategory]);
      setProducts(productData);
    };
    fetchProducts();
  }, [activeCategory]);
  useEffect(() => {
  const savedSearch = localStorage.getItem('search');
  if (savedSearch) setSearchTerm(savedSearch);
}, []);


 const combinedSearch = `${searchTerm} ${searchQuery}`.toLowerCase().trim();


const filteredProducts = products.filter((p) => {
  const rupeePrice = Math.round(p.price * 80);   // API gives USD
  const textMatch =
    p.title.toLowerCase().includes(combinedSearch) ||
    p.description.toLowerCase().includes(combinedSearch) ||
    p.brand.toLowerCase().includes(combinedSearch);

  const priceMatch = rupeePrice >= minPrice && rupeePrice <= maxPrice;

  return textMatch && priceMatch;
});


  return (
    <div className="p-6 mt-20">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          {Object.keys(categoryMap).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-2 py-1 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-2 py-1 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
          >
            List
          </button>
        </div>
      </div>

    <div className="mb-6">
  <h3 className="text-lg font-semibold mb-2">Price range (₹)</h3>


  <div className="flex items-center gap-4 mb-2">
    <label className="flex items-center gap-2">
      Min
      <input
        type="number"
        min="0"
        max={maxPrice}
        step="100"
        value={minPrice}
        onChange={(e) => setMinPrice(parseInt(e.target.value) || 0)}
        className="w-24 p-1 border rounded"
      />
    </label>

    <label className="flex items-center gap-2">
      Max
      <input
        type="number"
        min={minPrice}
        max="100000"
        step="100"
        value={maxPrice}
        onChange={(e) => setMaxPrice(parseInt(e.target.value) || 0)}
        className="w-24 p-1 border rounded"
      />
    </label>
  </div>

 
  <input
    type="range"
    min="500"
    max="50000"
    step="500"
    value={maxPrice}
    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
    className="w-full"
  />
  <p className="text-sm mt-1 text-gray-600">
    Showing items priced between ₹{minPrice.toLocaleString()} and ₹{maxPrice.toLocaleString()}
  </p>
</div>

      <div
        className={`${
          viewMode === 'grid'
            ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
            : 'flex flex-col gap-4'
        }`}
      >
        {filteredProducts.map((product) => (
          <ProductsCard key={product.id} product={product} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
};

export default Products;
