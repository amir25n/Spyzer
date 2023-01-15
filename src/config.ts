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

const config = {
  icons,
  styles,
  appName: 'Spyzer',
};

export default config;
