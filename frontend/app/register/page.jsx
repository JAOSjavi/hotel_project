"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    correo: '',
    nombre_usuario: '',
    password: '',
    confirmar_password: ''
  });

  const nombreCompletoRef = useRef(null);
  const correoRef = useRef(null);
  const nombreUsuarioRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmarPasswordRef = useRef(null);

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

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmar_password) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const dataToSend = {
        nombre_completo: formData.nombre_completo,
        correo: formData.correo,
        username: formData.nombre_usuario,
        password: formData.password
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/usuarios/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log('Usuario registrado con éxito!');
        setFormData({
          nombre_completo: '',
          correo: '',
          nombre_usuario: '',
          password: '',
          confirmar_password: ''
        });
        alert('Usuario registrado correctamente');
        window.location.href = '/login';
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error al registrar usuario:', response.status, errorData);
        alert(`Error al registrar usuario: ${response.status}`);
      }
    } catch (error) {
      console.error('Hubo un error al comunicarse con el servidor:', error);
      alert('Error de conexión con el servidor');
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
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="relative w-full h-full">
            <Image 
              src="/images/logo.png" 
              alt="Background Logo" 
              fill
              className="object-contain"
            />
          </div>
        </div>
        
        <div className="bg-amber-950 p-8 rounded-lg shadow-lg w-full max-w-md z-10 relative">
          <h2 className="text-2xl font-semibold text-white text-center mb-8">
            Registro de usuario
          </h2>
          
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <input
                ref={nombreCompletoRef}
                type="text"
                name="nombre_completo"
                value={formData.nombre_completo}
                onChange={handleInputChange}
                placeholder="Nombre completo"
                className="w-full px-4 py-3 rounded bg-amber-50 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-600"
                required
              />
            </div>
            <div>
              <input
                ref={correoRef}
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleInputChange}
                placeholder="Correo electrónico"
                className="w-full px-4 py-3 rounded bg-amber-50 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-600"
                required
              />
            </div>
            <div>
              <input
                ref={nombreUsuarioRef}
                type="text"
                name="nombre_usuario"
                value={formData.nombre_usuario}
                onChange={handleInputChange}
                placeholder="Nombre de usuario"
                className="w-full px-4 py-3 rounded bg-amber-50 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-600"
                required
              />
            </div>
            <div>
              <input
                ref={passwordRef}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Contraseña"
                className="w-full px-4 py-3 rounded bg-amber-50 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-600"
                required
              />
            </div>
            <div>
              <input
                ref={confirmarPasswordRef}
                type="password"
                name="confirmar_password"
                value={formData.confirmar_password}
                onChange={handleInputChange}
                placeholder="Confirmar contraseña"
                className="w-full px-4 py-3 rounded bg-amber-50 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-600"
                required
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded transition duration-300"
              >
                Registrarse
              </button>
            </div>
            <div className="text-center mt-4">
              <a href="/login" className="text-amber-200 hover:text-amber-100 text-sm">
                ¿Ya tienes una cuenta? Inicia sesión
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}