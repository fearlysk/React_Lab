import IUserData from "../../interfaces/IUserData";

async function signIn(userData: IUserData) {
  const url = `http://localhost:3000/users?email=${userData.email}&password=${userData.password}`;
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
}

export default signIn;
