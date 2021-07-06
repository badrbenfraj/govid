import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    url: '/dashboard',
    icon: 'feather icon-home',
    classes: 'nav-item',
  },
  {
    id: 'usersGroup',
    title: 'Users',
    type: 'group',
    icon: 'icon-ui',
    children: [
      {
        id: 'users',
        title: 'Users',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'usersLabo',
            title: 'Users Laboratory',
            type: 'item',
            url: '/dashboard/users/laboratoire'
          },
          {
            id: 'usersLabo',
            title: 'Users Laboratory',
            type: 'item',
            url: '/dashboard/users/laboratoire'
          },
          {
            id: 'usersLabo',
            title: 'Users Laboratory',
            type: 'item',
            url: '/dashboard/users/laboratoire'
          },
        ]
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
