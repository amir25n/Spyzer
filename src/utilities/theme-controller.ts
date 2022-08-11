import {createLogger} from '@alwatr/logger';

import {themeColors} from '../config';

import type {color} from '../config';

class ThemeController {
  protected _logger = createLogger('controller/theme');

  constructor() {
    this.update();
  }

  get color(): color {
    const theme = <color | null>window.localStorage.getItem('themeColor');

    if (!theme) {
      this.color = themeColors[0].name;
      return this.color;
    }

    return theme;
  }
  set color(_theme: color) {
    window.localStorage.setItem('themeColor', _theme);
  }

  get mode(): 'dark' | 'light' {
    const theme = <'dark' | 'light' | null>window.localStorage.getItem('themeMode');

    if (!theme) {
      this.mode = 'light';
      return this.mode;
    }

    return theme;
  }
  set mode(_theme: 'dark' | 'light') {
    window.localStorage.setItem('themeMode', _theme);
  }

  update(): void {
    const body = document.body;

    body.classList.remove(...themeColors.map((themeColor) => themeColor.name), 'dark', 'light');
    body.classList.add(this.color, this.mode);

    this._logger.logMethodArgs('update', {color: this.color, mode: this.mode});
  }
}

export default ThemeController;
