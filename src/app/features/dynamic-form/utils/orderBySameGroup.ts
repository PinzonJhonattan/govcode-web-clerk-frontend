import {ComponentForm} from "@features/dynamic-form/models/formStructure.model";

export const orderBySameGroup = (components: ComponentForm[]): ComponentForm[] => {
  let groupsFlag = {};
  let finalComponents = [];

  for (let [index, component] of components.entries()) {
    const groupByComponent = component.properties?.groupBy?.trim()
    if (groupByComponent && !(/^(['"]{2})$/.test(groupByComponent))) {
      groupsFlag[component.properties?.groupBy] = {
        index: index,
        component: component,
        numChildrens: 0
      };
    } else if (component.properties?.groupName?.trim()) {
      let groupAssociate = groupsFlag[component.properties?.groupName];
      if (groupAssociate) {
        groupAssociate.numChildrens += 1;

        let finalComponent = {...component};
        if (groupAssociate.numChildrens > 1) {
          finalComponent.notCountAsInitialElement = true;
        }
        finalComponent.layout.row = groupAssociate.component.layout.row;
        finalComponent.layout.columns = groupAssociate.component.layout.columns;

        finalComponents.splice(groupAssociate.index, 0, finalComponent);
        groupAssociate.index += 1;
      }
    } else {
      finalComponents.push(component);
    }
  }
  return finalComponents;
}
