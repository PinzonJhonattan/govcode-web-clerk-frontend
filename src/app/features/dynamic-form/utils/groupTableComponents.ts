export const groupTableComponents = (components : any[]) : any[] => {
  let finalComponents : any[] = [];
  let actualTableCount = 0;
  let numColumsnActualTable = 0;
  let actualTableComponent = null;

  for (let [index, component] of components.entries()) {
    if(component.properties?.type === 'dynamicTable'){
      let columns = component.properties?.columns?.split(',');
      numColumsnActualTable = columns.length;
      actualTableComponent = {
        ...component,
        properties : {
          ...component?.properties,
          columns : columns,
          rows : []
        }
      }
    }else{
      if(actualTableComponent && actualTableCount < numColumsnActualTable){
        if(actualTableCount === numColumsnActualTable - 1){
          actualTableComponent.properties?.rows?.push(component);
          actualTableComponent.properties.resultComponent = components[index + 1]?.properties?.type === 'resultTable' ? components[index + 1] : null
          finalComponents.push(actualTableComponent)
          actualTableCount = 0
          actualTableComponent = null
        }
        else{
          actualTableCount += 1
          actualTableComponent.properties?.rows?.push(component);
        }
      }
      else{
          if(component?.properties?.type !== 'resultTable'){
            finalComponents.push(component)
          }
      }
    }
  }
  return finalComponents
}
