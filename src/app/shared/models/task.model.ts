export interface TaskVariables {
  variables: {
    [key: string]: TaskField;
  };
}
export interface TaskVariablesModification {
  modifications: {
    [key: string]: TaskField;
  };
}

export interface TaskField {
  value: any;
  type: string;
  valueInfo?: FileTaskField;
}

export interface FileTaskField {
  filename: string;
  mimetype: string;
  encoding: string;
}

export interface ValuesTaskForm {
  [key: string]: TaskField;
}
