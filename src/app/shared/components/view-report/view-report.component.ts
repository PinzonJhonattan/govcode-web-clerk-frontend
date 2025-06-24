import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ReportsService } from './reports.service';
import { DomSanitizer } from '@angular/platform-browser';
import moment from "moment/moment";

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css'],
})
export class ViewReportComponent implements OnInit {
  //Se guarda el PDF
  htmlReportPdf: any;
  extension: "pdf" | "html";

  @Input() extensionToShow: "pdf" | "html" = "pdf";
  @Input() urlReport: string;
  @Input() parameters: any;
  @Input() showFile: boolean = true;

  public showReport: boolean = false;

  constructor(
    private reportService: ReportsService,
  ) { }

  ngOnInit() {
    //this.generalLoadingService.show();
    const parameters = this.getParams();
    this.showReport = true;
    if(this.showFile) {
      this.reportService
        .getReport({
          extension: this.extensionToShow,
          urlReport: this.urlReport,
          parameters: parameters,
        })
        .subscribe({
          next: async (resp) => {
            this.htmlReportPdf = await this.blobToBase64(resp);
          },
          error: (err) => {
            console.log("Error en view-report: ", err)
          },
        });
    }
  }

  blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  getParams() {
    let paramsString = Object.keys(this.parameters)
      .map((key: any) => {
        if (this.parameters[key] != null) {
          if (moment.isMoment(this.parameters[key])) {
            return `${key}=${this.parameters[key].format('YYYY-MM-DD')}`;
          }
          if (typeof this.parameters[key] === 'string') {
            return `${key}=${encodeURIComponent(this.parameters[key])}`;
          } else {
            return this.arrayToQueryString(this.parameters, key);
          }
        }
      }).filter(param => param);
    return paramsString.join('&');

  }

  arrayToQueryString(params, key: string) {
    return (params?.[key] as any[] || [])
      .map((p) => {
        return `${key}=${p}`;
      })
      .join('&');
  }


  hideReport() {
    this.showReport = false;
  }

  download(extension: string) {
    //this.generalLoadingService.show();
    const parameters = this.getParams();
    this.reportService
      .getReport({
        extension: extension,
        urlReport: this.urlReport,
        parameters: parameters,
      })
      .subscribe({
        next: async (resp) => {
          //this.generalLoadingService.close();
          this.downloadFile(resp, extension);
        },
        error: (err) => {
          throw new Error(err);
          //this.generalLoadingService.close();
        },
      });
  }

  downloadFile(data: Blob, extension: string) {
    let fileUrl = window.URL.createObjectURL(data);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = fileUrl;
    a.download = "Reporte." + extension;
    a.click();
    document.body.removeChild(a);
  }
}
