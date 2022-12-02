const icons: string[] = [
  'home',
  'game-controller',
  'code-working',

  'home-outline',
  'game-controller-outline',
  'code-working-outline',

  'cafe-outline',
  'people-outline',
  'skull-outline',
  'time-outline',
  'arrow-back-outline',
];

const config = {
  icons,
  appName: 'شکارچیان جاسوس',
  titleFormat: (title: string): string => {
    return `${title} - ${config.appName}`;
  },
};

export default config;
