import { useParams } from "react-router-dom"
import NavBar from "../components/NavBar"
import { useEffect, useState } from "react";
import axios from "axios";
import useRecipes from "../hooks/useRecipes";
import Alerta from "../components/Alerta";

const EditarReceta = () => {

  const { id } = useParams();
  const { setRecetas } = useRecipes();

  const [titulo, setTitulo] = useState('');
  const [origen, setOrigen] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [preparacion, setPreparacion] = useState('');
  const [alerta, setAlerta] = useState(false);

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/receta/obtener-receta/${id}`)
    .then(({data}) => {
      setTitulo(data?.titulo)
      setOrigen(data?.origen)
      setIngredientes(data?.ingredientes)
      setPreparacion(data?.preparacion)
    });


  }, [id])


  const handleSubmit = async(event) => {
    event.preventDefault();

    if ([titulo.trim(), origen.trim(), ingredientes.trim(), preparacion.trim()].some(field => field === '')) {
      setAlerta({
        error: true,
        message: "Todo los campos son necesarios"
      });

      setTimeout(() => {
        setAlerta({});
      }, 2000);

      return;
    }

    let editData = {
      titulo,
      origen,
      ingredientes,
      preparacion
    }

    try {
      const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/receta/update-receta/${id}`, editData);
      setRecetas(data);
      setAlerta({
        error: false,
        message: "Receta Actualizada"
      });

      setTimeout(() => {
        setAlerta({})
      }, 2000);
    } catch (error) {
      console.log(error)      
    }
  };

  let message = alerta?.message;

  return (
    <div className="h-screen bg-slate-200">
      <NavBar/>
      <div className="h-[calc(100vh-80px)] flex flex-col items-center justify-center">

        { message && <Alerta alerta={alerta} />}
        <form
          onSubmit={ handleSubmit }
          className="bg-white w-[500px] p-5 shadow-lg rounded space-y-2"
        >

          <div>
            <label htmlFor="titulo" className="text-xl">Titulo</label>
            <input 
              type="text"
              id="titulo" 
              value={titulo}
              onChange={ (e) =>  setTitulo(e.target.value)}
              className="w-full border-2 border-slate-300 rounded p-2 outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label htmlFor="origen" className="text-xl">Origen</label>
            <input 
              type="text"
              id="origen" 
              value={origen}
              onChange={ (e) =>  setOrigen(e.target.value)}
              className="w-full border-2 border-slate-300 rounded p-2 outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label htmlFor="ingredientes" className="text-xl">Ingredientes</label>
            <textarea 
              id="ingredientes" 
              value={ingredientes}
              onChange={ (e) =>  setIngredientes(e.target.value)}
              className="w-full border-2 border-slate-300 rounded p-2 outline-none focus:border-indigo-600 h-28"
            />
          </div>
          <div>
            <label htmlFor="preparacion" className="text-xl">Preparacion</label>
            <textarea 
              id="preparacion" 
              value={preparacion}
              onChange={ (e) =>  setPreparacion(e.target.value)}
              className="w-full border-2 border-slate-300 rounded p-2 outline-none focus:border-indigo-600 h-28"
            />
          </div>

          <button 
            type="submit"
            className="text-white bg-indigo-600 w-full py-2 text-center rounded hover:bg-indigo-700"
          >Editar</button>
        </form>
      </div>
    </div>
  )
}

export default EditarReceta