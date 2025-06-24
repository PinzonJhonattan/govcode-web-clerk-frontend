import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavItemComponent } from './sidenav-item.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { ComponentsModule } from '@shared/components/components.module';
import { ComplexTableModule } from '@shared/components/complex-table/complex-table.module';

@NgModule({
  declarations: [SidenavItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatRippleModule,
    ComponentsModule,
    ComplexTableModule
  ],
  exports: [SidenavItemComponent]
})
export class SidenavItemModule {
}
