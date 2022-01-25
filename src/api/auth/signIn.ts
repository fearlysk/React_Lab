import http from "../../services/http";
import IUserData from "../../interfaces/IUserData";

function signIn(userData: IUserData) {
  const url = `/users?email=${userData.email}&password=${userData.password}`;

  return http(`${url}`);
}

export default signIn;
