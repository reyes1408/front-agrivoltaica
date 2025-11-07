import { useState, useEffect } from "react";

const CRUDParcelas = () => {
  const [nuevaParcela, setNuevaParcela] = useState({
    nombre: "",
  });
  const [parcelas, setParcelas] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const API_BASE_URL = "https://agrivoltaica.onrender.com";

  const fetchParcelas = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No autenticado. Por favor, inicia sesión.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/parcelas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setParcelas(data);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al cargar las parcelas.");
        setParcelas([]);
      }
    } catch (err) {
      console.error("Error al conectar con el servidor:", err);
      setError("No se pudo conectar con el servidor para cargar las parcelas.");
    }
  };

  useEffect(() => {
    fetchParcelas();
  }, []);
  const handleInputChange = (e) => {
    setNuevaParcela({
      ...nuevaParcela,
      [e.target.name]: e.target.value,
    });
  };


  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${API_BASE_URL}/parcelas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevaParcela),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje(`Parcela "${data.nombre}" registrada exitosamente.`);
        setError(null);
        setNuevaParcela({ nombre: "", mac_esp32: "" });
        fetchParcelas();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al registrar la parcela.");
        setMensaje(null);
      }
    } catch (err) {
      console.error("Error al crear parcela:", err);
      setError("No se pudo conectar con el servidor.");
      setMensaje(null);
    }
  };
  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar la parcela "${nombre}"?`)) {
      return;
    }
    
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${API_BASE_URL}/parcelas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMensaje(`Parcela "${nombre}" eliminada exitosamente.`);
        setError(null);
        fetchParcelas();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al eliminar la parcela.");
        setMensaje(null);
      }
    } catch (err) {
      console.error("Error al eliminar parcela:", err);
      setError("No se pudo conectar con el servidor.");
      setMensaje(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-800">
        Gestión de Parcelas
      </h2>

      {mensaje && <p className="p-3 my-2 text-green-700 bg-green-100 rounded text-center">{mensaje}</p>}
      {error && <p className="p-3 my-2 text-red-700 bg-red-100 rounded text-center">{error}</p>}

      <div className="mb-8 border-b pb-4">
        <h3 className="text-xl font-semibold mb-3">Registrar Nueva Parcela</h3>
        <form onSubmit={handleCreateSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la parcela (Ej: Sector A)"
            value={nuevaParcela.nombre}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            name="mac_esp32"
            placeholder="MAC de la ESP32 (Ej: 1A:2B:3C:4D:5E:6F)"
            value={nuevaParcela.mac_esp32}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
          
          <button
            type="submit"
            className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200 font-medium"
          >
            Crear Parcela
          </button>
        </form>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-3">Listado de Parcelas</h3>
        {parcelas.length === 0 ? (
          <p className="text-gray-500">No hay parcelas registradas aún.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MAC ESP32</th>
                  
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {parcelas.map((parcela) => (
                  <tr key={parcela._id}> 
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{parcela.nombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parcela.mac_esp32}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(parcela._id, parcela.nombre)}
                        className="text-red-600 hover:text-red-900 ml-4"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CRUDParcelas;