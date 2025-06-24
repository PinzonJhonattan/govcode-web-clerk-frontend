// app.module.ts
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { VexModule } from "@vex/vex.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CustomLayoutModule } from "@shared/layouts/custom-layout/custom-layout.module";
import { SharedModule } from "@shared/shared.module";
import { TokenInterceptor } from "@core/interceptors/token.interceptor";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { CustomPaginator } from "@shared/custom/customPaginator";
import { RouterModule } from "@angular/router";
import { AuthorizationInterceptor } from "@core/interceptors/invalidToken.interceptor";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ReactiveFormsModule } from "@angular/forms";
import { appInitializers } from './app-initializers';
import { MenuEditorModule } from "@vex/components/menu-editor/menu-editor.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    // Vex
    VexModule,
    CustomLayoutModule,
    RouterModule.forRoot([]),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MenuEditorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginator
    },
    ...appInitializers,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
