import {Injectable} from '@angular/core';
import {Role} from '@auth/models';

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
        title: 'Utilisateurs',
        type: 'collapse',
        url: '/dashboard/users',
        icon: 'feather icon-users',
        roles: ['ROLE_ADMIN'],
        children: [
          {
            id: 'usersLabo',
            title: 'Utilisateurs Laboratoire',
            type: 'item',
            url: '/dashboard/users/laboratoire',
            roles: ['ROLE_ADMIN'],

          },
          {
            id: 'usersPharmacie',
            title: 'Utilisateurs Pharmacie',
            type: 'item',
            url: '/dashboard/users/pharmacy',
            roles: ['ROLE_ADMIN']
          },
          {
            id: 'usersMedecin',
            title: 'Utilisateurs Medecin',
            type: 'item',
            url: '/dashboard/users/medecin',
            roles: ['ROLE_ADMIN']
          },
        ]
      }
    ]
  },
  {
    id: 'medecins',
    title: 'Medecins',
    type: 'item',
    url: '/dashboard/medecin/list-medecin',
    icon: 'feather icon-activity',
    classes: 'nav-item',
    roles: ['ROLE_ADMIN', 'ROLE_USER', Role.agentMedecin],
  },
  {
    id: 'machines',
    title: 'Machines',
    type: 'item',
    url: '/dashboard/machines',
    icon: 'feather icon-activity',
    classes: 'nav-item',
    roles: ['ROLE_ADMIN', 'ROLE_USER'],
  },
  {
    id: 'Laboratoires',
    title: 'Laboratoires',
    type: 'item',
    url: '/dashboard/laboratoire',
    icon: 'feather icon-activity',
    classes: 'nav-item',
    roles: ['ROLE_ADMIN', 'ROLE_USER'],
  },
  {
    id: 'Pharmacies',
    title: 'Pharmacies',
    type: 'item',
    url: '/dashboard/pharmacie',
    icon: 'feather icon-activity',
    classes: 'nav-item',
    roles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MEDECIN_AGENT', 'ROLE_PHARMACY_AGENT', 'ROLE_LABORATOIRE_AGENT'],
  },
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
