import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomQuoteComponent } from './random-quote/random-quote.component';

const routes: Routes = [
  { path: 'home', component: RandomQuoteComponent },
  { path: 'image-resizer', loadChildren: () => import('./image-resizer/image-resizer.module').then(m => m.ImageResizerModule) },
  { path: 'json-to-excel', loadChildren: () => import('./json-to-excel/json-to-excel.module').then(m => m.JsonToExcelModule) },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
