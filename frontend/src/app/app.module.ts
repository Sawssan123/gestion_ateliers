import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { AteliersComponent } from './components/admin/ateliers/ateliers.component';
import { MesAtelierComponent } from './components/formateur/mes-atelier/mes-atelier.component';
import { AtelierFormComponent } from './components/admin/atelier-form/atelier-form.component';

@NgModule({
  declarations: [
    AppComponent,
    
    ConfirmationModalComponent,
    
    AteliersComponent,
    
    
    MesAtelierComponent,
    AtelierFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
