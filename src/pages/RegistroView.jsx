import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo_Empresa.png';

const RegistroView = () => {
  const [username, setUsuario] = useState('');
  const [userType, setUserType] = useState('investigador'); // Tipo de usuario por defecto
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const response = await fetch('https://back-agrivoltaica.onrender.com/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'usuario': username,
        'contrasena': password,
        'categoria': userType
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Usuario registrado con éxito');
      navigate('/'); // Redirige al login
    } else {
      alert('Error al registrar el usuario: ' + data.message);
    }
  };

  return (
    <div className="flex h-screen select-none" style={{ backgroundColor: '#020A27' }}>
      <div className="w-1/2 flex justify-center items-center">
        <img src={logo} alt="Logo" className="ml-28" />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-lg">
          <div className="flex items-center mb-8">
            <h2 className="text-3xl font-bold">REGISTRO</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6 flex items-center">
              <input
                type="text"
                id="usuario"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsuario(e.target.value)}
                required
                className="border border-gray-300 p-4 w-full text-lg rounded-md"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
                alt="Usuario"
                className="h-8 w-8 ml-2"
              />
            </div>

            <div className="mb-6 flex items-center">
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
                className="border border-gray-300 p-4 w-full text-lg rounded-md"
              >
                <option value="investigador">Investigador</option>
                <option value="admin">Administrador</option>
              </select>
              <img
                src="https://cdn-icons-png.flaticon.com/512/681/681443.png"
                alt="Tipo de Usuario"
                className="h-8 w-8 ml-2"
              />
            </div>

            <div className="mb-6 flex items-center">
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="border border-gray-300 p-4 w-full text-lg rounded-md"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747305.png"
                alt="Contraseña"
                className="h-8 w-8 ml-2"
              />
            </div>

            <div className="mb-6 flex items-center">
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border border-gray-300 p-4 w-full text-lg rounded-md"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747305.png"
                alt="Confirmar contraseña"
                className="h-8 w-8 ml-2"
              />
            </div>

            {/* Botón de registro */}
            <button
              type="submit"
              className="w-full bg-[#415292] hover:bg-[#3a4671] text-white py-3 text-lg rounded-md"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroView;
