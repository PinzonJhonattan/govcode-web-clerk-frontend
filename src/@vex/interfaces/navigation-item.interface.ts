import { IsActiveMatchOptions } from '@angular/router';

export type NavigationItem = NavigationLink | NavigationDropdown | NavigationSubheading | NavigationModal | NavigationForm;

export interface NavigationLink {
  type: 'link';
  route: string | any;
  fragment?: string;
  label: string;
  icon?: string;
  routerLinkActiveOptions?: { exact: boolean } | any;
  onlyShowTo?: string[],
  notShowTo?: string[],
  function?: string,
  badge?: {
    value: string;
    bgClass: string;
    textClass: string;
  };
}

export interface NavigationForm {
  type: 'form';
  label: string;
  icon?: string;
  formId: string;
  route: string | any;
  fragment?: string;
  routerLinkActiveOptions?: { exact: boolean } | any;
  onlyShowTo?: string[],
  notShowTo?: string[],
  badge?: {
    value: string;
    bgClass: string;
    textClass: string;
  };
}

export interface NavigationDropdown {
  type: 'dropdown';
  label: string;
  icon?: string;
  children: Array<NavigationLink | NavigationDropdown | NavigationModal | NavigationForm>;
  onlyShowTo?: string[],
  notShowTo?: string[],
  badge?: {
    value: string;
    bgClass: string;
    textClass: string;
  };
}

export interface NavigationSubheading {
  type: 'subheading';
  label: string;
  children: Array<NavigationLink | NavigationDropdown | NavigationModal | NavigationForm>;
}

export interface NavigationModal {
  type: 'modal';
  label: string;
  icon?: string;
  route: string | any;
  onlyShowTo?: string[],
  notShowTo?: string[],
}

