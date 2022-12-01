import type {MultiLanguage} from './multi-language';

export type Contribute = {
  image: string;
  href?: string;
  donate?: string;
  name: MultiLanguage;
  job: MultiLanguage;
  description: MultiLanguage;
};
