import { signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext } from "react";
import { auth } from "../firebase/firebase";

export const dbContext = createContext();
export const useDB = () => {
  const context = useContext(dbContext);
  return context;
};
export function DbProvider({ children }) {
  const loginFunction = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };
  return (
    <dbContext.Provider value={{ loginFunction }}>
      {children}
    </dbContext.Provider>
  );
}
