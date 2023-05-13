import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";

const RequiredAuth = () => {

  let storage = JSON.parse(localStorage.getItem("token"));

  // useEffect(() => {

    
  //   const session = async () => {
      

  //     if(storage) {
  //       let config = {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${storage.token}`
  //         }
  //       }
  
  //       try {
  
  //         const { data } = await axios.get('http://localhost:5000/usuario/session', config);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }

      
    
  //   };
  //   session()

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    storage?.token ? <Outlet /> : <Spinner />
  )
}
export default RequiredAuth