
const BotonRegistroParcela = ({ setModalOpen }) => {
  return (
    <div className="relative h-0 w-full">
    <button
      className="fixed bottom-16 right-16"
      onClick={() => setModalOpen(true)}
    >
      <p className="text-center bg-blue-900 text-4xl font-bold rounded-full w-12 h-12 text-white">
        +
      </p>
    </button>
  </div>
  )
}

export default BotonRegistroParcela
