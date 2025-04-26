"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const focusInput = (ref) => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login exitoso', data);
        alert('¡Bienvenido!');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error en login:', response.status, errorData);
        alert('Error en login');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert('Error de conexión');
    }
  };

  return (
    <div className="flex min-h-screen bg-amber-50">
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center max-w-md">
          <div className="mb-4">
            <Image 
              src="/images/logo.png" 
              alt="Hotel Lindo Sueño Logo" 
              width={200} 
              height={100}
            />
          </div>
          <h1 className="text-4xl font-bold tracking-wider mb-2 text-center">HOTEL LINDO SUEÑO</h1>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center p-8 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <Image 
            src="/images/logo.png" 
            alt="Background Logo" 
            fill
            style={{ objectFit: 'contain' }}
            className="opacity-20"
          />
        </div>

        <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-amber-800">Iniciar Sesión</h2>

          <div className="mb-4">
            <div
              className="text-amber-800 font-medium mb-2 cursor-pointer"
              onClick={() => focusInput(emailRef)}
            >
              Correo Electrónico
            </div>
            <input
              ref={emailRef}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Ingrese su correo"
              className="w-full bg-amber-50 rounded-lg p-4 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
            />
          </div>

          <div className="mb-6">
            <div
              className="text-amber-800 font-medium mb-2 cursor-pointer"
              onClick={() => focusInput(passwordRef)}
            >
              Contraseña
            </div>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Ingrese su contraseña"
              className="w-full bg-amber-50 rounded-lg p-4 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleLogin}
              className="bg-orange-700 hover:bg-orange-800 text-white font-medium py-3 px-8 rounded-lg shadow-md transition duration-300"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
