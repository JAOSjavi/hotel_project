"use client";
import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

export default function adm() {
  const [formData, setFormData] = useState({
    tipo_habitacion: '',
    numero_habitacion: '',
    descripcion: '',
    precio: '',
    estado: true,
    imagen: null
  });

  // Referencias para los campos de entrada
  const tipoHabitacionRef = useRef(null);
  const numeroHabitacionRef = useRef(null);
  const descripcionRef = useRef(null);
  const precioRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        imagen: e.target.files[0]
      }));
    }
  };

  // Función para enfocar un campo cuando se hace clic en su etiqueta
  const focusInput = (ref) => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  };

  const handleCreateRoom = async () => {
    try {
      // Crear FormData para manejar la carga de archivos
      const formDataToSend = new FormData();
      formDataToSend.append('tipo_habitacion', formData.tipo_habitacion);
      formDataToSend.append('numero_habitacion', formData.numero_habitacion);
      formDataToSend.append('precio', formData.precio);
      formDataToSend.append('estado', formData.estado);
      
      // Solo añadir la imagen si existe
      if (formData.imagen) {
        formDataToSend.append('imagen', formData.imagen);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/habitaciones/`, {
        method: 'POST',
        // No establecer Content-Type cuando se usa FormData,
        // el navegador lo configurará automáticamente con boundary
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('Habitación creada con éxito!');
        // Limpiar el formulario después de éxito
        setFormData({
          tipo_habitacion: '',
          numero_habitacion: '',
          descripcion: '',
          precio: '',
          estado: true,
          imagen: null
        });
        alert('Habitación creada correctamente');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error al crear la habitación:', response.status, errorData);
        alert(`Error al crear la habitación: ${response.status}`);
      }
    } catch (error) {
      console.error('Hubo un error al comunicarse con el servidor:', error);
      alert('Error de conexión con el servidor');
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
                onChange={handleImageUpload}
              />
              <button
                onClick={() => document.getElementById('imageUpload').click()}
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
              {formData.imagen && (
                <div className="ml-4 text-amber-800">
                  Imagen seleccionada: {formData.imagen.name}
                </div>
              )}
            </div>

            {/* Form Fields with clickable labels */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <div
                  className="text-amber-800 font-medium mb-2 cursor-pointer"
                  onClick={() => focusInput(tipoHabitacionRef)}
                >
                  Tipo de Habitación
                </div>
                <input
                  ref={tipoHabitacionRef}
                  type="text"
                  name="tipo_habitacion"
                  value={formData.tipo_habitacion}
                  onChange={handleInputChange}
                  placeholder="Tipo de habitación"
                  className="w-full bg-amber-50 rounded-lg p-4 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
                />
              </div>
              <div className="flex-1">
                <div
                  className="text-amber-800 font-medium mb-2 cursor-pointer"
                  onClick={() => focusInput(numeroHabitacionRef)}
                >
                  Número de Habitación
                </div>
                <input
                  ref={numeroHabitacionRef}
                  type="text"
                  name="numero_habitacion"
                  value={formData.numero_habitacion}
                  onChange={handleInputChange}
                  placeholder="Número"
                  className="w-full bg-amber-50 rounded-lg p-4 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
                />
              </div>
            </div>

            {/* Description Area with clickable label */}
            <div className="flex gap-4 mb-6">
              <div className="flex-grow">
                <div
                  className="text-amber-800 font-medium mb-2 cursor-pointer"
                  onClick={() => focusInput(descripcionRef)}
                >
                  Descripción
                </div>
                <textarea
                  ref={descripcionRef}
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder="Descripción de la habitación"
                  className="w-full bg-amber-50 rounded-lg p-4 h-32 border border-amber-200 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
                ></textarea>
              </div>
              <div className="flex flex-col gap-4 w-64">
                <div>
                  <div
                    className="text-amber-800 font-medium mb-2 cursor-pointer"
                    onClick={() => focusInput(precioRef)}
                  >
                    Precio
                  </div>
                  <input
                    ref={precioRef}
                    type="text"
                    name="precio"
                    value={formData.precio}
                    onChange={handleInputChange}
                    placeholder="Precio"
                    className="w-full bg-amber-50 rounded-lg p-4 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
                  />
                </div>
                <div>
                  <div className="text-amber-800 font-medium mb-2">
                    ¿Disponible?
                  </div>
                  <input
                    type="checkbox"
                    name="estado"
                    checked={formData.estado}
                    onChange={handleInputChange}
                    className="w-6 h-6 text-amber-600 rounded border-amber-200 focus:ring-amber-400 focus:ring-2"
                  />
                </div>
              </div>
            </div>

            {/* Create Room Button */}
            <div className="flex justify-center">
              <button
                onClick={handleCreateRoom}
                className="bg-orange-700 hover:bg-orange-800 text-white font-medium py-3 px-8 rounded-lg shadow-md transition duration-300"
              >
                Crear habitación
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}