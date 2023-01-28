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

const config = {
  styles,
  words,
};

export default config;
