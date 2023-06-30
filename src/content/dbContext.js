import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth } from "../firebase/firebase";

export const dbContext = createContext();
export const useDB = () => {
  const context = useContext(dbContext);
  return context;
};
export function DbProvider({ children }) {
  const [user, setUser] = useState(null);
  const loginFunction = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unSuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unSuscribe();
  }, []);

  return (
    <dbContext.Provider value={{ loginFunction, user }}>
      {children}
    </dbContext.Provider>
  );
}
