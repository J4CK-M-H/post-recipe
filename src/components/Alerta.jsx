const Alerta = ({ alerta }) => {

  return (
    <p 
      className={`py-4 text-center text-white font-bold uppercase rounded ${ alerta.error ? 'bg-red-600' : 'bg-green-500'} mb-3 w-2/5`}
    >{ alerta.message }</p>
  )
}
export default Alerta