import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PedidosService } from '../../service/pedidos.service';

@Component({
  selector: 'app-historial-pedidos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './historial-pedidos.component.html',
  styleUrl: './historial-pedidos.component.css'
})
export class HistorialPedidosComponent implements OnInit {
  pedidosUsuario: { nombre: string; descripcion: string; precio: number; usuarioId?: string }[] = [];
  usuarioId: string = 'user123'; // Supongamos que obtenemos este ID del sistema de autenticación

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.pedidosUsuario = this.pedidosService.obtenerPedidosPorUsuario(this.usuarioId);
  }
}

