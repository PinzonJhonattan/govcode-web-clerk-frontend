import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MarkdownViewerComponent implements OnInit {

  @Input() text : string | undefined = '';

  constructor() { }

  ngOnInit(): void {
  }

}
