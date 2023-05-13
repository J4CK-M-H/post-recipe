import { useContext } from "react"
import RecipesContext from "../context/RecipesProvider"

const useRecipes = () => {
  return useContext(RecipesContext)
}

export default useRecipes