import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './pages/create/create.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  { path: 'Home',title:'AW | Home' , component : HomeComponent },
  { path: 'Create' ,title:'AW | Add New Record' , component : CreateComponent },
  { path: 'Details/:id',title:'AW | Details' , component : DetailsComponent },
  { path: '', title: 'AW | Home', redirectTo: 'Home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
