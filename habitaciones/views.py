from rest_framework import viewsets
from .models import Habitacion
from .serializers import HabitacionSerializer

'''
Usamos modelviewset para hace todos los metodos de un CRUD
Como usar los metodos de un CRUD
GET (LISTAR) http://localhost:8000/api/habitaciones/ 
POST (CREAR) http://localhost:8000/api/habitaciones/ (Colocamos formato en JSON)
PUT (ACTUALIZAR) http://localhost:8000/api/habitaciones/id/ (Al final colocamos el ID de la habitacion y el formato en JSON)
DELETE (ELIMINAR) http://localhost:8000/api/habitaciones/id/ (Al final colocamos el ID de la habitacion)
'''
class HabitacionViewSet(viewsets.ModelViewSet):
    queryset = Habitacion.objects.all()
    serializer_class = HabitacionSerializer

