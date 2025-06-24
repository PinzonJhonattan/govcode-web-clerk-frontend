
export const getValuesVariablesCamunda = (variablesForm : any) : any => {
  return Object.keys(variablesForm).reduce((result : any, key) => {
    result[key] = variablesForm[key].value;
    return result;
  }, {});
}
