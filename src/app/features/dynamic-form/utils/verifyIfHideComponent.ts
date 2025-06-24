import {ComponentForm} from "@features/dynamic-form/models/formStructure.model";
import {FormGroup} from "@angular/forms";
import {combineFormValues} from "@features/dynamic-form/utils/transformFormVariables";

export const isHideComponent = (form: FormGroup, component: ComponentForm, valuesForm : any): boolean => {
  const contextGroup = component?.properties?.groupSection?.value || {}
  const externalScope = combineFormValues(component.properties?.externalScope)
  try {
    let removeEqualCharacter = component.conditional?.hide.substring(1);
    if (removeEqualCharacter == "true") {
      return true;
    }
    let allValuesForm = {...valuesForm, ...form.value, ...externalScope, ...contextGroup};

    let replaceNotByNegationSymbol = removeEqualCharacter.replace(/\bnot\b/g, '!');
    let replaceLogicalOperators = replaceNotByNegationSymbol.replace(/\b\s*(and)\s*\b/g, ' && ').replace(/\b\s*(or)\s*\b/g, ' || ');
    let replaceEquals = replaceLogicalOperators.replace(/(?<![<>=!])=(?![>=<])/g, '==')
    let captureWords = replaceEquals.replace(/(\s*[^&|()]+\s*)([<>!]=?|==)(\s*[^&|()]+\s*)/g, (match, part1, part2, part3) => {
      let part1Word = part1.trim();

      if (Object.keys(allValuesForm).includes(part1Word)) {
        part1Word = typeof allValuesForm[part1Word] === 'string' ? `"${allValuesForm[part1Word]}"` : allValuesForm[part1Word]
      }
      let part3Word = part3.trim();

      if (Object.keys(allValuesForm).includes(part3Word)) {
        part3Word = typeof allValuesForm[part3Word] === 'string' ? `"${allValuesForm[part3Word]}"` : allValuesForm[part3Word]
      }

      if (typeof  part1Word == 'string' && (part1Word != 'true' && part1Word != 'false') && !part1Word?.startsWith('"') && !part1Word?.endsWith('"')) {
        part1Word =  isNaN(Number(part1Word)) ? '""' : `"${part1Word}"`
      }
      if (typeof  part3Word == 'string' && (part3Word != 'true' && part3Word != 'false') && !part3Word?.startsWith('"') && !part3Word?.endsWith('"')) {
        part3Word = isNaN(Number(part3Word)) ? '""' : `"${part3Word}"`
      }
      return `${part1Word || '""'} ${part2} ${part3Word || "''"}`
    });

    let replaceIncludesOperator = captureWords;
    if (captureWords.includes('.includes')) {
      replaceIncludesOperator = replaceIncludesOperator.replace(/\w+(?=\s*\.\s*includes)/g, (match) => {
        const resultValueMatch = allValuesForm[match.trim()];
        if(!resultValueMatch?.trim()) return '""'
        return typeof resultValueMatch === 'string' ? `"${resultValueMatch}"` : "''"
      })
    }
    const resultEvalExpression = eval(replaceIncludesOperator);

    if (resultEvalExpression) return true;

  } catch (error) {
    return false;
  }
  return false;
}
