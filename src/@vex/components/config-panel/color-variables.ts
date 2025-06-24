export interface ColorVariable {
  light: string;
  default: string;
  contrast: string;
}

export const colorVariables: Record<string, ColorVariable> = {
  primary: {
    light: 'rgba(51, 102, 204, .1)',
    default: 'rgb(51, 102, 204)',
    contrast: 'rgb(255, 255, 255)'
  },
  gray: {
    light: 'rgba(158, 158, 158, 0.1)',
    default: 'rgb(158, 158, 158)',
    contrast: 'rgb(255, 255, 255)'
  },
  red: {
    light: 'rgba(244, 67, 54, 0.1)',
    default: 'rgb(244, 67, 54)',
    contrast: 'rgb(255, 255, 255)',
  },
  orange: {
    light: 'rgba(255, 152, 0, 0.1)',
    default: 'rgb(255, 152, 0)',
    contrast: 'rgb(0, 0, 0)',
  },
  'deep-orange': {
    light: 'rgba(255, 87, 34, 0.1)',
    default: 'rgb(255, 87, 34)',
    contrast: 'rgb(255, 255, 255)'
  },
  amber: {
    light: 'rgba(255, 193, 7, 0.1)',
    default: 'rgb(255, 193, 7)',
    contrast: 'rgb(0, 0, 0)'
  },
  green: {
    light: 'rgba(76, 175, 80, 0.1)',
    default: 'rgb(76, 175, 80)',
    contrast: 'rgb(255, 255, 255)',
  },
  teal: {
    light: 'rgba(0, 150, 136, 0.1)',
    default: 'rgb(0, 150, 136)',
    contrast: 'rgb(255, 255, 255)'
  },
  cyan: {
    light: 'rgba(0, 188, 212, 0.1)',
    default: 'rgb(0, 188, 212)',
    contrast: 'rgb(255, 255, 255)'
  },
  purple: {
    light: 'rgba(4, 25, 38, 0.1)',
    default: 'rgb(4, 25, 38)',
    contrast: 'rgb(255, 255, 255)'
  },
  'deep-purple': {
    light: 'rgba(4, 25, 38, 0.1)',
    default: 'rgb(4, 25, 38)',
    contrast: 'rgb(255, 255, 255)'
  },
  pink: {
    light: 'rgba(4, 25, 38, 0.1)',
    default: 'rgb(4, 25, 38)',
    contrast: 'rgb(255, 255, 255)'
  },
  addButton: {
    light: 'rgb(145, 192, 44)',
    default: 'rgb(145, 192, 44)',
    contrast: 'rgb(145, 192, 44)'
  }
};
