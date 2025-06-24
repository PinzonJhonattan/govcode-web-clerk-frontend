import { v4 as uuidv4 } from "uuid";

export const separateColumnsByTabs = (fieldsForm : any[] = [], classColumns : any[][] ) => {
  let actualTab = ''
  let tabsInfo : any = [];
  let tabsStructure : {[key : string] : any} = {};
  fieldsForm.forEach((row, rowIndex) => {
    let actualRow : any[] = [];
    row.forEach((column : any, columnIndex : number) => {
      if (column.properties?.type !== 'tab') {
        actualRow.push({ ...column, layout: { numColumns: classColumns[rowIndex][columnIndex] } });
      } else {
        const idTab = uuidv4();
        tabsStructure[idTab] = [];
        actualTab = idTab;
        tabsInfo.push({id : idTab, label : column.text})
      }
    });
    if (actualRow.length !== 0 && actualTab) {
      tabsStructure[actualTab].push(actualRow);
    }
  });
  return [tabsInfo, tabsStructure]
}
