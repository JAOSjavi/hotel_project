"use client";
import React from 'react';
import Image from 'next/image';

export default function Login() {
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
        
        <div className="bg-amber-950 p-8 rounded-lg shadow-lg w-full max-w-md z-10 relative">
          <h2 className="text-2xl font-semibold text-white text-center mb-8">
            Inicio de sesión
          </h2>
          
          <form className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Usuario"
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
              <button
                type="submit"
                className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded transition duration-300"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
