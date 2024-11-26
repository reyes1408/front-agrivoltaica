import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="w-full h-14">
      <div className="py-2 px-6 flex justify-between items-center bg-blue-950 shadow-md fixed w-full z-50">
        <div className="text-lg font-bold text-white">
          Sistema de monitoreo de cultivos
        </div>

        <div className="flex gap-4 text-sm">
          <Link to="/home" className="px-2 py-1 bg-white rounded hover:bg-gray-200 flex gap-1">
            <img src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png" alt="" className='w-4 h-4' />
            <p>
              Parcelas
            </p>
          </Link>
          <Link to="/reportes" className="px-2 py-1 bg-white rounded hover:bg-gray-200 flex gap-1">
            <img src="https://cdn-icons-png.flaticon.com/512/3093/3093748.png" alt="" className='w-4 h-4' />
            Reporte
          </Link>
          <Link to="/graficas" className="px-2 py-1 bg-white rounded hover:bg-gray-200 flex gap-1">
            <img src="https://cdn-icons-png.flaticon.com/512/11128/11128057.png" alt="" className='w-5' />
            Gráficas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
