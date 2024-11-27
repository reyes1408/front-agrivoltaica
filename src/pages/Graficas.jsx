import React, { useEffect, useState } from "react";
import Grafica from "../components/Grafica";
import Navbar from "../components/navbar";

const Graficas = () => {
  const [data, setData] = useState(null); // Estado para almacenar los datos de las gráficas
  const [rango, setRango] = useState(null); // Estado para almacenar el rango óptimo
  const [dayTemp, setDayTemp] = useState(null); // Estado para almacenar el rango óptimo

  useEffect(() => {
    const fetchSensoresData = async () => {
      try {
        const response = await fetch("http://localhost:3000/sensores_data/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mac: "24:DC:C3:45:90:A0" }), // Reemplaza con el valor adecuado
        });

        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }

        const result = await response.json();

        // Usar los valores directamente
        const days = result.map((item) => item.day);
        const iluminacion = result.map((item) => item.avg_iluminacion);
        const humedadSuelo = result.map((item) => item.avg_humedad_suelo);
        const humedadAire = result.map((item) => item.avg_humedad_aire);
        const temperatura = result.map((item) => item.avg_temp)
        temperatura.unshift(0)

        setDayTemp([0, ...days])

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
        const response = await fetch("http://localhost:3000/sensores_data/rango-optimo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rango: 7,
            mac: "24:DC:C3:45:90:A0",
            iluminacion_optima: "1800",
            humedad_suelo_optima: "1800",
            humedad_aire_optima: "60",
            temp_optima: "30",
          }),
        });

        if (!response.ok) {
          throw new Error("Error al obtener el rango óptimo");
        }

        const result = await response.json();
        setRango(result.rango); // Guardar el rango en el estado
      } catch (error) {
        console.error("Error al cargar el rango óptimo:", error);
      }
    };

    fetchSensoresData();
    fetchRangoOptimo();

  }, []);

  if (!data) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="mt-10 grid grid-cols-2 gap-5 p-5">
        <Grafica nombreGrafica="Iluminación" valores={data.iluminacion} categorias={data.days} rango={rango} />
        <Grafica nombreGrafica="Humedad del suelo" valores={data.humedadSuelo} categorias={data.days} rango={rango} />
        <Grafica nombreGrafica="Humedad del aire" valores={data.humedadAire} categorias={data.days} rango={rango} />
        <Grafica nombreGrafica="Temperatura" valores={data.temperatura} categorias={dayTemp} rango={rango} />
      </div>
    </div>
  );
};

export default Graficas;
