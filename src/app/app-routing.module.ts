import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'image-resizer', loadChildren: () => import('./image-resizer/image-resizer.module').then(m => m.ImageResizerModule) },
  { path: '**', redirectTo: 'image-resizer' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
