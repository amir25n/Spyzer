import type {Route} from '../types/route';

const routes: Route[] = [
  {
    title: 'بازی',
    path: '/game',
    animate: true,
    show_in_bar: true,
    name: 'game-settings',
    icon: 'game-controller',
    component: 'page-game-settings',
  },
  {
    title: 'بازی',
    animate: true,
    show_in_bar: false,
    name: 'game-stages',
    path: '/game/stages',
    component: 'page-game',
  },
  {
    path: '/',
    title: 'خانه',
    icon: 'home',
    name: 'home',
    animate: true,
    show_in_bar: true,
    component: 'page-home',
  },
  {
    animate: true,
    path: '/contributes',
    title: 'توسعه دهندگان',
    name: 'contributes',
    icon: 'code-working',
    show_in_bar: true,
    component: 'page-contributes',
  },
];

export default routes;
