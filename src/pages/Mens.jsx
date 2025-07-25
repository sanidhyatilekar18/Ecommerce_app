import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductsCard';

function Mens() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const categories = ['mens-shirts', 'mens-shoes', 'mens-watches', 'fragrances'];

    Promise.all(
      categories.map((category) =>
        fetch(`https://dummyjson.com/products/category/${category}`)
          .then((res) => res.json())
          .then((data) => data.products)
      )
    )
      .then((results) => {
        const allProducts = results.flat();
        setProducts(allProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching men’s products:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-blue-50 p-6 rounded-xl mb-10 text-center shadow">
        <h2 className="text-4xl font-bold text-blue-900">Men’s Essentials 👕👞⌚</h2>
        <p className="text-lg mt-2 text-blue-700">
          Explore the latest trends in fashion, footwear, fragrances, and more.
        </p>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Men’s Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Mens;
