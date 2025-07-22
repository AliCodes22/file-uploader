import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [folders, setFolders] = useState([]);

  return (
    <UserContext.Provider
      value={{ token, setToken, user, setUser, folders, setFolders }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
