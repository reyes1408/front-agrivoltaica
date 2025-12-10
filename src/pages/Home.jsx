import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import ParcelaList from "../components/ParcelaList";
import ModalRegistrarCultivo from "../components/modalRegistrarCultivo";
import BotonRegistroParcela from "../components/botonRegistroParcela";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", mac: "" });
  const [datosSensor, setDatosSensor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoria, setCategoria] = useState(localStorage.getItem("typeUser"));

  console.log("Categoria en Home:", categoria);


  const fetchDatos = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No se encontró el token de autenticación.");
      //Obtiene las parcelas con la ultima informacion enviada
      const response = await fetch(
        "https://back-agrivoltaica.onrender.com/sensores/last-data",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener los datos.");
      }

      const data = await response.json();
      setDatosSensor(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatos();

    const intervalId = setInterval(() => {
      fetchDatos();
    }, 6000);

    // Limpieza del intervalo cuando se desmonta el componente
    return () => clearInterval(intervalId);
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAccept = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) throw new Error("No se encontró el token de autenticación.");

      const response = await fetch(
        "https://back-agrivoltaica.onrender.com/parcelas",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error desconocido");
      }

      const nuevaParcela = await response.json();
      setDatosSensor((prev) => [...prev, nuevaParcela]);
      alert("Parcela creada exitosamente.");
      handleCancel();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    setFormData({ nombre: "", mac: "" });
  };

  return (
    <>
      <Navbar categoria={categoria} />
      <div className="py-10 px-20 text-center scroll-auto">
        <ParcelaList
          loading={loading}
          error={error}
          datosSensor={datosSensor}
        />
      </div>
      {categoria === "admin" && (
        <>
          <BotonRegistroParcela setModalOpen={setModalOpen} />
          <ModalRegistrarCultivo
            isOpen={modalOpen}
            onClose={handleCancel}
            onAccept={handleAccept}
            formData={formData}
            onInputChange={handleInputChange}
          />
        </>
      )}
    </>
  );
};

export default Home;
