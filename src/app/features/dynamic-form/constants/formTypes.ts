import {LinealFormComponent} from "@features/dynamic-form/components/forms/lineal-form/lineal-form.component";
import {TabsFormComponent} from "@features/dynamic-form/components/forms/tabs-form/tabs-form.component";

export const formTypes : {[key : string] : any} = {
  lineal : LinealFormComponent,
  tabs : TabsFormComponent
}
