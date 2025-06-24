import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";

@Injectable({
  providedIn: 'root'
})
export class ManageBreadcrumbGroupItemSection {

  private actualGroupsSubject = new BehaviorSubject<GroupItem[]>([]);
  actualGroups$ = this.actualGroupsSubject.asObservable();

  constructor(
  ) { }

  setActualGroups(actualGroups: GroupItem[]): void {
    this.actualGroupsSubject.next(actualGroups)
  }

  resetActualGroups(){
    this.actualGroupsSubject.next([])
  }

  getActualGroups(){
    return this.actualGroupsSubject.getValue();
  }

  appendGroup(groupItem: GroupItem): void {
    this.actualGroupsSubject.next([...this.actualGroupsSubject.value, groupItem]);
  }
}
