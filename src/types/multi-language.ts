export type Language = `${Lowercase<string>}-${Uppercase<string>}`;

export type MultiLanguage<langs extends Language = 'en-US' | 'fa-IR'> = {
  [lang in langs]: string;
};
