import { ISideBar } from './main-layout-model';

export const MENULIST: ISideBar[] = [
  {
    icon: 'dashboard',
    label: 'dashboard',
    path: '/dashboard',
  },
  { icon: 'list_alt', label: 'processos', path: '/processos' },
  { icon: 'supervisor_account', label: 'contatos', path: '/contatos' },
];
