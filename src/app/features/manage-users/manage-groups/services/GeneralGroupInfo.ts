import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";

@Injectable({
  providedIn: 'root'
})
export class GeneralGroupInfo {

  private actualGroupSubject = new BehaviorSubject<GroupItem>(null);
  actualGroup$ = this.actualGroupSubject.asObservable();

  constructor(
  ) { }

  setActualGroup(actualGroup: GroupItem): void {
    if(this.getActualGroup()?.name != actualGroup.name) {
      this.actualGroupSubject.next(actualGroup);
    }
  }

  resetActualGroup(){
    this.actualGroupSubject.next(null)
  }

  getActualGroup(){
    return this.actualGroupSubject.getValue();
  }
}
