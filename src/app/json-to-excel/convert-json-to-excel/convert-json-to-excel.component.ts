import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Workbook } from 'exceljs';
// import { myExcelXML } from './models/excel.model';

@Component({
  selector: 'app-convert-json-to-excel',
  templateUrl: './convert-json-to-excel.component.html',
  styleUrls: ['./convert-json-to-excel.component.scss']
})
export class ConvertJsonToExcelComponent implements OnInit {
  data!: Array<any>;
  filename: string = 'Output';
  isExcelGenerationInProgress: boolean = false;
  @ViewChild('inputText') inputText!: ElementRef<HTMLInputElement>;
  @ViewChild('inputFileName') inputFileName!: ElementRef<HTMLInputElement>;

  constructor() {
  }

  ngOnInit(): void {
  }

  downloadExcel(): void {
    // let excel = new myExcelXML(this.data);
    // excel.downLoad();

    this.isExcelGenerationInProgress = true;
    this.filename = this.inputFileName.nativeElement.value || 'Output';

    setTimeout(() => {
      this.generateExcel();
    }, 300);
  }

  generateExcel(): void {
    try {
      this.data = JSON.parse(this.inputText.nativeElement.value);
    } catch(err) {
      console.error(err);
      window.alert('SyntaxError: Unexpected end of JSON input');
      this.isExcelGenerationInProgress = false;
      return;
    }

    if (this.data.length <= 0) {
      window.alert('Insert valid JSON data to convert.');
      return;
    }

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1', {
      properties: { tabColor: { argb: 'FFC0000' }},
      views:[{ state: 'frozen', xSplit: 1, ySplit: 1 }],
      // headerFooter: { firstHeader: "", firstFooter: "Hello World" }
    });

    const columnHeaders = Object.keys(this.data[0]);
    worksheet.addRow(columnHeaders);

    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        cell.font = { name: 'Arial', family: 2, bold: true, size: 12,
          // color: { argb: 'FFFF0000' }
        };
      });
    });

    for (let row of this.data) {
      const rowData = [];
      for (let header of columnHeaders) {
        rowData.push(row[header]);
      }

      worksheet.addRow(rowData);
    }

    workbook
      .xlsx
      .writeBuffer()
      .then(data => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        let link: HTMLAnchorElement = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${this.filename}.xlsx`;
        link.click();
        URL.revokeObjectURL(link.href);
      })
      .catch(err => console.error(err))
      .finally(() => setTimeout(() => {
        this.isExcelGenerationInProgress = false;
      }, 1000));
  }

}

