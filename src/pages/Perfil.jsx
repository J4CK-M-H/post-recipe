import NavBar from "../components/NavBar"
import useAuth from "../hooks/useAuth";
// import useRecipes from "../hooks/useRecipes";
import photoPerfil from '../assets/img/channels4_profile.jpg';
import { useEffect, useState } from "react";
import axios from "axios";

export const Perfil = () => {

  const { auth, ready } = useAuth();
  const [recetas, setRecetas] = useState([]);
  // const { recetas } = useRecipes();
 
  useEffect(() => {
    
    if(!ready){
      return;
    }

    axios(`${import.meta.env.VITE_BACKEND_URL}/receta/obtener-recetas/${auth._id}`)
    .then(({data}) => {
      console.log(data)
      setRecetas(data)
    })
    .catch((error) => console.log(error));

  },[auth]);

  return (
    <div className="bg-slate-200 h-screen">
      <NavBar />
      {/* Considerar cargar un snipper para evitar problemas en la espera de la carga de los datos */}
      <div className="flex justify-center mt-5">
        {
          auth._id && (
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-center">Perfil</h1>
              <img className="block mx-auto rounded-full border-4 border-white select-none" src={photoPerfil} alt="Imagen del usuario" />
              <p className="text-2xl font-bold">Usuario: {<span className="font-normal block text-xl">{`{ ${auth.nombre} }`}</span>}</p>
              <p className="text-2xl font-bold">Email: <span className="font-normal block text-xl">{`{ ${auth.email} }`}</span></p>
              <p className="text-xl font-bold underline">Recetas</p>
              {
                recetas.length ? 
                <div className="flex flex-wrap gap-4 w-96 justify-center">
                  {
                    recetas.map( receta => ( 
                      <p 
                        className="p-2 border-2 border-slate-700 rounded-md bg-white font-bold w-44 hover:-translate-y-2 transition-transform"
                        key={receta._id}
                      >{receta.titulo}</p>
                    ))
                  }
                </div>
                : 'Tienes 0 recetas creadas'
              }
            </div>
          )
        }
        
      </div>
    </div>
  )
}