import axios from "axios";
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


const AuthProvider = ({ children }) => {

  console.log('AuthProvider')
  let navigate = useNavigate();

  const [auth, setAuth] = useState({
    usuario: null,
    token: null
  });
  const [ready, setReady] = useState(false);


  useEffect(() => {

    const verifyAuth = async () => {

      let data = JSON.parse(localStorage.getItem("token"));
      if (data) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`
          }
        }

        console.log(config)

        try {
          const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/usuario/session`, config);
          setAuth(data);
          setReady(true);
          
        } catch (error) {
          setAuth({});
          localStorage.removeItem('token');
          navigate('/login', { replace: true });
        }
      }
    }


    verifyAuth();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        ready,
        setReady
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}

export {
  AuthProvider
}

export default AuthContext