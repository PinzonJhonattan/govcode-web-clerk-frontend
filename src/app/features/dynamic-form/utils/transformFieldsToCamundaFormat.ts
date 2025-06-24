import {typesAsociateCamunda} from "@features/dynamic-form/constants/typesAssociateCamunda";

export const transformFieldsToCamundaFormat = (rawData: any, form: any) => {
  let variables : {[key : string] : any } = {};
  const formFields = rawData.reduce((a : any, v : any) => ({...a, [v?.key || v?.properties?.key]: v}), {});
  Object.keys(form.value).map(field => {
    let fieldType = formFields[field]?.properties?.type;
    let fieldInfo = formFields[field];

    if(!fieldType){
      fieldType = form.value[field]?.typeComponent || 'text';
    }
    let variableType = typesAsociateCamunda(fieldType)
    let variable = getVariableField(form.value, variableType, field, fieldInfo);
    

    if(form.value[field]){
      variables[field] = variable;
    }
  })

  return variables;
}


const getVariableField = (form : any, variableType : any, field : any, fieldInfo : any) => {
  switch (variableType) {
    case 'File':
      return {
        type: variableType,
        value: fieldInfo?.properties?.type != 'viewerFile' ? form[field]?.value : null,
        valueInfo: {
          encoding: 'UTF-8',
          filename: form[field]?.name,
          mimetype: "application/octet-stream",
          approveAppendToProceeding: fieldInfo?.properties?.approveAppendToProceeding == "true" ? true : false
        }
      }
    case 'Json' : {
      return {
        type : 'Json',
        value : JSON.stringify(form[field]),
        valueInfo: null
      }
    }
    case 'Boolean':
      return {
        type: variableType,
        value: form[field],
        valueInfo: null
      }
    default :
      return {
        type: variableType,
        value: form[field],
        valueInfo: null
      }
  }
}
