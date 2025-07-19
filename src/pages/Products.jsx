import { useEffect, useState } from 'react';
import { getProductsByCategory, categoryMap } from '../utils/api';
import ProductCard from '../components/ProductsCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState('Men');
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await getProductsByCategory(categoryMap[activeCategory]);
      setProducts(productData);
    };
    fetchProducts();
  }, [activeCategory]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 mt-20">
      <div className="flex justify-end mb-4 gap-2">
        <button onClick={() => setViewMode("grid")} className="px-2 py-1 bg-blue-500 text-white rounded">Grid</button>
        <button onClick={() => setViewMode("list")} className="px-2 py-1 bg-blue-500 text-white rounded">List</button>
      </div>

      <div className="flex gap-4 mb-6">
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

    
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div className={`grid ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2"} gap-6`}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
};

export default Products;
