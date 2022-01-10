import http from "../services/http";

function getCategories(url: string) {
  return http(url);
}

export default getCategories;
