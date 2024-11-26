import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const Grafica = ({ nombreGrafica }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartConfig = {
      series: [
        {
          name: "Sección 1",
          data: [500, 90, 200, 320, 500, 350, 200, 230, 500, 200, 250],
        },
        {
          name: "Sección 2",
          data: [30, 20, 320, 330, 200, 430, 100, 130, 300, 400, 270],
        },
        {
          name: "Sección 3",
          data: [70, 430, 360, 630, 730, 360, 600, 530, 350, 500, 350],
        },
      ],
      chart: {
        type: "line",
        height: 240,
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617", "#1D4ED8", "#DC2626"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ],
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
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
      annotations: {
        yaxis: [
          {
            y: "200",
            y2: "600",
            borderColor: "#FF5733",
            fillColor: "rgba(255, 87, 51, 0.2)",
            opacity: 0.4,
            label: {
              borderColor: "#FF5733",
              style: {
                color: "#fff",
                background: "#FF5733",
              },
              text: "Rango Destacado",
            },
          },
        ],
      },
    };

    const chart = new ApexCharts(chartRef.current, chartConfig);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div
      className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
      style={{ zIndex: 10 }}
    >
      <div className="relative mx-4 mt-4 flex flex-col gap-4 overflow-hidden bg-transparent md:flex-row md:items-center">
        <div>
          <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900">
            {nombreGrafica}
          </h6>
        </div>
      </div>
      <div className="pt-6 px-2 pb-0">
        <div id="line-chart" ref={chartRef}></div>
      </div>
    </div>
  );
};

export default Grafica;
