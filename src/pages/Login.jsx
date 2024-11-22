import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../assets/Logo_Empresa.png';

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/users/login', { // Cambia esta URL según tu backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Guarda el token o información del usuario si es necesario
        console.log('Login successful:', data);
        navigate('/Home'); // Redirige a la vista Home
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
        setError(errorData.message || 'Correo o contraseña inválidos'); // Muestra un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Error durante el inicio de sesión'); // Maneja cualquier error de red o inesperado
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
                type="email" 
                id="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="border border-gray-300 p-4 w-full text-lg rounded-md"
              />
              <img src="https://cdn-icons-png.flaticon.com/512/646/646094.png" alt="Email" className="h-8 w-8 ml-2" />
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
              <img src="https://cdn-icons-png.flaticon.com/512/747/747305.png" alt="Contraseña" className="h-8 w-8 ml-2" />
            </div>
            
            {/* Enlace para olvidar la contraseña */}
            <Link to="/olvidar-contrasena" className="text-blue-500 hover:text-blue-700 block mb-4 text-sm">
              ¿Contraseña olvidada?
            </Link>

            {/* Botón de inicio de sesión */}
            <button 
              type="submit" 
              className="w-full bg-[#415292] hover:bg-[#3a4671] text-white py-3 text-lg rounded-md"
            >
              Iniciar sesión
            </button>
          </form>
          <div className="mt-4 flex items-center">
            <p className="mr-2">¿No tiene una cuenta?</p>
            <Link to="/registro" className="text-blue-500 hover:text-blue-700 text-sm">
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;