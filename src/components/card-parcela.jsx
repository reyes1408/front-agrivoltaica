import React from "react";

const Parcela = ({ numeroSeccion, humedadSuelo, luminosidad, temperatura, humedadAire,}) => {

  return (
    <div className="w-1/3 h-80 bg-slate-200 rounded-lg p-10 shadow-md">
      <p className="text-2xl font-semibold text-center mb-5">{`Sección ${numeroSeccion}`}</p>

      <div className="flex items-center">
        <img
          src="	https://cdn-icons-png.freepik.com/512/1150/1150459.png?ga=GA1.1.2037422306.1716451960"
          alt=""
          className="w-4 h-4 mr-2"
        />
        <p>{`Humedad del suelo: ${humedadSuelo}`}</p>
      </div>
      <div className="flex items-center">
        <img
          src="	https://cdn-icons-png.flaticon.com/512/606/606795.png"
          alt=""
          className="w-4 h-4 mr-2"
        />
        <p>{`Luminosidad: ${luminosidad}`}</p>
      </div>
      <div className="flex items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/808/808602.png"
          alt=""
          className="w-4 h-4 mr-2"
        />
        <p>{`Temperatura: ${temperatura}`}</p>
      </div>
      <div className="flex items-center">
        <img
          src="	https://cdn-icons-png.freepik.com/512/5707/5707386.png?ga=GA1.1.2037422306.1716451960"
          alt=""
          className="w-4 h-4 mr-2"
        />
        <p>{`Humedad del aire: ${humedadAire}`}</p>
      </div>
    </div>
  );
};

export default Parcela;
