export type locale = {code: 'fa' | 'en'; dir: 'rtl' | 'ltr'; $code: string};
export type color = 'blue' | 'indigo' | 'purple' | 'pink' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'cyan';
export type themeColor = {
  name: color;
  colorPrimary: `#${string}`;
  colorPrimaryContrast: `#${string}`;
};

export const mainNavigation = [
  {
    id: 'home',
    icon: 'home-2',
  },
  {
    id: 'settings',
    icon: 'setting-2',
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

export const themeColors: themeColor[] = [
  {
    name: 'blue',
    colorPrimary: '#0d6efd',
    colorPrimaryContrast: '#ffffff',
  },
  {
    name: 'indigo',
    colorPrimary: '#6610f2',
    colorPrimaryContrast: '#ffffff',
  },
  {
    name: 'purple',
    colorPrimary: '#6f42c1',
    colorPrimaryContrast: '#ffffff',
  },
  {
    name: 'pink',
    colorPrimary: '#d63384',
    colorPrimaryContrast: '#ffffff',
  },
  {
    name: 'red',
    colorPrimary: '#dc3545',
    colorPrimaryContrast: '#ffffff',
  },
  {
    name: 'orange',
    colorPrimary: '#fd7e14',
    colorPrimaryContrast: '#000000',
  },
  {
    name: 'yellow',
    colorPrimary: '#ffc107',
    colorPrimaryContrast: '#000000',
  },
  {
    name: 'green',
    colorPrimary: '#198754',
    colorPrimaryContrast: '#ffffff',
  },
  {
    name: 'teal',
    colorPrimary: '#20c997',
    colorPrimaryContrast: '#000000',
  },
  {
    name: 'cyan',
    colorPrimary: '#0dcaf0',
    colorPrimaryContrast: '#000000',
  },
];
