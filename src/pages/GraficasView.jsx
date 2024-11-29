import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Grafica from "../components/Grafica";
import Navbar from "../components/navbar";
import { useLocation } from "react-router-dom";
import Tabla from "../components/tabla";

const GraficasView = () => {
  const [data, setData] = useState(null);
  const [diaInicio, setDiaInicio] = useState(null);
  const [diaFinal, setDiaFinal] = useState(null);
  const [mejorRango, setMejorRango] = useState([]);
  const [dayTemp, setDayTemp] = useState(null);
  const [cultivos, setCultivos] = useState([]);
  const [selectedCultivo, setSelectedCultivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const mac = location.state;

  const handleImprimirReporte = async () => {
    const pdf = new jsPDF("landscape", "pt", "a4");
    const content = document.getElementById("reporte");
  
    if (!content) return;
  
    try {
      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
      });
  
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 800;
      const imgHeight = 550;
  
      pdf.addImage(imgData, "PNG", 30, 0, imgWidth, imgHeight);
      pdf.save(`Reporte_${selectedCultivo || "cultivo"}.pdf`);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };
  
  

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
      setMejorRango(result.mejorRango);
    } catch (error) {
      setError("Error al cargar el rango óptimo: " + error.message);
    }
  };

  useEffect(() => {
    if (!selectedCultivo) return;

    const fetchAllData = async () => {
      setLoading(true);
      try {
        await fetchSensoresData();
        await fetchRangoOptimo();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [selectedCultivo]);

  return (
    <div>
      <Navbar />
      <div className="p-10">
        <label htmlFor="cultivo" className="block mb-2 text-sm font-medium text-gray-900">
          Selecciona un cultivo:
        </label>

        <div className="flex gap-3">
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
          {data && (
            <button
              className="w-40 border border-gray-300 rounded-lg hover:bg-gray-300"
              onClick={handleImprimirReporte}
            >
              Imprimir reporte
            </button>
          )}
        </div>

        {loading && <div className="text-center mt-5">Cargando...</div>} {/* Indicador de carga */}
        {error && <div className="text-center mt-5 text-red-500">{error}</div>} {/* Mensaje de error */}

        {data && diaInicio !== null && diaFinal !== null ? (
          <div id="reporte">
            <p className="text-2xl font-semibold text-center pt-5">Grafica de días optimos</p>
            <div className="grid grid-cols-2 gap-5 py-3">
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
            <p className="text-2xl font-semibold text-center py-5">Tabla de días destacados</p>
            <Tabla mejorRango={mejorRango} />
          </div>
        ) : (
          <div className="text-center mt-10">Selecciona un cultivo para ver los datos.</div>
        )}
      </div>
    </div>
  );
};

export default GraficasView;