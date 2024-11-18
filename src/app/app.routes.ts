import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegistroComponent } from './views/registro/registro.component';
import { PedidosComponent } from './views/pedidos/pedidos.component';
import { TrabajadorComponent } from './views/trabajador/trabajador.component';
import { UserComponent } from './views/user/user.component';
import { Routes } from '@angular/router';
import { HistorialPedidosComponent } from './views/historial-pedidos/historial-pedidos.component';
import { ListadoPedidosComponent } from './views/listado-pedidos/listado-pedidos.component';
import { MenuComponent } from './views/menu/menu.component';
import { PerfilComponent } from './views/trabajador/perfil/perfil.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'trabajador', component: TrabajadorComponent },
  { path: 'listadoPedidos', component: ListadoPedidosComponent},
  { path: 'historialPedidos', component: HistorialPedidosComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'user', component: UserComponent},
  { path: "editar-perfil", component: PerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}