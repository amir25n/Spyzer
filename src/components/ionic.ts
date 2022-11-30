import {initialize} from '@ionic/core/components';
import {defineCustomElement as app} from '@ionic/core/components/ion-app.js';
import {defineCustomElement as avatar} from '@ionic/core/components/ion-avatar.js';
import {defineCustomElement as button} from '@ionic/core/components/ion-button.js';
import {defineCustomElement as buttons} from '@ionic/core/components/ion-buttons.js';
import {defineCustomElement as cardContent} from '@ionic/core/components/ion-card-content.js';
import {defineCustomElement as card} from '@ionic/core/components/ion-card.js';
import {defineCustomElement as content} from '@ionic/core/components/ion-content.js';
import {defineCustomElement as header} from '@ionic/core/components/ion-header.js';
import {defineCustomElement as item} from '@ionic/core/components/ion-item.js';
import {defineCustomElement as label} from '@ionic/core/components/ion-label.js';
import {defineCustomElement as list} from '@ionic/core/components/ion-list.js';
import {defineCustomElement as note} from '@ionic/core/components/ion-note.js';
import {defineCustomElement as range} from '@ionic/core/components/ion-range.js';
import {defineCustomElement as slide} from '@ionic/core/components/ion-slide.js';
import {defineCustomElement as slides} from '@ionic/core/components/ion-slides.js';
import {defineCustomElement as tabBar} from '@ionic/core/components/ion-tab-bar.js';
import {defineCustomElement as tabButton} from '@ionic/core/components/ion-tab-button.js';
import {defineCustomElement as text} from '@ionic/core/components/ion-text.js';
import {defineCustomElement as title} from '@ionic/core/components/ion-title.js';
import {defineCustomElement as toolbar} from '@ionic/core/components/ion-toolbar.js';

const ionComponents = [
  app,
  avatar,
  button,
  buttons,
  card,
  cardContent,
  content,
  header,
  item,
  label,
  list,
  note,
  range,
  slide,
  slides,
  tabBar,
  tabButton,
  text,
  title,
  toolbar,
];

initialize({
  animated: true,
  statusTap: true,
  mode: 'md',
  swipeBackEnabled: true,
  spinner: 'circular',
  tabButtonLayout: 'icon-top',
  sanitizerEnabled: true,
});

for (const ionComponent of ionComponents) {
  ionComponent();
}
