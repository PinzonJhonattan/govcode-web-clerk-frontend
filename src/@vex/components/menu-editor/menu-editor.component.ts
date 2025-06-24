import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuEditorService } from '@vex/services/menu-editor.service';

@Component({
  selector: 'app-menu-editor',
  template: '<div></div>'
})
export class MenuEditorComponent implements OnInit {

  constructor(
    private menuEditorService: MenuEditorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.menuEditorService.openMenuEditor().subscribe(result => {
      this.router.navigate(['/']);
    });
  }
}
