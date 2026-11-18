import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AteliersComponent } from './components/admin/ateliers/ateliers.component';
import { AtelierFormComponent } from './components/admin/atelier-form/atelier-form.component';
import { MesAtelierComponent } from './components/formateur/mes-atelier/mes-atelier.component';

const routes: Routes = [
  { path: 'admin/ateliers', component: AteliersComponent },

  { path: '', redirectTo: 'admin/ateliers', pathMatch: 'full' },
  { path: 'admin/ateliers/ajouter', component: AtelierFormComponent },
  { path: 'admin/ateliers/modifier/:id', component: AtelierFormComponent },

  { path: 'formateur/:id/mes-ateliers', component: MesAtelierComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}