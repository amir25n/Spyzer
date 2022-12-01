import type {Route as AlwatrRoute} from '@alwatr/router';
import type {TemplateResult} from 'lit';

export type Route = {
  title: string;
  icon?: string;
  show_in_bar: boolean;
  // eslint-disable-next-line no-unused-vars
  render: (route: AlwatrRoute) => TemplateResult;
};
