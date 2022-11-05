export class myExcelXML {
    private _sheetName!: string;
    private _styleID!: number;
    private _fileName!: string;

    Workbook: any;
    WorkbookStart: string;
    WorkbookEnd: string;

    fs: string;
    columnWidth: number;
    uri: any;
    link: any;

    constructor(o: string) {
        // this.WorkbookStart = '<?xml version="1.0"?><ss:Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">';
        this.WorkbookStart = '<?xml version="1.0"?><ss:Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="https://www.w3.org/TR/html40">';
        this.WorkbookEnd = '</ss:Workbook>';
        this.SheetName = 'SHEET 1';
        this.styleID = 1;
        this.columnWidth = 80;
        this.fileName = 'Output';

        let respArray = JSON.parse(o);
        let finalDataArray = [];

        for (let i = 0; i < respArray.length; i++) {
            finalDataArray.push(this.flatten(respArray[i]));
        }

        let s = JSON.stringify(finalDataArray);
        this.fs = s.replace(/&/gi, '&amp;');
    }

    downLoad() {
        const Worksheet = this.myXMLWorkSheet(this.SheetName, this.fs);

        this.WorkbookStart += this.myXMLStyles(this.styleID);

        this.Workbook = this.WorkbookStart + Worksheet + this.WorkbookEnd;

        console.log(this.Workbook);

        // Method-1 to dowload
        // this.uri = 'data:text/xls;charset=utf-8,' + encodeURIComponent(this.Workbook);
        // // this.uri = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' + encodeURIComponent(this.Workbook);
        // this.link = document.createElement("a");
        // this.link.href = this.uri;
        // this.link.style = "visibility:hidden";
        // this.link.download = this.fileName + ".xls";

        // document.body.appendChild(this.link);
        // this.link.click();
        // document.body.removeChild(this.link);

        
        // Method-2 to download using blob
        let link: HTMLAnchorElement = document.createElement('a');
        let blob = new Blob([this.Workbook], {type: 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        link.href = URL.createObjectURL(blob);
        link.download = 'Output.xls';
        link.click();
        URL.revokeObjectURL(link.href);
    }

    get fileName(): string {
        return this._fileName;
    }

    set fileName(name: string) {
        this._fileName = name;
    }

    get SheetName(): string {
        return this._sheetName;
    }

    set SheetName(name: string) {
        this._sheetName = name;
    }

    get styleID(): number {
        return this._styleID;
    }

    set styleID(id: number) {
        this._styleID = id;
    }

    myXMLStyles(id: any): string {
        let Styles = `<ss:Styles><ss:Style ss:ID="${id}"><ss:Font ss:Bold="1"/></ss:Style></ss:Styles>`;

        return Styles;
    }

    myXMLWorkSheet(name: string, data: string): string {
        const Table = this.myXMLTable(data);
        let WorksheetStart = '<ss:Worksheet ss:Name="' + name + '">';
        const WorksheetEnd = '</ss:Worksheet>';

        return WorksheetStart + Table + WorksheetEnd;
    }

    myXMLTable(data: string): string {
        let TableStart = '<ss:Table>';
        const TableEnd = '</ss:Table>';

        const tableData = JSON.parse(data);

        if (tableData.length > 0) {
            const columnHeader = Object.keys(tableData[0]);
            let rowData: string = '';
            for (let i = 0; i < columnHeader.length; i++) {
                TableStart += this.myXMLColumn(this.columnWidth);
            }

            for (let j = 0; j < tableData.length; j++) {
                rowData += this.myXMLRow(tableData[j], columnHeader);
            }

            TableStart += this.myXMLHead(1, columnHeader);
            TableStart += rowData;
        }

        return TableStart + TableEnd;
    }

    myXMLColumn(w: number): string {
        return `<ss:Column ss:AutoFitWidth="0" ss:Width="${w}"/>`;
    }


    myXMLHead(id: any, header: Array<string>): string {
        let HeadStart = `<ss:Row ss:StyleID="${id}">`;
        const HeadEnd = '</ss:Row>';

        for (let i = 0; i < header.length; i++) {
            const Cell = this.myXMLCell(header[i].toUpperCase());
            HeadStart += Cell;
        }

        return HeadStart + HeadEnd;
    }

    myXMLRow(r: any, h: any): string {
        let RowStart = '<ss:Row>';
        const RowEnd = '</ss:Row>';
        for (let i = 0; i < h.length; i++) {
            const Cell = this.myXMLCell(r[h[i]]);
            RowStart += Cell;
        }

        return RowStart + RowEnd;
    }

    myXMLCell(value: string): string {
        let CellStart = '<ss:Cell>';
        const CellEnd = '</ss:Cell>';

        const Data = this.myXMLData(value);
        CellStart += Data;

        return CellStart + CellEnd;
    }

    myXMLData(data: string) {
        let DataStart = '<ss:Data ss:Type="String">';
        const DataEnd = '</ss:Data>';

        return DataStart + data + DataEnd;
    }

    flatten(obj: any): any {
        let obj1 = JSON.parse(JSON.stringify(obj));
        const obj2 = JSON.parse(JSON.stringify(obj));
        if (typeof obj === 'object') {
            for (let k1 in obj2) {
                if (obj2.hasOwnProperty(k1)) {
                    if (typeof obj2[k1] === 'object' && obj2[k1] !== null) {
                        delete obj1[k1];
                        for (var k2 in obj2[k1]) {
                            if (obj2[k1].hasOwnProperty(k2)) {
                                obj1[k1 + '-' + k2] = obj2[k1][k2];
                            }
                        }
                    }
                }
            }

            let hasObject = false;
            for (let key in obj1) {
                if (obj1.hasOwnProperty(key)) {
                    if (typeof obj1[key] === 'object' && obj1[key] !== null) {
                        hasObject = true;
                    }
                }
            }

            if (hasObject) {
                return this.flatten(obj1);
            } else {
                return obj1;
            }
        } else {
            return obj1;
        }
    }
}