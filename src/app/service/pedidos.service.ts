import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private historialPedidos: { [usuario: string]: Pedido[] } = {}; // Historial por usuario
  private listaPedidos: Pedido[] = []; // Lista global de pedidos
  private platillos: Platillo[] = []; // Lista de platillos del menú
  private pedidosKey = 'pedidos'; // Clave para almacenar pedidos en localStorage

  // Cargar platillos al menú desde el componente MenuComponent
  cargarPlatillos(platillos: Platillo[]): void {
    this.platillos = platillos;
  }

  // Obtener los platillos filtrados por categoría
  filtrarPorCategoria(categoria: string): Platillo[] {
    if (categoria === 'Todas') return this.platillos;
    return this.platillos.filter((platillo) => platillo.categoria === categoria);
  }

  // Agregar pedido al historial (por usuario)
  agregarPedido(nombre: string, descripcion: string, precio: number, usuarioId?: string): void {
    const nuevoPedido = { nombre, descripcion, precio, usuarioId };
    const pedidosGuardados = localStorage.getItem(this.pedidosKey);
    const pedidos = pedidosGuardados ? JSON.parse(pedidosGuardados) : [];
    pedidos.push(nuevoPedido);
    localStorage.setItem(this.pedidosKey, JSON.stringify(pedidos));
  }

  // Obtener el historial de un usuario específico
  obtenerHistorialUsuario(usuario: string): Pedido[] {
    return this.historialPedidos[usuario] || [];
  }

  // Obtener la lista global de pedidos
  obtenerListaGlobalPedidos(): Pedido[] {
    return this.listaPedidos;
  }
  obtenerTodosLosPedidos(): { nombre: string; descripcion: string; precio: number; usuarioId?: string }[] {
    const pedidosGuardados = localStorage.getItem(this.pedidosKey);
    return pedidosGuardados ? JSON.parse(pedidosGuardados) : [];
  }

  // Obtener pedidos filtrados por usuario
  obtenerPedidosPorUsuario(usuarioId: string): { nombre: string; descripcion: string; precio: number; usuarioId?: string }[] {
    const pedidos = this.obtenerTodosLosPedidos();
    return pedidos.filter((pedido) => pedido.usuarioId === usuarioId);
  }

  // Limpia los pedidos en caso de ser necesario (para pruebas o reinicios)
  limpiarPedidos(): void {
    localStorage.removeItem(this.pedidosKey);
  }
}

// Interfaces
export interface Platillo {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
  estado: boolean;
}

export interface Pedido {
  numeroFactura: number;
  productos: { nombre: string; cantidad: number; precio: number }[];
  total: number;
  fecha: Date;
}