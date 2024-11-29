
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = ({ categoria }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar token de localStorage
    localStorage.removeItem('authToken');

    navigate('/');
  };

  return (
    <div className="w-full h-14">
      <div className="py-2 px-6 flex justify-between items-center bg-blue-950 shadow-md fixed w-full z-50">
        <div className="text-lg font-bold text-white">
          Sistema de monitoreo de cultivos
        </div>

        <div className="flex gap-4 text-sm">
          {
            categoria === "admin" ? (
              <>
                <Link to="/home" className="px-2 py-1 bg-white rounded hover:bg-gray-200 flex gap-1">
                  <img src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png" alt="" className="w-4 h-4" />
                  <p>Parcelas</p>
                </Link>
                <Link to="/register" className="px-2 py-1 bg-white rounded hover:bg-gray-200 flex gap-1">
                  <img src="https://cdn-icons-png.flaticon.com/512/747/747376.png" alt="" className="w-4 h-4" />
                  
                  <p>Registrar usuario</p>
                </Link>
                <Link to="/registro-cultivo" className="px-2 py-1 bg-white rounded hover:bg-gray-200 flex gap-1">
                  <img src="https://cdn-icons-png.flaticon.com/512/8445/8445252.png" alt="" className="w-4 h-4" />
                  <p>Registrar cultivo</p>
                </Link>
              </>
            ) : (<></>)
          }
          <button
            className="px-2 py-1 bg-red-300 rounded hover:bg-red-400 flex gap-1"
            onClick={handleLogout} // Llama al manejador
          >
            <img src="https://cdn-icons-png.flaticon.com/512/3889/3889524.png" alt="" className="w-4 h-4" />
            <p>Cerrar sesión</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
