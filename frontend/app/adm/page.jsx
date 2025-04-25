"use client";
import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

export default function adm() {
  const [formData, setFormData] = useState({
    roomType: '',
    roomNumber: '',
    description: '',
    price: '',
    status: ''
  });

  // Referencias para los campos de entrada
  const roomTypeRef = useRef(null);
  const roomNumberRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = () => {
    document.getElementById('imageUpload').click();
  };

  // Función para enfocar un campo cuando se hace clic en su etiqueta
  const focusInput = (ref) => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      {/* Barra superior con el mismo estilo que antes */}
      <div className="w-full bg-amber-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-left">Hotel Lindo Sueño</h1>
      </div>

      <div className="flex flex-1">
        {/* Sidebar component */}
        <Sidebar activeItem="Reportes" />

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-amber-800">Administración de Habitaciones</h1>
            </div>
          
            {/* Image Upload Area */}
            <div className="bg-amber-50 rounded-lg h-40 flex items-center justify-end p-4 mb-6 border border-amber-200">
              <input 
                type="file" 
                id="imageUpload" 
                accept="image/*" 
                className="hidden" 
              />
              <button 
                onClick={handleImageUpload}
                className="bg-amber-100 rounded-lg p-3 w-32 h-32 flex flex-col items-center justify-center border border-amber-300 hover:bg-amber-200 transition-colors"
              >
                <div className="mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-700">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <div className="bg-amber-400 rounded-full p-2 shadow-md">
                  <Upload size={18} className="text-amber-800" />
                </div>
                <span className="text-xs mt-2 text-amber-800">Subir imagen</span>
              </button>
            </div>

            {/* Form Fields with clickable labels */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <div 
                  className="text-amber-800 font-medium mb-2 cursor-pointer"
                  onClick={() => focusInput(roomTypeRef)}
                >
                  Escriba aquí1
                </div>
                <input
                  ref={roomTypeRef}
                  type="text"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleInputChange}
                  placeholder="Tipo de habitación"
                  className="w-full bg-amber-50 rounded-lg p-4 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
                />
              </div>
              <div className="flex-1">
                <div 
                  className="text-amber-800 font-medium mb-2 cursor-pointer"
                  onClick={() => focusInput(roomNumberRef)}
                >
                  Escriba aquí2
                </div>
                <input
                  ref={roomNumberRef}
                  type="text"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleInputChange}
                  placeholder="Numero"
                  className="w-full bg-amber-50 rounded-lg p-4 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
                />
              </div>
            </div>

            {/* Description Area with clickable label */}
            <div className="flex gap-4 mb-6">
              <div className="flex-grow">
                <div 
                  className="text-amber-800 font-medium mb-2 cursor-pointer"
                  onClick={() => focusInput(descriptionRef)}
                >
                  Escriba aquí3
                </div>
                <textarea
                  ref={descriptionRef}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descripcion de la habitacion"
                  className="w-full bg-amber-50 rounded-lg p-4 h-32 border border-amber-200 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
                ></textarea>
              </div>
              <div className="flex flex-col gap-4 w-64">
                <div>
                  <div 
                    className="text-amber-800 font-medium mb-2 cursor-pointer"
                    onClick={() => focusInput(priceRef)}
                  >
                    Escriba aquí4
                  </div>
                  <input
                    ref={priceRef}
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Precio"
                    className="w-full bg-amber-50 rounded-lg p-4 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
                  />
                </div>
                <div>
                  <div className="text-amber-800 font-medium mb-2">
                    Escriba aquí5
                  </div>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-amber-50 rounded-lg p-4 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
                  >
                    <option value="">Estado</option>
                    <option value="disponible">Disponible</option>
                    <option value="ocupada">Ocupada</option>
                    <option value="mantenimiento">En mantenimiento</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Create Room Button */}
            <div className="flex justify-center">
              <button 
                className="bg-orange-700 hover:bg-orange-800 text-white font-medium py-3 px-8 rounded-lg shadow-md transition duration-300"
              >
                Crear habitacion
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}