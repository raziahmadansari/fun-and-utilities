import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertJsonToExcelComponent } from './convert-json-to-excel/convert-json-to-excel.component';

const routes: Routes = [
  { path: 'export', component: ConvertJsonToExcelComponent },
  { path: '**', redirectTo: 'export' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsonToExcelRoutingModule { }
