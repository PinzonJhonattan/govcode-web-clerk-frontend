import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {NzImageService} from "ng-zorro-antd/image";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";

@Component({
  selector: 'app-input-file-viewer',
  templateUrl: './input-file-viewer.component.html',
  styleUrls: ['./input-file-viewer.component.scss']
})
export class InputFileViewerComponent implements OnInit {

  @Input() fieldControl !: FormControl;
  @Input() label: string = "";
  @Input() name: string = "";
  @Input() idInstance: string = "";

  currentId: string = "";
  statusDownloadDocument = 'init';
  idTask: string = ''

  constructor(private nzImageService: NzImageService, private activatedRoute: ActivatedRoute, private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.idTask = params.id;
    });
  }

  getDocument() {
    this.currentId = this.idInstance ? this.idInstance : window.location.href.split("/").pop() || "";
    const url = this.idInstance ? `Variables/variable-binary/radicate?radicate=${this.currentId}&variable_name=${this.name}` : `Task/binary/${this.currentId}/${this.name}`;
    this.statusDownloadDocument = 'loading';
    this.http.get(`${environment.apiUrl}/${url}`).subscribe({
      next: (data: any) => {
        this.statusDownloadDocument = 'success';
        const responseData = this.idInstance ? data : data?.file;
        const fileName = responseData?.filename;
        const contentFile = responseData?.contentFile;

        if (responseData?.filename.match(/\.[0-9a-z]+$/i)[0] === ".pdf") {
          const blob = this.getBlobFile(contentFile, fileName, 'application/pdf');
          const url = window.URL.createObjectURL(blob);

          let prntWin = window.open();

          prntWin.document.write(
            `<html><head><title>${fileName}</title></head><body style='margin:0'>` +
            `<embed width="100%" height="100%" src="${url}" type="application/pdf"></body></html>`
          );
          prntWin.document.close();
        } else if (/\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(fileName)) {
          this.nzImageService.preview(
            [
              {
                src: "data:image/jpeg;base64," + contentFile,
                alt: "ng-zorro",
                width: "auto",
                height: "auto",
              },
            ],
            {nzZoom: 1.5, nzRotate: 0}
          );
        } else {
          const blob = this.getBlobFile(contentFile, fileName);
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
        }
      },
      error: (error) => {
        this.statusDownloadDocument = 'error';
      },
    });
  }

  getBlobFile(base64String, fileName, type = null) {
    // Convert Base64 to a blob
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type});
  }

}
