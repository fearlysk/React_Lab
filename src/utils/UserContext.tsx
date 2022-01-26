import React, { createContext, useState } from "react";
import IUserData from "../interfaces/IUserData";

type ICurrentUserContext = [IUserData, React.Dispatch<React.SetStateAction<IUserData>>];

export const UserContext = createContext<ICurrentUserContext>([{}, () => null]);
function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUserData>({});

  return <UserContext.Provider value={React.useMemo(() => [user, setUser], [user])}>{children}</UserContext.Provider>;
}
export default UserProvider;
