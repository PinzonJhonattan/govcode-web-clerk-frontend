export interface TableColumn<T> {
  label: string;
  property: string;
  type: 'text' | 'image' | 'badge' | 'progress' | 'checkbox' | 'button';
  visible?: boolean;
  cssClasses?: string[];
  action ?: string;
  linkButtonEdit?: string;
  linkButtonReview?: string;
  linkButtonDelete?: string;
  titleButton?: string | ((...params : any) => any);
  buttonIcon?: string;
  permissions?: string[]
}
