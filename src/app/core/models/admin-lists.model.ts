export interface List {
  id: number;
  name: string;
  url: string;
  list: ListItem[];
}

export interface ListItem {
  label: string;
  value: string;
}

export type ListDTO = Omit<List, 'id'>
