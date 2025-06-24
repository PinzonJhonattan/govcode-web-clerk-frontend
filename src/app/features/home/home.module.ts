import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {LayoutModule} from "@vex/layout/layout.module";
import {HomeRoutingModule} from "@features/home/home-routing.module";
import {PageLayoutModule} from "@vex/components/page-layout/page-layout.module";
import {SharedModule} from "@shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        LayoutModule,
        HomeRoutingModule,
        PageLayoutModule,
        SharedModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class HomeModule { }
