import axios from "axios";
import { createContext, useState } from "react"

const RecipesContext = createContext();

const RecipesProvider = ({ children }) => {


  const [ recetas, setRecetas ] = useState([]);

  const obtenerRecetas = async () => {

    let storage = JSON.parse(localStorage.getItem('token'));

    if (!storage) {
      return;
    }

    let { token } = storage

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const { data } = await axios(import.meta.env.VITE_BACKEND_URL + '/receta/obtener-recetas', config);
      return data;

    } catch (error) {
      console.log(error)
    }

  };


  const crearReceta = () => {

  }

  const obtenerReceta = async (id) => {

    try {

      let { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/receta/obtener-receta/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }

  };

  const obtenerRecetasById = async (id) => {

    let storage = JSON.parse(localStorage.getItem('token'));

    let { token } = storage
    console.log(token)

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    try {
      let { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/receta/obtener-recetas/${id}`, config );
      setRecetas(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RecipesContext.Provider
      value={{
        crearReceta,
        obtenerReceta,
        obtenerRecetas,
        obtenerRecetasById,
        recetas,
        setRecetas
      }}
    >
      {children}
    </RecipesContext.Provider>
  )
}

export {
  RecipesProvider
}

export default RecipesContext