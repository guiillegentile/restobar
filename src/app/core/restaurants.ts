import { Injectable } from '@angular/core';

export interface Restaurant {
  id: string;
  nombre: string;
  destacado?: boolean;
  categorias: string[];
  horario?: string;
  direccion?: string;
}

@Injectable({ providedIn: 'root' })
export class RestaurantsService {
  private readonly restaurantes: Restaurant[] = [
    {
      id: 'pizzeria-roma',
      nombre: 'Pizzería Roma',
      destacado: true,
      categorias: ['Pizzas', 'Empanadas'],
      horario: '12:00–00:00',
      direccion: 'Mitre 1234, Centro'
    },
    {
      id: 'parrilla-el-patio',
      nombre: 'Parrilla El Patio',
      categorias: ['Parrilla', 'Pastas'],
      horario: '11:30–15:30 / 20:00–00:00',
      direccion: 'Bv. Oroño 2500'
    },
    {
      id: 'sushi-nami',
      nombre: 'Sushi Nami',
      categorias: ['Sushi', 'Wok'],
      horario: '19:30–23:30',
      direccion: 'Av. Pellegrini 2001'
    },
    {
      id: 'bodegon-san-juan',
      nombre: 'Bodegón San Juan',
      categorias: ['Milanesas', 'Pastas', 'Minutas'],
      horario: '12:00–16:00 / 20:00–00:00',
      direccion: 'San Juan 789'
    }
  ];

  getAll() { return this.restaurantes; }
  getById(id: string) { return this.restaurantes.find(r => r.id === id) ?? null; }
}