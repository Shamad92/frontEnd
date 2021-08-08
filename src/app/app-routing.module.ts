import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { OverviewComponent } from './overview/overview.component'; 

const routes: Routes = [
  {
    path :'',
    component: DemoComponent
  },
  {
    path :'overview',
    component: OverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
