import http from "../services/http";

const base = "/products";

export function getProducts(query = "") {
  return http(`${base}${query}`);
}

export function addProduct(data = {}) {
  return http(`${base}`, "POST", data);
}

export function editProduct(id: number | undefined, data = {}) {
  return http(`${base}/${id}`, "PUT", data);
}

export function deleteProduct(id: number | undefined) {
  return http(`${base}/${id}`, "DELETE");
}
