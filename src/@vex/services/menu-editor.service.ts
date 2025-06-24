import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MenuEditorModalComponent } from '../components/menu-editor/menu-editor-modal.component';
import { MenuService } from '../../app/core/services/menu.service';

@Injectable({
  providedIn: 'root'
})
export class MenuEditorService {

  constructor(
    private dialog: MatDialog,
    private menuService: MenuService
  ) { }

  openMenuEditor(): Observable<boolean> {
    return new Observable(observer => {
      this.menuService.getMenu().subscribe({
        next: (menuData) => {
          const dialogRef = this.dialog.open(MenuEditorModalComponent, {
            width: '90%',
            maxWidth: '1400px',
            data: { menuData }
          });

          dialogRef.afterClosed().subscribe(result => {
            observer.next(result);
            observer.complete();
          });
        },
        error: (error) => {
          console.error('Error fetching menu for editor', error);
          observer.error(error);
        }
      });
    });
  }
}
