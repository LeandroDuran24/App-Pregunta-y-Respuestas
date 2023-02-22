import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarPasswordComponent } from './components/dashboard/cambiar-password/cambiar-password.component';
import { CuestionariosComponent } from './components/dashboard/cuestionarios/cuestionarios.component';
import { NuevoCuestionarioComponent } from './components/dashboard/cuestionarios/nuevo-cuestionario/nuevo-cuestionario.component';
import { PasoDosComponent } from './components/dashboard/cuestionarios/nuevo-cuestionario/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './components/dashboard/cuestionarios/nuevo-cuestionario/paso-uno/paso-uno.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegisterComponent } from './components/inicio/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'inicio', component: InicioComponent, children:
      [{ path: '', component: BienvenidaComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },]
  },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', component: CuestionariosComponent },
      { path: 'cambiarPassword', component: CambiarPasswordComponent },
      {
        path: 'nuevoCuestionario', component: NuevoCuestionarioComponent, children: [
          { path: 'pasoUno', component: PasoUnoComponent },
          { path: 'pasoDos', component: PasoDosComponent }

        ]
      }

    ]
  },
  { path: '**', redirectTo: '/bienvenidos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
