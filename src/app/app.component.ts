import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'identityCard';
  data = new Array();

  constructor() {}

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(this.data);

      document.getElementById('name').textContent = this.data[0][0];
      document.getElementById('sId').textContent = this.data[0][1];
      document.getElementById('address').textContent = this.data[0][2];
      document.getElementById('DOB').textContent = this.data[0][3];
      document.getElementById('validity').textContent = this.data[0][4];
    };
    reader.readAsBinaryString(target.files[0]);
  }

  exports() {
    let j = 0;

    function a(data) {
      if (j < data.length) {
        setTimeout(() => {
          console.log(data[j][0]);
          document.getElementById('name').textContent = data[j][0];
          document.getElementById('sId').textContent = data[j][1];
          document.getElementById('address').textContent = data[j][2];
          document.getElementById('DOB').textContent = data[j][3];
          document.getElementById('validity').textContent = data[j][4];
          document.getElementById('clickMe').click();
          j++;
          a(data);
        }, 500);
      }
    }
    a(this.data);
  }
}
