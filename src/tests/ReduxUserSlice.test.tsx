import IUserData from "@/interfaces/IUserData";
import { store } from "../redux/store";
import { login, logout } from "../redux/userSlice";

describe("Store user slice tests", () => {
  let state: IUserData | null = store.getState().storeData.user.userData;
  const user = {
    email: "ivanmail@mail.ru",
    password: "ivan",
  };

  it("Makes user login", () => {
    store.dispatch(login(user));
    state = store.getState().storeData.user.userData;
    expect(state?.email).toBe("ivanmail@mail.ru");
    expect(state?.password).toBe("ivan");
  });

  it("Makes user login and logout", () => {
    store.dispatch(login(user));
    state = store.getState().storeData.user.userData;
    store.dispatch(logout());
    state = store.getState().storeData.user.userData;
    expect(state?.email).toBe(undefined);
    expect(state?.password).toBe(undefined);
  });
});
