import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import NavBar from "../components/NavBar"
import useRecipes from "../hooks/useRecipes";
import { useEffect, useState } from "react";
import axios from "axios";
import { TbError404 } from 'react-icons/tb'

const Receta = () => {

  let { id } = useParams();
  const location = useLocation()
  console.log(location)

  const navigate = useNavigate()

  const { obtenerReceta } = useRecipes();
  const [receta, setReceta] = useState({});

  let formatearTexto = (ingredientes) => {

    const separarString = ingredientes.split(/\r\n|\r|\n/, -1);
    return (separarString);

  }

  useEffect(() => {

    const getData = async () => {

      const data = await obtenerReceta(id);

      // if(data?.msg){
      //   navigate('/');
      // }

      setReceta(data);

    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleDelete = async (event) => {
    event.preventDefault();

    let desicion = confirm(`Are you sure you want to delete`);

    if (desicion) {

      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/receta/remove-receta/${id}`);
        navigate('/', { state: { path: location.pathname }, replace: true });
        // navigate.repla
      } catch (error) {
        console.log(error)
      }

    } else {
      console.log('no delete');
    }


  };

  return (
    <div>
      <NavBar />

      {
        receta?.titulo &&
        (


          <div className=" h-[calc(100vh-80px)] flex justify-center pt-8">
            <div className="space-y-8 text-center">

              <h2 className="text-2xl"><b>Receta:</b> {receta.titulo}</h2>
              <img
                className="rounded-full w-80 h-80 block mx-auto hover:scale-105 transition-transform border-4 border-slate-300"
                src={`${import.meta.env.VITE_BACKEND_URL}/${receta.imagen}`}
                alt=""
              />

              <p className="text-xl"><b>Origen:</b> {receta.origen}</p>

              <div className="flex w-[500px] gap-8">

                <div className="w-1/2">
                  <h2 className="text-xl font-bold">Ingredientes</h2>
                  <ul className="">
                    {
                      formatearTexto(receta.ingredientes).map((ingrediente, index) => (
                        <li key={index} className="">
                          {ingrediente}
                        </li>
                      ))
                    }
                  </ul>
                </div>

                <div className="">
                  <h2 className="text-xl font-bold">Preparacion</h2>
                  <ul className="">
                    {
                      formatearTexto(receta.preparacion).map((item, index) => (
                        <li key={index}>
                          {item}
                        </li>
                      ))
                    }
                  </ul>
                </div>

              </div>
              <div className="flex justify-between">
                <Link to={`/editar-receta/${receta._id}`} className="py-2 font-bold w-2/5 bg-green-600 block rounded text-white">Editar</Link>
                <button
                  className="py-2 font-bold w-2/5 bg-red-600 rounded text-white"
                  onClick={(e) => { handleDelete(e) }}
                >Eliminar</button>
              </div>
            </div>
          </div>
        )
      }

      {
        receta?.msg &&
        (
          <div className="flex flex-col justify-center h-[calc(100vh-80px)]">
            <h2 className="text-center font-bold text-4xl mt-4 mb-0">{ receta.msg }</h2>
            <TbError404 size={300} className="block mx-auto mt-0"></TbError404>
          </div>
        )
      }
    </div>
  )
}
export default Receta