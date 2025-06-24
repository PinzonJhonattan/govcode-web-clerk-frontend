import {
  AfterViewInit,
  Component, ElementRef,
  Input, OnChanges,
  OnInit, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {FormControl} from "@angular/forms";
// import * as customBuildEditor from '../../../customBuildCkEditor/build/ckeditor' ;

@Component({
  selector: 'app-ck-editor',
  templateUrl: './ck-editor.component.html',
  styleUrls: ['./ck-editor.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class CkEditorComponent {
  @Input() fieldControl!: FormControl;
  @Input() value: string = "";
  @Input() name: string = '';

  idEditor: string = '';
  // public Editor: any = customBuildEditor;
  editorInstance : any;

  constructor(private el : ElementRef) {

  }
//  ngOnInit() {
//    this.idEditor = `document-container-${this.name}`
//  }

//  ngOnChanges(changes: SimpleChanges) {
//     if(changes.value){
//       this.editorInstance?.setData(this.value)
//     }
//  }

//   ngAfterViewInit() {
//     const containerEditor = this.el.nativeElement.querySelector(`#${this.idEditor}`);
//     if(!containerEditor) return
//     this.Editor
//       .create(containerEditor.querySelector('.document-editor__editable'), {
//         initialData : this.value || ''
//       })
//       .then(editor => {
//         const toolbarContainer = containerEditor.querySelector('.document-editor__toolbar');

//         toolbarContainer.appendChild(editor.ui.view.toolbar.element);
//         //@ts-ignore
//         this.editorInstance = editor
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   }
}
