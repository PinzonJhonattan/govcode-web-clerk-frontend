import {ComponentForm} from "@features/dynamic-form/models/formStructure.model";

export const separateLinealFields = (components: ComponentForm[]): [ComponentForm[], ComponentForm[]] => {
  let beforeTab: ComponentForm[] = [];
  let afterTab: ComponentForm[] = [];

  for (const component of components) {
    if (component?.properties?.type === 'tab') {
      break;
    }
    beforeTab.push(component);
  }
  afterTab = components.slice(beforeTab.length);
  return [beforeTab, afterTab];
}
