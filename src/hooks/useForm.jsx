import { useState } from "react"

const useForm = ({ initialState = {} }) => {

  const [formState, setFormState ] = useState(initialState);

  const onInputChange = ({ target }) => {

    const { name, value } = target;
    setFormState({
    ...formState,
      [name]: value,
    });
  }

  return {
    ...formState,
    formState,
    onInputChange,
  }
}
export default useForm