import { Link, useNavigate } from "react-router-dom"

const NavBar = () => {

  let navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem('token');
    navigate('/login', { 
        replace: true 
    });
  };

  return (
    <nav className="bg-blue-500 h-20 flex justify-between items-center px-6 shadow-md">
      <Link to={'/'} className="text-white font-bold text-2xl">Recipes</Link>
      <ul className="flex gap-4 items-center">
        <li>
          <Link to="/crear-receta" className="text-white font-bold hover:bg-stone-700 py-2 px-4 rounded-md bg-opacity-100">Crear Receta</Link>
        </li>
        <li>
          <Link to="/perfil" className="text-white font-bold hover:bg-stone-700 py-2 px-4 rounded-md bg-opacity-100">Perfil</Link>
        </li>
        <li>
          <button 
            onClick={ logout }
            className="text-white font-bold hover:bg-slate-700 py-2 px-4 rounded-md">Logout</button>
        </li>
      </ul>
    </nav>
  )
}
export default NavBar