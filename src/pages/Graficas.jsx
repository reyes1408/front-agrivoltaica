import React from "react";
import Grafica from "../components/Grafica";
import Navbar from "../components/navbar";

const Graficas = () => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-2 gap-5 p-5 scroll-auto">
        <Grafica nombreGrafica={"Humedad del suelo"} />
        <Grafica nombreGrafica={"Humedad del aire"} />
        <Grafica nombreGrafica={"Luminosidad"} />
        <Grafica nombreGrafica={"Temperatura"} />
      </div>
    </div>
  );
};

export default Graficas;
