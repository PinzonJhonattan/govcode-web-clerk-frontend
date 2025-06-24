import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {GeneralGroupInfo} from "@features/manage-users/manage-groups/services/GeneralGroupInfo";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";
import {columnsMoveGroups} from "@features/manage-users/manage-groups/constants/columns-move-groups";
import {columnsSubgroupGroup} from "@features/manage-users/manage-groups/constants/columns-subgroups-group";
import {ComplexTableModule} from "@shared/components/complex-table/complex-table.module";
import {MatButtonModule} from "@angular/material/button";
import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import Swal from "sweetalert2";
import {statusOperation} from "@shared/models/status.model";

interface DialogMoveGroupData {
  infoGroupToMove : GroupItem
}


@Component({
  selector: 'app-move-groups',
  templateUrl: './move-groups.component.html',
  styleUrls: ['./move-groups.component.scss'],
  standalone : true,
  imports: [ComplexTableModule, MatDialogModule, MatButtonModule, CommonModule, MatIconModule]
})
export class MoveGroupsComponent implements OnInit {

  columnsMoveGroups : any[] = columnsMoveGroups
  dataTableMoveGroups: any[] = [];
  stateLoadMoveGroups: statusOperation = 'init';
  stateMoveGroup : statusOperation = 'init'
  actualGroupsOpen : GroupItem[] = [];
  actualSelectedGroup : GroupItem = null;
  messageError : string = '';

  constructor(public generalGroupInfo :  GeneralGroupInfo, private changeDetector :  ChangeDetectorRef,     public dialogRef: MatDialogRef<MoveGroupsComponent>,
              @Inject(DIALOG_DATA) public groupToMoveData: DialogMoveGroupData , private manageGroupsService : ManageGroupsClerkService) { }

  ngOnInit(): void {
    this.loadMoveGroups()
  }

  loadMoveGroups(){
    this.stateLoadMoveGroups = 'loading'
    this.manageGroupsService.getRootGroups().subscribe({
      next : (data) => {
        this.stateLoadMoveGroups = 'success'
        this.dataTableMoveGroups = data;
      },
      error : () => {
        this.stateLoadMoveGroups = 'error'
      }
    })

  }

  changeToRootGroup(){
    this.actualGroupsOpen = [];
    this.actualSelectedGroup = null;
    this.loadMoveGroups();
  }

  changeToIntermediateGroup(actualGroup : GroupItem, indexGroup : number){
    this.actualGroupsOpen = this.actualGroupsOpen.slice(0, indexGroup + 1);
    this.actualSelectedGroup = this.actualGroupsOpen[this.actualGroupsOpen.length - 1];
    this.loadChildrenGroup(actualGroup);
  }

  changeActualGroup(infoGroup : GroupItem){
    this.actualGroupsOpen.push(infoGroup)
    this.actualSelectedGroup = infoGroup;
    this.loadChildrenGroup(infoGroup);

  }

  loadChildrenGroup(infoGroup : GroupItem){
    this.stateLoadMoveGroups = 'loading'
    this.manageGroupsService.getChildrenGroups(infoGroup.id).subscribe({
      next : (data) => {
        this.stateLoadMoveGroups = 'success'
        this.dataTableMoveGroups = data;
      },
      error : () => {
        this.stateLoadMoveGroups = 'error'
      }
    })
  }

  handleMoveGroups(){
    this.manageGroupsService.moveGroup({
     name : this.groupToMoveData.infoGroupToMove.name,
      id : this.groupToMoveData.infoGroupToMove.id
    }, this.actualSelectedGroup?.id ).subscribe({
      next : () => {
        this.dialogRef.close({
          groupMoved : true
        })
        Swal.fire({
          position: "bottom-end",
          html: `<p>Grupo movido exitosamente</p>`,
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      },
      error : (error) => {
        this.stateMoveGroup = 'error'
        this.messageError = 'Error: ' + error?.error?.message || 'Ha ocurrido un error al editar el group intente de nuevo'
        Swal.fire({
          position: "bottom-end",
          html: `<p>${this.messageError}</p>`,
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      }
    })
  }



  protected readonly columnsSubgroupsGroup = columnsSubgroupGroup;
}
