import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const Grafica = ({ nombreGrafica, valores, categorias, diaInicio, diaFinal }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartConfig = {
      series: [
        {
          name: nombreGrafica,
          data: valores,
        },
      ],
      chart: {
        type: "line",
        height: 240,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: categorias,
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      colors: ["#1D4ED8"],
      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
      },
      annotations: {
        xaxis: "Hola"
          ? [
              {
                x: diaInicio,
                x2: diaFinal,
                fillColor: "#007863", // Color del área resaltada
                opacity: 0.4,
                label: {
                  text: "Rango Óptimo",
                  style: {
                    color: "#000",
                    fontSize: "10px",
                  },
                },
              },
            ]
          : [],
      },
    };

    const chart = new ApexCharts(chartRef.current, chartConfig);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [valores, categorias]);

  return (
    <div className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md">
      <div className="relative mx-4 mt-4">
        <h6 className="font-semibold text-blue-gray-900">{nombreGrafica}</h6>
      </div>
      <div className="pt-6 px-2">
        <div id="line-chart" ref={chartRef}></div>
      </div>
    </div>
  );
};

export default Grafica;
