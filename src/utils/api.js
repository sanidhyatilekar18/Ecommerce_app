

export const getProductsByCategory = async (categories) => {
  const responses = await Promise.all(
    categories.map((category) =>
      fetch(`https://dummyjson.com/products/category/${category}`).then((res) => res.json())
    )
  );
  return responses.flatMap((res) => res.products);
};

export const categoryMap = {
  Men: ['mens-shirts', 'mens-shoes', 'mens-watches', 'sunglasses'],
  Women: ['womens-dresses', 'womens-shoes', 'womens-bags', 'womens-jewellery', 'womens-watches'],
  Electronics: ['smartphones', 'laptops'],
  Lifestyle: ['fragrances', 'skincare'],
  Home: ['home-decoration', 'furniture', 'lighting'],
  Vehicles: ['automotive', 'motorcycle'],
  Grocery: ['groceries']
};
