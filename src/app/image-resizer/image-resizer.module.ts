import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageResizerAndCompresserComponent } from './image-resizer-and-compresser/image-resizer-and-compresser.component';
import { ImageResizerRoutingModule } from './image-resizer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ImageResizerAndCompresserComponent
  ],
  imports: [
    CommonModule,
    ImageResizerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ImageResizerModule { }
