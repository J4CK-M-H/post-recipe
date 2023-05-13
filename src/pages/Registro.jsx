import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import Spinner from "../components/Spinner";

const Registro = () => {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  let storage = JSON.parse(localStorage.getItem("token"));

  const handleSubmit = async (event) => {

    event.preventDefault();

    // some: comprueba si almenos un elemento del array satisface la condicion
    if ([nombre.trim(), apellido.trim(), email.trim(), password.trim()].some(field => field === '')) {
      setAlerta({
        error: true,
        message: 'Todos los campos son obligatorios'
      })

      setTimeout(() => {
        setAlerta({})
      }, 3000);

      return;
    }

    const usuario = {
      nombre,
      apellido,
      email,
      password
    }

    try {

      const { data } = await axios.post('http://localhost:5000/usuario/registrar', usuario);

      setAlerta({
        error: data.error,
        message: data.msg
      });

    } catch (error) {
      console.log(error);
    }

    setNombre('');
    setApellido('');
    setEmail('');
    setPassword('');
  };

  const { message } = alerta;

  return (
    storage?.token ? <Spinner />
      :
      (<div className="h-screen bg-slate-100 flex flex-col justify-center items-center">

        {(message) && <Alerta alerta={alerta} />}
        <form
          className="shadow-lg w-2/5 space-y-5 bg-white p-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="nombre" className="font-bold uppercase text-indigo-600">Nombres</label>
            <input
              className="w-full py-2 rounded outline-none border-2 border-gray-300 px-2"
              placeholder="example@example.com"
              type="text"
              name="nombre"
              id="nombre"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
            />
          </div>
          <div>
            <label htmlFor="apellido" className="font-bold uppercase text-indigo-600">Apellidos</label>
            <input
              className="w-full py-2 rounded outline-none border-2 border-gray-300 px-2"
              placeholder="example@example.com"
              type="text"
              name="apellido"
              id="apellido"
              onChange={(e) => setApellido(e.target.value)}
              value={apellido}
            />
          </div>
          <div>
            <label htmlFor="email" className="font-bold uppercase text-indigo-600">Email</label>
            <input
              className="w-full py-2 rounded outline-none border-2 border-gray-300 px-2"
              placeholder="example@example.com"
              type="text"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label htmlFor="password" className="font-bold uppercase text-indigo-600">Password</label>
            <input
              className="w-full py-2 rounded outline-none border-2 border-gray-300 px-2"
              type="password"
              name="password"
              id="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <input type="submit" className="w-full bg-indigo-600 text-white uppercase text-center rounded py-3 font-bold" />
          <p className="text-center">Ya tienes cuenta?, <Link className="font-bold" to={'/login'}>Login</Link></p>
        </form>
      </div>)
  )
}
export default Registro