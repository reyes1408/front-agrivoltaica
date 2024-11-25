
const ModalRegistrarCultivo = ({ isOpen, onClose, onAccept, formData, onInputChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-5 w-96">
        <h2 className="text-xl font-semibold mb-4">Registrar Cultivo</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre del cultivo:
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={onInputChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Ejemplo: Tomates"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              MAC del dispositivo:
            </label>
            <input
              type="text"
              name="mac"
              value={formData.mac}
              onChange={onInputChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Ejemplo: 00:1B:44:11:3A:B7"
            />
          </div>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onAccept}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRegistrarCultivo;
