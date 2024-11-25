import React, { useState, useEffect } from "react";
import Parcela from "../components/card-parcela";
import Navbar from "../components/navbar";
import ModalRegistrarCultivo from "../components/modalRegistrarCultivo";
import BotonRegistroParcela from "../components/botonRegistroParcela";
import { Link } from "react-router-dom";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    mac: "",
  });
  const [datosSensor, setDatosSensor] = useState([]); // Estado para los datos del sensor
  const [loading, setLoading] = useState(true); // Estado para el cargado
  const [error, setError] = useState(null); // Estado para errores

  // Fetch datos con token Bearer
  useEffect(() => {
    const fetchDatos = async () => {
      const token = localStorage.getItem("authToken"); // Recupera el token desde localStorage
      if (!token) {
        setError("No se encontró el token de autenticación.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/sensores_data/last-data", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Agrega el token Bearer
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDatosSensor(data); // Actualiza los datos del sensor
          setError(null); // Resetea cualquier error previo
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Error al obtener los datos.");
        }
      } catch (err) {
        setError("Error en la conexión con el servidor.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, []); // Ejecuta solo al montar el componente

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAccept = () => {
    console.log("Datos del cultivo registrados:", formData);
    setModalOpen(false);
    setFormData({ nombre: "", mac: "" });
  };

  const handleCancel = () => {
    setModalOpen(false);
    setFormData({ nombre: "", mac: "" });
  };

  return (
    <>
      <Navbar />
      <div className="py-10 px-20 text-center scroll-auto">
        <div className="w-full rounded-md bg-slate-100 mb-5 p-5">
          {loading ? (
            <p>Cargando datos...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            datosSensor.map((sensor, i) => (
              <div key={sensor.id}>
                <p className="text-xl font-semibold">{`${sensor.parcela_nombre}: {${sensor.parcela_mac}}`}</p>
                <Link to="/graficas" className="w-full flex grid-cols-4 gap-10 justify-center p-10">
                  <Parcela
                    key={`${sensor.id}_1_${i}`}
                    numeroSeccion={i + 1}
                    humedadSuelo={`${sensor.humedad_suelo}%`}
                    luminosidad={`${sensor.iluminacion} lx`}
                    temperatura={`N/A °C`} // Actualiza si tienes estos datos
                    humedadAire={`N/A%`} // Actualiza si tienes estos datos
                  />
                  <Parcela
                    key={`${sensor.id}_2_${i}`}
                    numeroSeccion={i + 1}
                    humedadSuelo={`${sensor.humedad_suelo_2}%`}
                    luminosidad={`${sensor.iluminacion_2} lx`}
                    temperatura={`N/A °C`} // Actualiza si tienes estos datos
                    humedadAire={`N/A%`} // Actualiza si tienes estos datos
                  />
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
      <BotonRegistroParcela setModalOpen={setModalOpen} />

      {/* Modal Registrar Cultivo */}
      <ModalRegistrarCultivo
        isOpen={modalOpen}
        onClose={handleCancel}
        onAccept={handleAccept}
        formData={formData}
        onInputChange={handleInputChange}
      />
    </>
  );
};

export default Home;
