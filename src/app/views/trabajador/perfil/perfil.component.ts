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
  usuarioActualEmail = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Cargar el email del usuario actual desde AuthService
    const usuarioActual = this.authService.obtenerUsuarioActual();
    if (usuarioActual) {
      this.usuarioActualEmail = usuarioActual.username;

      // Intentar cargar los datos actuales del perfil
      const usuarioData = localStorage.getItem(`perfil-${this.usuarioActualEmail}`);
      if (usuarioData) {
        this.trabajador = JSON.parse(usuarioData);
      }
    } else {
      alert('No se encontró un usuario activo.');
      this.router.navigate(['/login']);
    }
  }

  guardarCambios() {
    if (this.usuarioActualEmail) {
      // Guardar los cambios del perfil en localStorage
      localStorage.setItem(`perfil-${this.usuarioActualEmail}`, JSON.stringify(this.trabajador));
      alert('Cambios guardados correctamente.');
      this.router.navigate(['/trabajador']); // Redirigir al componente Trabajador
    } else {
      alert('No se pudo guardar el perfil. Intenta nuevamente.');
    }
  }

  volver() {
    this.router.navigate(['/trabajador']); // Redirige al componente Trabajador
  }
  
}