const config = {
  appName: 'شکارچیان جاسوس',
  titleFormat: (title: string): string => {
    return `${config.appName} | ${title}`;
  },
};

export default config;
