function fetchProducts() {
  return fetch(`http://localhost:3000/products`).then((res) => res.json());
}

export default fetchProducts;
