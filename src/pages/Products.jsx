// src/pages/Products.jsx

import { useEffect, useState } from 'react';
import { getProductsByCategory, categoryMap } from '../utils/api';
import ProductsCard from '../components/ProductsCard';
import { useLocation } from 'react-router-dom';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Men');
  const [viewMode, setViewMode] = useState('grid');
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


const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(combinedSearch) ||
  product.description.toLowerCase().includes(combinedSearch) ||
  product.brand.toLowerCase().includes(combinedSearch)
);


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
