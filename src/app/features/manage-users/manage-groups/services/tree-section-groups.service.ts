import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeSectionGroupsService {
  private signalSource = new Subject<void>();

  signalReloadTreeGroups$ = this.signalSource.asObservable();

  reloadTreeGroups() {
    this.signalSource.next();
  }
}
