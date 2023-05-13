import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";

const Login = () => {

  console.log('Loggin Cargo');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { setReady } = useAuth();

  let navigate = useNavigate();

  let storage = JSON.parse(localStorage.getItem("token"));

  const { setAuth } = useAuth();

  const handleSubmit = async (event) => {

    event.preventDefault();

    if ([email.trim(), password.trim()].some(field => field === '')) {

      setAlerta({
        error: true,
        message: 'Todos los campos son obligatorios'
      })

      setTimeout(() => {
        setAlerta({})
      }, 3000);

      return;
    }

    try {
      const { data } = await axios.post('http://localhost:5000/usuario/login', { email, password });
      localStorage.setItem('token', JSON.stringify(data));
      setAuth(data)
      setReady(true);
      navigate('/');
      console.log(data)


    } catch (error) {
      setAlerta({
        error: true,
        message: error.response.data.msg
      })
    }

  };

  let { message } = alerta;

  // if(storage){
  //   return <Navigate to={'/'} replace/>
  // }
  

  return ( storage?.token ? <Spinner />
    : (
      <div className="h-screen bg-slate-100 flex flex-col justify-center items-center">

        {(message) && <Alerta alerta={alerta} />}

        <form
          className="shadow-lg w-2/5 space-y-5 bg-white p-4"
          onSubmit={handleSubmit}
        >
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
          <p className="text-center">¿Aún no tienes cuenta?, <Link className="font-bold" to={'/registro'}>Registrate</Link></p>
        </form>
      </div>)
  )
}
export default Login