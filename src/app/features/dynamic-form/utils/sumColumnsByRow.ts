import {ComponentForm} from "@features/dynamic-form/models/formStructure.model";

export const sumColumnsByRow = (components: any[]) : any => {
  return components.map(row => {
    return row.reduce((obj : any, component : ComponentForm) => {
      if(component.notCountAsInitialElement) return {totalColumns : obj.totalColumns, autoColumns : obj.autoColumns }
      const columns = component.layout?.columns  ;
      return {totalColumns : obj.totalColumns + (columns == null ? 0 : Number(columns)) , autoColumns : obj.autoColumns +  (columns == null ? 1 : 0) }
    }, {totalColumns : 0 , autoColumns : 0});
  });
};
