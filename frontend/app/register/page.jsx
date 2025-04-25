import React from 'react';
import Image from 'next/image';

export default function Register() {
  return (
    <div className="flex min-h-screen bg-amber-50">
      {/* Left side with logo */}
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

      {/* Right side with registration form */}
      <div className="w-1/2 flex items-center justify-center p-8 bg-white relative overflow-hidden">
        {/* Background image with reduced opacity */}
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
          
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Nombre completo"
                className="w-full px-4 py-3 rounded bg-amber-50 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-600"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full px-4 py-3 rounded bg-amber-50 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-600"
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Nombre de usuario"
                className="w-full px-4 py-3 rounded bg-amber-50 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-600"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full px-4 py-3 rounded bg-amber-50 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-600"
                required
              />
            </div>
            <div>
              <input
                type="password"
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
