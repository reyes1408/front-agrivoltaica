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
        const response = await fetch(
          "https://agrivoltaica.onrender.com/sensores_data/last-data",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Agrega el token Bearer
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setDatosSensor(data); // Actualiza los datos del sensor
          setError(null);
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
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAccept = async () => {
    const token = localStorage.getItem("authToken"); // Recupera el token desde localStorage
    if (!token) {
      alert("No se encontró el token de autenticación.");
      return;
    }

    try {
      const response = await fetch(
        "https://agrivoltaica.onrender.com/parcelas",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Agregar el token Bearer
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Enviar formData como JSON
        }
      );

      if (response.ok) {
        const nuevaParcela = await response.json(); // Obtener la parcela creada desde la respuesta
        console.log("Parcela creada con éxito:", nuevaParcela);
        setDatosSensor((prevDatos) => [...prevDatos, nuevaParcela]);
        alert("Parcela creada exitosamente.");
        setModalOpen(false);
        setFormData({ nombre: "", mac: "" });
      } else {
        const errorData = await response.json();
        alert(
          `Error al crear la parcela: ${
            errorData.message || "Error desconocido"
          }`
        );
      }
    } catch (err) {
      console.error("Error al enviar la solicitud:", err);
      alert("Error al conectar con el servidor.");
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    setFormData({ nombre: "", mac: "" });
  };

  return (
    <>
      <Navbar />
      <div className="py-10 px-20 text-center scroll-auto">
        {loading ? (
          <p>Cargando datos...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          datosSensor.map((sensor, i) => (
            <div
              key={sensor.id}
              className="w-full rounded-md bg-slate-100 mb-5 p-5"
            >
              <p className="text-xl font-semibold">{`${sensor.parcela_nombre}: {${sensor.parcela_mac}}`}</p>
              <Link
                to="/graficas"
                className="w-full flex grid-cols-4 gap-10 justify-center p-10"
              >
                <Parcela
                  key={`${sensor.id}_1_${i}`}
                  numeroSeccion={"1"}
                  humedadSuelo={`${sensor.humedad_suelo}%`}
                  luminosidad={`${sensor.iluminacion} lx`}
                  temperatura={`${sensor.temp}`} // Actualiza si tienes estos datos
                  humedadAire={`${sensor.humedad_aire}`} // Actualiza si tienes estos datos
                />
                <Parcela
                  key={`${sensor.id}_2_${i}`}
                  numeroSeccion={"2"}
                  humedadSuelo={`${sensor.humedad_suelo_2}%`}
                  luminosidad={`${sensor.iluminacion_2} lx`}
                  temperatura={`${sensor.temp}`} // Actualiza si tienes estos datos
                  humedadAire={`${sensor.humedad_aire}`} // Actualiza si tienes estos datos
                />
              </Link>
            </div>
          ))
        )}
      </div>
      <BotonRegistroParcela setModalOpen={setModalOpen} />
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
