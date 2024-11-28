import React, { useEffect, useState } from "react";
import Grafica from "../components/Grafica";
import Navbar from "../components/navbar";
import { useLocation } from "react-router-dom";

const Graficas = () => {
  const [data, setData] = useState(null);
  const [diaInicio, setDiaInicio] = useState(null);
  const [diaFinal, setDiaFinal] = useState(null);
  const [dayTemp, setDayTemp] = useState(null);
  const [cultivos, setCultivos] = useState([]);
  const [selectedCultivo, setSelectedCultivo] = useState(null);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  const location = useLocation();
  const mac = location.state;

  // Fetch para los cultivos
  useEffect(() => {
    const fetchCultivos = async () => {
      try {
        const response = await fetch("https://agrivoltaica.onrender.com/cultivos/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los cultivos");
        }

        const result = await response.json();
        setCultivos(result);
      } catch (error) {
        setError("Error al cargar los cultivos: " + error.message);
      }
    };

    fetchCultivos();
  }, []);

  // Fetch de los datos de sensores
  const fetchSensoresData = async () => {
    setLoading(true); // Inicia carga
    setError(null); // Resetea el error
    try {
      const response = await fetch("https://agrivoltaica.onrender.com/sensores_data/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mac: mac }),
      });

      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }

      const result = await response.json();
      const days = result.map((item) => item.day);
      const iluminacion = result.map((item) => item.avg_iluminacion);
      const humedadSuelo = result.map((item) => item.avg_humedad_suelo);
      const humedadAire = result.map((item) => item.avg_humedad_aire);
      const temperatura = result.map((item) => item.avg_temp);
      temperatura.unshift(0);

      setDayTemp([0, ...days]);

      setData({
        days,
        iluminacion,
        humedadSuelo,
        humedadAire,
        temperatura,
      });
    } catch (error) {
      setError("Error al cargar los datos: " + error.message);
    } finally {
      setLoading(false); // Finaliza carga
    }
  };

  // Fetch para el rango óptimo
  const fetchRangoOptimo = async () => {
    try {
      const cultivoSeleccionado = cultivos.find(
        (cultivo) => cultivo.id === parseInt(selectedCultivo)
      );

      if (!cultivoSeleccionado) {
        console.error("No se encontró el cultivo seleccionado.");
        return;
      }

      const body = {
        rango: 7,
        mac: mac,
        iluminacion_optima: cultivoSeleccionado.iluminosidad,
        humedad_suelo_optima: cultivoSeleccionado.humedad_suelo,
        humedad_aire_optima: cultivoSeleccionado.humedad_aire,
        temp_optima: cultivoSeleccionado.temp,
      };

      const response = await fetch(
        "https://agrivoltaica.onrender.com/sensores_data/rango-optimo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener el rango óptimo");
      }

      const result = await response.json();
      setDiaInicio(result.diaInicio);
      setDiaFinal(result.diaFinal);
    } catch (error) {
      setError("Error al cargar el rango óptimo: " + error.message);
    }
  };

  useEffect(() => {
    if (!selectedCultivo) return;

    const fetchAllData = async () => {
      await fetchSensoresData();
      await fetchRangoOptimo();
    };

    fetchAllData();
  }, [selectedCultivo]);

  return (
    <div>
      <Navbar />
      <div className="p-2">
        <label htmlFor="cultivo" className="block mb-2 text-sm font-medium text-gray-900">
          Selecciona un cultivo:
        </label>
        <select
          id="cultivo"
          className="block w-full p-2 border border-gray-300 rounded-lg"
          value={selectedCultivo || ""}
          onChange={(e) => setSelectedCultivo(e.target.value)}
        >
          <option value="" disabled>
            Selecciona un cultivo
          </option>
          {cultivos.map((cultivo) => (
            <option key={cultivo.id} value={cultivo.id}>
              {cultivo.nombre}
            </option>
          ))}
        </select>
      </div>

      {loading && <div className="text-center mt-5">Cargando...</div>} {/* Indicador de carga */}
      
      {error && <div className="text-center mt-5 text-red-500">{error}</div>} {/* Mensaje de error */}
      
      {data ? (
        <div className="grid grid-cols-2 gap-5 p-5">
          <Grafica
            nombreGrafica="Iluminación"
            valores={data.iluminacion}
            categorias={data.days}
            diaInicio={diaInicio}
            diaFinal={diaFinal}
          />
          <Grafica
            nombreGrafica="Humedad del suelo"
            valores={data.humedadSuelo}
            categorias={data.days}
            diaInicio={diaInicio}
            diaFinal={diaFinal}
          />
          <Grafica
            nombreGrafica="Humedad del aire"
            valores={data.humedadAire}
            categorias={data.days}
            diaInicio={diaInicio}
            diaFinal={diaFinal}
          />
          <Grafica
            nombreGrafica="Temperatura"
            valores={data.temperatura}
            categorias={dayTemp}
            diaInicio={diaInicio}
            diaFinal={diaFinal}
          />
        </div>
      ) : (
        <div className="text-center mt-10">Selecciona un cultivo para ver los datos.</div>
      )}
    </div>
  );
};

export default Graficas;
