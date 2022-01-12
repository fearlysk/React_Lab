import http from "../services/http";

const base = "/products";

export function getProducts(query = "") {
  return http(`${base}${query}`);
}

export function editProducts() {
  return null; // temp to avoid Prefer default export  import/prefer-default-export
}
