import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertJsonToExcelComponent } from './convert-json-to-excel/convert-json-to-excel.component';
import { JsonToExcelRoutingModule } from './json-to-excel-routing.module';



@NgModule({
  declarations: [
    ConvertJsonToExcelComponent
  ],
  imports: [
    CommonModule,
    JsonToExcelRoutingModule
  ]
})
export class JsonToExcelModule { }
