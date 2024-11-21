import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-user',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './editar-user.component.html',
  styleUrl: './editar-user.component.css'
})
export class EditarUserComponent implements OnInit {
  usuario = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  };
  usuarioActualEmail = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Cargar el email del usuario actual desde el localStorage
    const email = localStorage.getItem('usuarioActual');
    if (email) {
      this.usuarioActualEmail = email;

      // Cargar el perfil del usuario desde localStorage
      const usuarioData = localStorage.getItem(`perfil-${email}`);
      if (usuarioData) {
        this.usuario = JSON.parse(usuarioData);
      }
    } else {
      alert('No se encontró un usuario activo.');
      this.router.navigate(['/login']);
    }
  }

  guardarCambios(): void {
    if (this.usuarioActualEmail) {
      // Guardar los cambios en el perfil del usuario en localStorage
      localStorage.setItem(`perfil-${this.usuarioActualEmail}`, JSON.stringify(this.usuario));
      alert('Perfil actualizado correctamente.');
      this.router.navigate(['/user']); // Redirige al componente `user`
    } else {
      alert('No se pudo actualizar el perfil. Intenta de nuevo.');
    }
  }
  volver() {
    this.router.navigate(['/user']); // Redirige al componente Trabajador
  }
}