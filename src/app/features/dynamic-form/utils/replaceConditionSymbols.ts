import {ComponentForm} from "@features/dynamic-form/models/formStructure.model";

export const replaceConditionSymbols = (condition) : string => {
  let replaceLogicalOperators = condition.replace(/\b\s*(and)\s*\b/g, ' && ').replace(/\b\s*(or)\s*\b/g, ' || ');
  return replaceLogicalOperators.replace(/(?<![<>=!])=(?![>=<])/g, '==')
}
