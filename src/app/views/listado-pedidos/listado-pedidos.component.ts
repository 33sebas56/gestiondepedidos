
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-listado-pedidos',
  standalone: true,
  imports: [NgFor],
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.css'],
})
export class ListadoPedidosComponent {
  pedidos = ['Pedido 1', 'Pedido 2', 'Pedido 3']; // Simulación de datos
}