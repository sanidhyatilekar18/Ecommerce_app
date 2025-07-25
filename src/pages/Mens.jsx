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
        // Flatten the array of arrays into one
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
    <div className="p-6 mt-30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Mens;
