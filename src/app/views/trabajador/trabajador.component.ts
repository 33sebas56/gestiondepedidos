import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent implements OnInit {
  trabajador = {
    nombre: '',
    profesion: '',
    edad: null,
    comentario: '',
    email: '',
  };
  usuarioActualEmail = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Cargar el email del usuario actual
    const email = localStorage.getItem('usuarioActual');
    if (email) {
      this.usuarioActualEmail = email;

      // Cargar el perfil del usuario desde localStorage
      const usuarioData = localStorage.getItem(`perfil-${email}`);
      if (usuarioData) {
        this.trabajador = JSON.parse(usuarioData);
      }
    } else {
      alert('No se encontró un usuario activo.');
      this.router.navigate(['/login']);
    }
  }

  irAEditarPerfil() {
    this.router.navigate(['/editar-perfil']);
  }

  irAGestionarMenu() {
    this.router.navigate(['/menu']);
  }

  irAListarPedidos() {
    this.router.navigate(['/listadoPedidos']);
  }
}