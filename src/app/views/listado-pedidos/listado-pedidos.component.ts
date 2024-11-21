import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { PedidosService } from '../../service/pedidos.service';
import { PedidosComponent } from '../pedidos/pedidos.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-pedidos',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.css'],
})
export class ListaPedidosComponent implements OnInit {
  mostrarMenu: boolean = false;
  pedidos: { 
    nombre: string; 
    descripcion: string; 
    precio: number; 
    usuarioId?: string; 
    estado: string; // Nuevo campo para manejar el estado
  }[] = [];
  router: any;

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    // Inicializamos el estado de cada pedido
    this.pedidos = this.pedidosService.obtenerTodosLosPedidos().map(pedido => ({
      ...pedido,
      estado: 'En espera', // Estado inicial
    }));
  }

  // Métodos para cambiar el estado
  cambiarEstado(pedido: any, nuevoEstado: string): void {
    pedido.estado = nuevoEstado;
  }
  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  irAPerfil() {
    this.router.navigate(['/user']);
  }

  irAListaPedidos() {
    this.router.navigate(['/menu']);
  }
}