import React from "react";
import Grafica from "../components/Grafica";

const Graficas = () => {
  return (
    <div className="grid grid-cols-2 gap-5 p-5">
      <Grafica
        nombreGrafica={"Humedad del suelo"}
      />
      <Grafica
        nombreGrafica={"Humedad del aire"}
      />
      <Grafica
        nombreGrafica={"Luminosidad"}
      />
      <Grafica
        nombreGrafica={"Temperatura"}
      />
    </div>
  );
};

export default Graficas;
