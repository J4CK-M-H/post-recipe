import { useRef, useState } from "react";
import NavBar from "../components/NavBar"
import Alerta from "../components/Alerta";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const CrearReceta = () => {

  const { auth } = useAuth();

  const [titulo, setTitulo] = useState('')
  const [origen, setOrigen] = useState('')
  const [ingredientes, setIngredientes] = useState('')
  const [preparacion, setPreparacion] = useState('')
  
  const [imagen, setImagen] = useState({})

  let imagenRef = useRef(null);

  const [alerta, setAlerta] = useState({});

  // const { formState, onInputChange } = useForm({
  //   titulo: "",
  //   origen: "",
  //   ingredientes: "",
  //   preparacion: "",
  //   imagen: ""
  // });

  // let { titulo, origen, ingredientes, preparacion } = formState;
           
  const onInputFile = ({ target }) => {

    setImagen(target.files[0]);

    if(imagenRef) {
      console.log("Archivo cargado")
    }

  };

  let { message } = alerta;

  let handleSubmit = async (event) => {

    event.preventDefault();

    if ([titulo.trim(), origen.trim(), ingredientes.trim(), preparacion.trim()].some(field => field === '') || !imagen.lastModified) {

      setAlerta({
        error: true,
        message: "Todos los campos son obligatorios"
      })

      setTimeout(() => {
        setAlerta({})
      }, 2000);

      
      return ;
    }

    let receta = {
      titulo,
      origen,
      ingredientes,
      preparacion,
      imagen,
      id: auth._id
    }

    console.log(receta)

    let config = {
      headers: {
        'Content-Type':'multipart/form-data'
      }
    }

    await axios.post('http://localhost:5000/receta/crear-receta', receta, config);

    setOrigen('')
    setIngredientes('')
    setTitulo('')
    setPreparacion('')

    imagenRef.current.value = null;
    console.log('ok')
  };

  return (
    <div className="bg-slate-100 ">
      <NavBar />

      <div className="layout-receta flex flex-col justify-center items-center">

        {(message) && <Alerta alerta={alerta} />}

        <form 
          onSubmit={ handleSubmit }
          className="bg-gradient-to-bl from-slate-50 via-slate-200 to-slate-300 w-2/5 p-8 space-y-3 shadow-xl ">

          <div>
            <label htmlFor="titulo" className="text-xl">Titulo de la receta</label>
            <input
              value={ titulo }
              onChange={ (e) => setTitulo(e.target.value) }
              type="text"
              className="outline-none border border-slate-400 block w-full p-2 rounded-md"
              name="titulo"
              id="titulo"
            />
          </div>

          <div>
            <label htmlFor="origen" className="text-xl">Origen</label>
            <input
              value={ origen }
              onChange={ (e) => setOrigen(e.target.value) }
              type="text"
              className="outline-none border border-slate-400 block w-full p-2 rounded-md"
              name="origen"
              id="origen"
            />
          </div>

          <div>
            <label htmlFor="ingredientes" className="text-xl">Ingredientes</label>
            <textarea
              value={ ingredientes }
              onChange={ (e) => setIngredientes(e.target.value) }
              className="block w-full p-2 rounded-md border border-slate-400 outline-none"
              type="text"
              name="ingredientes"
              id="ingredientes"
            />
          </div>

          <div>
            <label htmlFor="preparacion" className="text-xl">Preparacion</label>
            <textarea
              value={ preparacion }
              onChange={ (e) => setPreparacion(e.target.value) }
              className="block w-full p-2 rounded-md border border-slate-400 outline-none"
              type="text"
              name="preparacion"
              id="preparacion"
            />
          </div>

          <div>
            <input
              type="file"
              ref={imagenRef}
              filename="imagen"
              onChange={ onInputFile }
              className="file:border-none file:bg-blue-600 file:text-white file:py-2 file:rounded-full
              file:w-40 bg-slate-600 w-1/2 py-2 px-2 rounded-full text-white file:cursor-pointer cursor-pointer"
            />
          </div>

          <input type="submit" className="block text-center w-full py-3 text-white font-bold bg-blue-500 rounded-md text-xl cursor-pointer" />
        </form>
      </div>
    </div>
  )
}

export default CrearReceta