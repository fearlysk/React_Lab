import http from "../../services/http";

const base = `/users`;

export function getUserData(id: number | undefined) {
  return http(`${base}/${id}`);
}

export function changeUserData(id: number | undefined, data = {}) {
  return http(`${base}/${id}`, "PUT", data);
}
