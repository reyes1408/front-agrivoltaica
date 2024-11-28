import React from "react";
import { Link } from "react-router-dom";
import Parcela from "./card-parcela";

const ParcelaList = ({ loading, error, datosSensor }) => {
  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <>
      {datosSensor.map((sensor, i) => (
        <div
          key={sensor.id}
          className="w-full rounded-md bg-slate-100 mb-5 p-5"
        >
          <p className="text-xl font-semibold">{`${sensor.parcela_nombre}: {${sensor.parcela_mac}}`}</p>
          <Link
            to="/graficas"
            state={sensor.parcela_mac}
            className="w-full flex grid-cols-4 gap-10 justify-center p-10"
          >
            <Parcela
              key={`${sensor.id}_1_${i}`}
              numeroSeccion={"1"}
              humedadSuelo={`${sensor.humedad_suelo}%`}
              luminosidad={`${sensor.iluminacion} lx`}
              temperatura={`${sensor.temp}`}
              humedadAire={`${sensor.humedad_aire}`}
            />
            <Parcela
              key={`${sensor.id}_2_${i}`}
              numeroSeccion={"2"}
              humedadSuelo={`${sensor.humedad_suelo_2}%`}
              luminosidad={`${sensor.iluminacion_2} lx`}
              temperatura={`${sensor.temp}`}
              humedadAire={`${sensor.humedad_aire}`}
            />
          </Link>
        </div>
      ))}
    </>
  );
};

export default ParcelaList;
