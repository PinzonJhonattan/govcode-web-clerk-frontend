const variableRegex = /\${(.*?)}/g;

export const replaceVariablesKeys  = (urlTemplate : string, variables : {[key  : string] : any}) => {
  return urlTemplate.replace(variableRegex, (_, match) => variables[match.trim()]);
}
