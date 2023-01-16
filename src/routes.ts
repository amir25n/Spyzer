import {html} from 'lit';
import {Routes} from './types/route';

const routes: Routes = {
  home: {
    icon: 'home',
    render: () =>
      html`
        <h1>Hello World</h1>
        <alwatr-icon name="home" url-prefix="/iconsax/"></alwatr-icon>
        <alwatr-icon name="home-2" url-prefix="/iconsax/"></alwatr-icon>
        <alwatr-icon name="3d-rotate" url-prefix="/iconsax/"></alwatr-icon>
        <alwatr-icon name="3dcube" url-prefix="/iconsax/"></alwatr-icon>
        <alwatr-icon name="airplane" url-prefix="/iconsax/"></alwatr-icon>
        <alwatr-icon name="camera" url-prefix="/iconsax/"></alwatr-icon>
        <alwatr-icon name="convert" url-prefix="/iconsax/"></alwatr-icon>
        <alwatr-icon name="command" url-prefix="/iconsax/"></alwatr-icon>
        <alwatr-icon name="cpu" url-prefix="/iconsax/"></alwatr-icon>
        <alwatr-icon name="woman" url-prefix="/iconsax/"></alwatr-icon>
      `,
  },
};

export default routes;
