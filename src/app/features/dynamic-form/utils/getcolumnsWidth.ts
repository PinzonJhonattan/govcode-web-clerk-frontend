import {sumColumnsByRow} from "@features/dynamic-form/utils/sumColumnsByRow";
import {ComponentForm} from "@features/dynamic-form/models/formStructure.model";

const MAX_COLUMNS = 16
export const getcolumnsWidth =  (form : any) => {
  const actualRowData = sumColumnsByRow(form)
  return form.map((row : any,index : number) => {
    return row.map((component : ComponentForm) => {
      if(component.layout.columns == null || !component.layout?.columns){
        return ((100/MAX_COLUMNS) * ((MAX_COLUMNS - actualRowData[index].totalColumns))) / actualRowData[index].autoColumns
      }
      return (100/MAX_COLUMNS) * Number(component.layout.columns)
    })
  });
}



