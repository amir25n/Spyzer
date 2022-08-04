export type locale = {code: 'fa' | 'en'; dir: 'rtl' | 'ltr'; $code: string};

export const mainNavigation = [
  {
    id: 'home',
    icon: 'home-2',
  },
  {
    id: 'about',
    icon: 'info-circle',
  },
] as const;

export const locales: locale[] = [
  {code: 'fa', dir: 'rtl', $code: 'فارسی'},
  {code: 'en', dir: 'ltr', $code: 'English'},
];
