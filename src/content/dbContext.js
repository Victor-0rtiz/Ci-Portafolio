import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestoreDb } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import {v4 as uuid } from "uuid";

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
  const saveAnimeFunction = async (anime) => {
    const newDoc = {
      id: uuid(),
      name: anime.name,
      description: anime.description,
      img: anime.img,
    };

    const docRef = doc(firestoreDb, "Animes", newDoc.id);
    await setDoc(docRef, newDoc).then(async () => {
      Swal.fire({
        title: "correcto, guardado correctamente",
        icon: "success",
        text: "guardado",
        showConfirmButton: false,
        timer: 1500,
      });
    }).catch(
      (err)=>{
        Swal.fire({
          title: "correcto, guardado correctamente",
          icon: "error",
          text: `${err}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  };

  useEffect(() => {
    const unSuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unSuscribe();
  }, []);

  return (
    <dbContext.Provider value={{ loginFunction, saveAnimeFunction, user }}>
      {children}
    </dbContext.Provider>
  );
}
