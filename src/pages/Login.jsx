import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../assets/Logo_Empresa.png';

const LoginView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://back-agrivoltaica.onrender.com/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: username,
          contrasena: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Token en localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('typeUser', data.categoria);

        navigate('/home');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
        setError(errorData.message || 'Usuario o contraseña inválidos');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Error durante el inicio de sesión');
    }
  };

  return (
    <div className="flex h-screen select-none" style={{ backgroundColor: '#020A27' }}>
      <div className="w-1/2 flex justify-center items-center">
        <img src={logo} alt="Logo" className="ml-28" />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-8">INICIO DE SESIÓN</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-200 text-red-800 rounded-md">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-6 flex items-center">
              <input
                type="text"
                id="username"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 p-4 w-full text-lg rounded-md"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747305.png"
                alt="Contraseña"
                className="h-8 w-8 ml-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#415292] hover:bg-[#3a4671] text-white py-3 text-lg rounded-md"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
