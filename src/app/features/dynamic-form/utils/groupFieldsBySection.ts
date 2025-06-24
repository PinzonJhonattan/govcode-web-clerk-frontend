export const groupFieldsBySection = (components: any[], actualLevel = 1): any[] => {
  let actualSectionComponent = null;
  let finalComponents = [];
  let numStartDynamicSection = 0;
  let numEndDynamicSection = 0;
  for (let component of components) {
    if (component?.properties?.type === 'startDynamicSection') {
      if (!actualSectionComponent && (numStartDynamicSection + numEndDynamicSection) % 2 == 0 && numStartDynamicSection == numEndDynamicSection) {
        actualSectionComponent = component;
        actualSectionComponent.properties.components = [];
      } else {
        actualSectionComponent.properties.components.push(component);
      }
      numStartDynamicSection += 1;
    } else {
      if (actualSectionComponent && component?.properties?.type !== 'endDynamicSection') {
        actualSectionComponent.properties.components.push(component)
      } else if (actualSectionComponent && component?.properties?.type === 'endDynamicSection') {
        numEndDynamicSection += 1;
        if ((numStartDynamicSection + numEndDynamicSection) % 2 == 0 && numStartDynamicSection == numEndDynamicSection) {
          actualSectionComponent.properties.type = 'dynamicSection'
          actualSectionComponent.properties.level = actualLevel;
          finalComponents.push(actualSectionComponent)
          actualSectionComponent = null
        }else{
          actualSectionComponent.properties.components.push(component);
        }
      } else {
        finalComponents.push(component)
      }
    }
  }
  return finalComponents;
};
