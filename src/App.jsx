import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import RequiredAuth from "./components/RequiredAuth"
import Registro from "./pages/Registro"
import { AuthProvider } from "./context/AuthProvider"
import { Perfil } from "./pages/Perfil"
import { RecipesProvider } from "./context/RecipesProvider"
import Receta from "./pages/Receta"
import CrearReceta from "./pages/CrearReceta"
import EditarReceta from "./pages/EditarReceta"

const App = () => {
  return (

    <BrowserRouter>
      <AuthProvider>
        <RecipesProvider>

        <Routes>

          {/* Rutas Públicas */}
          <Route path="*" element={<>NOT FOUND</>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* Rutas privadas */}
          <Route path="/" element={<RequiredAuth />}>
            <Route index element={<Home />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="receta/:id" element={<Receta />} />
            <Route path="crear-receta" element={<CrearReceta />} />
            <Route path="editar-receta/:id" element={<EditarReceta />} />
          </Route>

        </Routes>

        </RecipesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
export default App