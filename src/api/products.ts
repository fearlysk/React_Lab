import http from "../services/http";

function getProducts() {
  return http(`products`);
}

export default getProducts;
