import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperherosComponent } from './components/superheros/superheros.component';

const routes: Routes = [
  {path: 'superheros', component: SuperherosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
