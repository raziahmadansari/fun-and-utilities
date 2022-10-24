import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageResizerAndCompresserComponent } from './image-resizer-and-compresser/image-resizer-and-compresser.component';

const routes: Routes = [
  { path: 'resize', component: ImageResizerAndCompresserComponent },
  { path: '**', redirectTo: 'resize' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageResizerRoutingModule { }
