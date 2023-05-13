import { useEffect } from "react"
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Spinner = () => {

  const { auth } = useAuth();
  const navigate = useNavigate();

  let storage = JSON.parse(localStorage.getItem("token"));
  
  useEffect(() => {
    
    console.log(auth)
    
    if( storage?.token ) {
      navigate('/', { replace: true });
    }else{
      navigate('/login', { replace: true });
      
    }
    
  }, []);
  

  return (
    <div>Cargando...</div>
  )
}
export default Spinner