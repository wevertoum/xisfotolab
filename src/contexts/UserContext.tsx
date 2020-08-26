import React, { createContext, useState } from "react";
import useLocalStorage from "utils/useLocalStorage";

const UserContext = createContext({} as Contexts.User);

interface Props {}
export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useLocalStorage(
    "usuario_logado",
    ({} as {}) as Models.User
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
