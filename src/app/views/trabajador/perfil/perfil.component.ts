import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  trabajador = {
    nombre: '',
    profesion: '',
    edad: null,
    comentario: '',
    email: '',
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const usuarioActual = this.authService.obtenerUsuarioActual();
    if (usuarioActual) {
      // Cargar datos del perfil según el usuario actual
      const perfilGuardado = localStorage.getItem(`perfil-${usuarioActual.username}`);
      if (perfilGuardado) {
        this.trabajador = JSON.parse(perfilGuardado);
      } else {
        // Inicializar perfil vacío
        this.trabajador.email = usuarioActual.username;
      }
    } else {
      alert('No hay usuario autenticado');
    }
  }

  guardarCambios() {
    const usuarioActual = this.authService.obtenerUsuarioActual();
    if (usuarioActual) {
      // Guardar el perfil en localStorage usando la clave única del usuario
      localStorage.setItem(`perfil-${usuarioActual.username}`, JSON.stringify(this.trabajador));
      alert('Perfil actualizado correctamente');
    }
  }
}