import type {Route as VaadinRouter} from '@vaadin/router';

export type Route = {
  title: string;
  icon?: string;
  show_in_bar: boolean;
} & VaadinRouter;
