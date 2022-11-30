import type {Contribute} from './types/contribute';

const words: string[] = ['بیمارستان', 'تیمارستان'];
const contributes: Contribute[] = [
  {
    image: '/images/icon-512-maskable.png',
    donate: 'https://www.coffeete.ir/mm25zamanian',
    name: {
      'fa-IR': 'سید محمدمهدی زمانیان',
      'en-US': 'S. MohammadMahdi Zamanian',
    },
    job: {
      'fa-IR': 'مدیر محصول / توسعه دهنده',
      'en-US': 'Product Manager / Developer',
    },
    description: {
      'fa-IR': `
      وقتی ثروت‌ های بزرگ به دست برخی مردم می‌افتد
      در پرتو آن نیرومند می‌شوند و در سایهٔ نیرومندی و ثروت خیال می‌ کنند که می‌توانند در خارج از وطن خود زندگی نمایند
      و خوشبخت و سرافراز باشند ولی به زودی می‌ فهمند که اشتباه کرده‌ اند
      و عظمت هر ملتی بر روی خرابه‌ های وطن خودش می‌باشد و بس!
      `,
      'en-US': '',
    },
  },
];

export default {
  words,
  contributes,
};
