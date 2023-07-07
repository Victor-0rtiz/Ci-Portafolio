import React, { useState } from "react";
import { useDB } from "../content/dbContext";


function FormAnime() {
    const {saveAnimeFunction} = useDB();
   
  const [Anime, setAnime] = useState({
    name: "",
    description: "",
    img: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setAnime({
      ...Anime,
      [name]: value,
    });
  };
  const onSubmitForm = (e) => {
   e.preventDefault();
   try {
    saveAnimeFunction(Anime)
   } catch (err) {
    console.log(err);
    
   }
  };

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <div className="p-4 shadow-md m-8">
          <div className="grid  grid-cols-2 gap-4  ">
            <div></div>
            <label className="block mb-2 text-sm text-gray-600">Nombre</label>
            <input
            onChange={handleChange}
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              required
              placeholder="Escribe un nombre"
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-opacity-40"
            />

            <div>
              <label className="block mb-2 text-sm text-gray-600">Imagen</label>
              <input
              onChange={handleChange}
                type="text"
                name="img"
                id="img"
                autoComplete="name"
                required
                placeholder="Escribe una url"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-600">Descripcion</label>
              <textarea
                onChange={handleChange}
                name="description"
                id="description"
               
                required
                placeholder="Escribe una descripcion"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <button type="submit" className="w-auto m-2 px-4 bg-blue-500">
              Guardar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormAnime;
