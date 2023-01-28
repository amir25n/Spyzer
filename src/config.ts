import {unsafeCSS} from 'lit';

import normalize from './styles/normalize.css?inline';

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

const config = {
  icons,
  styles,
  words,
};

export default config;
