import { Component, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { ListPendingProcessService } from "./services/list-pending-process.service";
import { format } from "date-fns";
import { columnsPendingProcess } from "./constants/columns-pending-process";
import { getFinalStringRoleNames } from "@vex/utils/get-final-string-role-names";
import { MatDialog } from "@angular/material/dialog";
import { ModalDetailsComponent } from "./modal-details/modal-details.component";
import { tr } from "date-fns/locale";
@Component({
  selector: "app-list-procedures",
  templateUrl: "./list-procedures.component.html",
  styleUrls: ["./list-procedures.component.scss"],
})
export class ListProceduresComponent implements OnInit {
  layoutCtrl = new UntypedFormControl("fullwidth");
  columns: any[] = columnsPendingProcess;
  dataTableProcedures: any[] = [];
  state: string = 'idle'

  constructor(
    private taskPendingService: ListPendingProcessService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
   this.getTasksPending()
  }

  getTasksPending() {
    this.state = 'loading'
    this.taskPendingService.getList().subscribe({
      next: (data: any) => {
        this.state = 'success'
        data = data.map((process) => {
          // process date to a readable format
          const formatDate = format(
            new Date(process.created),
            "dd/MM/yyyy hh:mm:ss a"
          );
          const radicationDate = format(
            new Date(process.expired),
            "dd/MM/yyyy hh:mm:ss a"
          );
          return {
            ...process,
            assigneeRol : process.assigneeRole,
            linkButtonReview: `/form/${process.id}`,
            created: formatDate,
            expired: radicationDate,
            assignee: process.assignee || 'Sin Asignar',
            daysToExpire: String(process.daysToExpire),
            daysToExpireColor: process.daysToExpireColor,
            processDefinitionId: process.processDefinitionId.split(":")[0]
          };
        });
        this.dataTableProcedures = data;
      },
      error: () => {
        this.state = 'error'
      },
    });
  }

  openDetailsTask(data: any) {
      this.dialog.open(ModalDetailsComponent, {
        data,
        width: "600px",
      });
  }



}
