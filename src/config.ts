import {unsafeCSS} from 'lit';

import normalize from './styles/normalize.css?inline';

const styles = [unsafeCSS(normalize)];
const words = [
  'carpentry',
  'attari',
  'butcher-shop',
  'hospital',
  'graveyard',
  'fabric-store',
  'mosque',
  'super-market',
  'furniture-store',
  'real-estate',
  'shrine',
  'toy-store',
  'paradise',
  'the-hell',
  'purgatory',
  'garden',
  'palace',
  'stable',
  'farm',
  'cattle-breeding',
  'greenhouse',
  'florist',
  'toggery',
  'clinic',
] as const;

const navigationBar = (show?: boolean) => {
  const element = document.querySelector('spy-app');

  if (element !== null && show != null) {
    element.showNavigationBar = show;
  }

  return element?.showNavigationBar ?? false;
};

const config = {
  styles,
  words,
  navigationBar: {
    isShow: () => navigationBar(),
    show: () => navigationBar(true),
    hide: () => navigationBar(false),
  },
};

export default config;
