import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { IHttpPostMessageResponse } from "http-post-message";
import {
  IReportEmbedConfiguration,
  models,
  Page,
  Report,
  service,
  VisualDescriptor
} from "powerbi-client";
import { PowerBIReportEmbedComponent } from "powerbi-client-angular";
import "powerbi-report-authoring";
import {
  errorClass,
  errorElement,
  hidden,
  position,
  reportUrl,
  successClass,
  successElement
} from "./constants";
import { HttpService } from "./services/http.service";

export interface ConfigResponse {
  Id: string;
  EmbedUrl: string;
  EmbedToken: {
    Token: string;
  };
}
@Component({
  selector: 'app-report-power-bi',
  templateUrl: './report-power-bi.component.html',
  styleUrls: ['./report-power-bi.component.scss']
})
export class ReportPowerBiComponent implements OnInit {

  // Wrapper object to access report properties
  @ViewChild(PowerBIReportEmbedComponent)
  reportObj!: PowerBIReportEmbedComponent;

  isEmbedded = false;

  displayMessage =
    "The report is bootstrapped. Click Embed Report button to set the access token.";

  reportClass = "report-container hidden";

  phasedEmbeddingFlag = false;

  reportConfig: IReportEmbedConfiguration = {
    type: "report",
    embedUrl: undefined,
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    settings: undefined
  };

  eventHandlersMap = new Map<
    string,
    (event?: service.ICustomEvent<any>) => void
  >([
    ["loaded", () => console.log("Report has loaded")],
    [
      "rendered",
      () => {
        console.log("Report has rendered");

        // Set displayMessage to empty when rendered for the first time
        if (!this.isEmbedded) {
          this.displayMessage =
            "Use the buttons above to interact with the report using Power BI Client APIs.";
        }

        // Update embed status
        this.isEmbedded = true;
      }
    ],
    [
      "error",
      (event?: service.ICustomEvent<any>) => {
        if (event) {
          console.error(event.detail);
        }
      }
    ],
    ["visualClicked", () => console.log("visual clicked")],
    ["pageChanged", (event) => console.log(event)]
  ]);
  constructor(
    public httpService: HttpService,
    private element: ElementRef<HTMLDivElement>
  ) {}


  async ngOnInit() {
    let reportConfigResponse: ConfigResponse;

    // Get the embed config from the service and set the reportConfigResponse
    try {
      reportConfigResponse = await this.httpService
        .getEmbedConfig(reportUrl).toPromise()
    } catch (error) {
      // Prepare status message for Embed failure
      this.displayMessage = `Failed to fetch config for report. Status: ${error.statusText} Status Code: ${error.status}`;
      console.error(this.displayMessage);
      return;
    }

    // Update the reportConfig to embed the PowerBI report
    this.reportConfig = {
      ...this.reportConfig,
      id: reportConfigResponse.Id,
      embedUrl: reportConfigResponse.EmbedUrl,
      accessToken: reportConfigResponse.EmbedToken.Token
    };

    // Get the reference of the report-container div
    const reportDiv = this.element.nativeElement.querySelector(
      ".report-container"
    );
    if (reportDiv) {
      // When Embed report is clicked, show the report container div
      reportDiv.classList.remove(hidden);
    }
  }

}
