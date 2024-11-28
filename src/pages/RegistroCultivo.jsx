import { useState } from "react";

const RegistroCultivo = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    temp: "",
    iluminosidad: "",
    humedad_suelo: "",
    humedad_aire: "",
  });
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken"); // Obtener token de autenticación

    try {
      const response = await fetch("https://agrivoltaica.onrender.com/cultivos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje(`Cultivo "${data.nombre}" registrado exitosamente.`);
        setError(null);
        setFormData({
          nombre: "",
          temp: "",
          iluminosidad: "",
          humedad_suelo: "",
          humedad_aire: "",
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al registrar el cultivo.");
        setMensaje(null);
      }
    } catch (err) {
      console.error("Error al conectar con el servidor:", err);
      setError("No se pudo conectar con el servidor.");
      setMensaje(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 shadow-md rounded-md mt-20">
      <h2 className="text-xl font-bold mb-4 text-center">Registrar Cultivo</h2>

      {mensaje && <p className="text-green-600 text-center">{mensaje}</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre del cultivo
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Temperatura (°C)
          </label>
          <input
            type="number"
            name="temp"
            value={formData.temp}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Iluminosidad (lx)
          </label>
          <input
            type="number"
            name="iluminosidad"
            value={formData.iluminosidad}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Humedad del suelo (%)
          </label>
          <input
            type="number"
            name="humedad_suelo"
            value={formData.humedad_suelo}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Humedad del aire (%)
          </label>
          <input
            type="number"
            name="humedad_aire"
            value={formData.humedad_aire}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Registrar Cultivo
        </button>
      </form>
    </div>
  );
};

export default RegistroCultivo;
