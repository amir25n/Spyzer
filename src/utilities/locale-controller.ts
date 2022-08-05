import {router} from '@alwatr/router';
import {notEqual} from 'lit';

import {locales} from '../config';

import type {locale} from '../config';

class LocaleController {
  html?: HTMLElement;

  constructor() {
    this.update();
  }

  get locale(): locale {
    const localeString = window.localStorage.getItem('i18nLocale');

    if (!localeString) {
      this.locale = locales[0];
      return this.locale;
    }

    return <locale>JSON.parse(localeString);
  }
  set locale(_locale: locale) {
    window.localStorage.setItem('i18nLocale', JSON.stringify(_locale));
  }

  update(): void {
    const HTMLElement = document.querySelector('html');

    if (!HTMLElement) return;

    this.html = HTMLElement;

    if (notEqual(this.locale.code, this.html.lang)) {
      this.html.lang = this.locale.code;
    }
    if (notEqual(this.locale.dir, this.html.dir)) {
      this.html.dir = this.locale.dir;
    }

    router.signal.request({pathname: '/'});
  }
}

export default LocaleController;
