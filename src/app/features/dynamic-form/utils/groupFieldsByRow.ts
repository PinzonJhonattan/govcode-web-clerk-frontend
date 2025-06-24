export const groupFormByRow = (components: any[]) => {
  const rowsMap = new Map();
  components.forEach(component => {
    const row = component.layout.row;
    if (!rowsMap.has(row)) {
      rowsMap.set(row, []);
    }
    rowsMap.get(row).push(component);
  });
  return Array.from(rowsMap.values());
};
