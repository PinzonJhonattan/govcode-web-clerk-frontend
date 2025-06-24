import { Component, OnInit } from '@angular/core';
import {
  DynamicElementBaseComponent
} from "@features/dynamic-form/components/base/dynamic-element-base/dynamic-element-base.component";

@Component({
  selector: 'app-markdown-viewer-block',
  templateUrl: './markdown-viewer-block.component.html',
  styleUrls: ['./markdown-viewer-block.component.scss']
})
export class MarkdownViewerBlockComponent  extends DynamicElementBaseComponent implements OnInit {

  text : string = '';
  dynamicProps : any;

  constructor() {
    super()
  }
   override ngOnInit() {
    super.ngOnInit()
     if(this.component.properties?.readVariable){
       if(this.component?.properties?.groupSection){
         this.text = this.component?.properties?.groupSection?.value[this.component.properties?.readVariable] || ''
       }else{
         this.text = this.valuesForm[this.component.properties?.readVariable]?.value || ''
       }
     }else{
       this.text = this.component.text || ''
     }
     this.dynamicProps = {
       text : this.text
     }
  }
}
