# habitaciones/tests.py
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Habitacion

class HabitacionTests(APITestCase):

    def setUp(self):
        self.habitacion_data = {
            'tipo_habitacion': 'sencilla',
            'numero_habitacion': 101,
            'precio': 150000.0,
            'estado': True
        }
        self.habitacion = Habitacion.objects.create(**self.habitacion_data)

    def test_crear_habitacion(self):
        data = {
            'tipo_habitacion': 'doble',
            'numero_habitacion': 102,
            'precio': 180000.0,
            'estado': True
        }
        response = self.client.post('/api/habitaciones/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['numero_habitacion'], 102)

    def test_listar_habitaciones(self):
        response = self.client.get('/api/habitaciones/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_detalle_habitacion(self):
        response = self.client.get(f'/api/habitaciones/{self.habitacion.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['numero_habitacion'], 101)

    def test_actualizar_habitacion(self):
        data = {
            'tipo_habitacion': 'triple',
            'numero_habitacion': 101,  # debe mantenerse igual porque es único
            'precio': 200000.0,
            'estado': False
        }
        response = self.client.put(f'/api/habitaciones/{self.habitacion.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['tipo_habitacion'], 'triple')
        self.assertFalse(response.data['estado'])

    def test_eliminar_habitacion(self):
        response = self.client.delete(f'/api/habitaciones/{self.habitacion.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Habitacion.objects.filter(id=self.habitacion.id).exists())
