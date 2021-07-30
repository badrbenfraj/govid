import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  roles?: string[];
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
    roles: ['ROLE_ADMIN', 'ROLE_USER'],
  },
  {
    id: 'usersGroup',
    title: 'Users',
    type: 'group',
    icon: 'icon-ui',
    roles: ['ROLE_ADMIN'],
    children: [
      {
        id: 'users',
        title: 'Users',
        type: 'collapse',
        url: '/dashboard/users',
        icon: 'feather icon-users',
        roles: ['ROLE_ADMIN'],
        children: [
          {
            id: 'usersLabo',
            title: 'Users Laboratory',
            type: 'item',
            url: '/dashboard/users/laboratoire',
            roles: ['ROLE_ADMIN'],

          },
          {
            id: 'usersPharmacie',
            title: 'Users Pharmacy',
            type: 'item',
            url: '/dashboard/users/pharmacy',
            roles: ['ROLE_ADMIN']
          },
          {
            id: 'usersMedecin',
            title: 'Users Medecin',
            type: 'item',
            url: '/dashboard/users/medecin',
            roles: ['ROLE_ADMIN']
          },
        ]
      }
    ]
  },
  {
    id: 'medecin',
    title: 'Medecin',
    type: 'item',
    url: '/dashboard/medecin/list-medecin',
    icon: 'feather icon-activity',
    classes: 'nav-item',
    roles: ['ROLE_ADMIN'],
  },
  {
    id: 'machines',
    title: 'Machines',
    type: 'item',
    url: '/dashboard/machines',
    icon: 'feather icon-activity',
    classes: 'nav-item',
    roles: ['ROLE_ADMIN'],
  },
  {
    id: 'Laboratoires',
    title: 'Laboratoires',
    type: 'item',
    url: '/dashboard/laboratoire',
    icon: 'feather icon-activity',
    classes: 'nav-item',
    roles: ['ROLE_ADMIN'],
  },
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
