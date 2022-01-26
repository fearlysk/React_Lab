import http from "../../services/http";

function signUp(data = {}) {
  const base = "/users";

  return http(`${base}`, "POST", data);
}

export default signUp;
