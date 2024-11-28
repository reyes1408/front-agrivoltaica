import React, { useEffect, useState } from "react";
import Grafica from "../components/Grafica";
import Navbar from "../components/navbar";

const Graficas = () => {
  const [data, setData] = useState(null);
  const [rango, setRango] = useState(null);
  const [dayTemp, setDayTemp] = useState(null);
  const [cultivos, setCultivos] = useState([]); // Guardar cultivos
  const [selectedCultivo, setSelectedCultivo] = useState(null); // Cultivo seleccionado

  // Cargar cultivos desde el endpoint
  useEffect(() => {
    const fetchCultivos = async () => {
      try {
        const response = await fetch("https://agrivoltaica.onrender.com/cultivos/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`, // Token de autorización
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los cultivos");
        }

        const result = await response.json();
        setCultivos(result); // Actualizar cultivos en el estado
      } catch (error) {
        console.error("Error al cargar los cultivos:", error);
      }
    };

    fetchCultivos();
  }, []);

  // Cargar datos de sensores y rango óptimo basado en el cultivo seleccionado
  useEffect(() => {
    if (!selectedCultivo) return;

    const fetchSensoresData = async () => {
      try {
        const response = await fetch("https://agrivoltaica.onrender.com/sensores_data/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mac: "24:DC:C3:45:90:A0" }),
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
        console.error("Error al cargar los datos:", error);
      }
    };

    const fetchRangoOptimo = async () => {
      try {
        console.table(cultivos);
    
        // Buscar el cultivo seleccionado
        const cultivoSeleccionado = cultivos.find(
          (cultivo) => cultivo.id === parseInt(selectedCultivo)
        );
    
        if (!cultivoSeleccionado) {
          console.error("No se encontró el cultivo seleccionado.");
          return;
        }
    
        // Construir el cuerpo de la solicitud con los datos del cultivo
        const body = {
          rango: 7,
          mac: "24:DC:C3:45:90:A0",
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
        console.table(result);
    
        setRango(result.rango);
      } catch (error) {
        console.error("Error al cargar el rango óptimo:", error);
      }
    };
    

    fetchSensoresData();
    fetchRangoOptimo();
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
      {data ? (
        <div className="grid grid-cols-2 gap-5 p-5">
          <Grafica nombreGrafica="Iluminación" valores={data.iluminacion} categorias={data.days} rango={rango} />
          <Grafica nombreGrafica="Humedad del suelo" valores={data.humedadSuelo} categorias={data.days} rango={rango} />
          <Grafica nombreGrafica="Humedad del aire" valores={data.humedadAire} categorias={data.days} rango={rango} />
          <Grafica nombreGrafica="Temperatura" valores={data.temperatura} categorias={dayTemp} rango={rango} />
        </div>
      ) : (
        <div className="text-center mt-10">Selecciona un cultivo para ver los datos.</div>
      )}
    </div>
  );
};

export default Graficas;
