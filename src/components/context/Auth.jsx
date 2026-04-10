import { createContext, useEffect, useLayoutEffect, useState } from "react";
import Cookies from "js-cookie";
import { useContext } from "react";

export const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState();
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const saveduser = Cookies.get("user");
    if (saveduser) {
      setuser(JSON.parse(saveduser));
    } else {
      setuser(null);
    }
    setUserLoading(false);
  }, []);

  return (
    <>
      <Authcontext.Provider value={{ user, userLoading, setuser }}>
        {children}
      </Authcontext.Provider>
    </>
  );
};

export const useAuth = () => useContext(Authcontext);
