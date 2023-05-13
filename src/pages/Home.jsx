import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Home = () => {

  const { auth, ready } = useAuth();
  const [ recetas, setRecetas ] = useState([]);

  console.log(ready)

  useEffect(() => {

    if(!ready){
      return;
    }

    const getData = async() => {
      
      try {
        let { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/receta/obtener-recetas/${auth._id}`);
        setRecetas(data);
      } catch (error) {
        console.log(error);
      }

    };

    

    getData();

    // Usar el auth para volver a ejercutar cuando se obtengan la informacion de la carga
  }, [ready,auth._id]);
  

  return (
    <div>
      <NavBar />
      {
        (recetas.length > 0) &&
          (
            <div className="grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 p-4 gap-x-5 place-items-center">
              {recetas.map(receta => (
                <div key={receta._id} className="sm:w-80 md:w-52 ">
                  <p className="font-bold text-center">{receta.titulo}</p>
                  <img src={`${import.meta.env.VITE_BACKEND_URL}/${receta.imagen}`} className="w-full max-h-52 h-52" alt="" />
                  <Link
                    to={`/receta/${receta._id}`}
                    className="border-2 border-indigo-500 mt-2 block w-full py-2 text-center rounded text-indigo-500 font-bold hover:bg-indigo-500 hover:text-white"
                  >Ver Receta</Link>
                </div>
              ))}
            </div>
          )
          // : <Loading
      }
    </div>
  )
}
export default Home