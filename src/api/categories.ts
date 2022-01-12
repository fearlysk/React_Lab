import http from "../services/http";

const base = "/categories";

export function getCategories() {
  return http(`${base}`);
}

export function editCategories() {
  return null; // temp to avoid Prefer default export  import/prefer-default-export
}
