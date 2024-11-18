import { Injectable } from '@angular/core';

// Interfaz Usuario para definir la estructura de los datos del usuario
interface Usuario {
  username: string;
  password: string;
  role: string; // Tipo de usuario (ejemplo: usuario o trabajador)
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarios: Usuario[] = []; // Declara la propiedad usuarios
  private usuariosKey = 'usuarios'; // Clave para guardar usuarios en localStorage
  private usuarioActualKey = 'usuarioActual'; // Clave para guardar al usuario actual

  constructor() {
    // Inicializa `usuarios` desde localStorage si existe
    const usuariosGuardados = localStorage.getItem(this.usuariosKey);
    this.usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
  }

  registrarUsuario(username: string, password: string, role: string): boolean {
    const usuarioExistente = this.usuarios.find((user) => user.username === username);
    if (usuarioExistente) {
      return false; // El usuario ya existe
    }

    const nuevoUsuario: Usuario = { username, password, role };
    this.usuarios.push(nuevoUsuario);

    // Guardar en localStorage
    localStorage.setItem(this.usuariosKey, JSON.stringify(this.usuarios));
    return true; // Registro exitoso
  }

  autenticarUsuario(username: string, password: string): Usuario | null {
    const usuario = this.usuarios.find(
      (user) => user.username === username && user.password === password
    );
    if (usuario) {
      // Guardar al usuario actual en localStorage
      localStorage.setItem(this.usuarioActualKey, JSON.stringify(usuario));
      return usuario;
    }
    return null; // Usuario no encontrado
  }

  obtenerUsuarioActual(): Usuario | null {
    const usuarioActual = localStorage.getItem(this.usuarioActualKey);
    return usuarioActual ? JSON.parse(usuarioActual) : null;
  }

  cerrarSesion(): void {
    // Eliminar al usuario actual de localStorage
    localStorage.removeItem(this.usuarioActualKey);
  }

  // Método opcional para obtener todos los usuarios (útil para debugging o administración)
  obtenerUsuarios(): Usuario[] {
    return this.usuarios;
  }
}
  