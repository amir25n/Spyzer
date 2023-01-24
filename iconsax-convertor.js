import fs from 'node:fs';
import path from 'node:path';

const icons = fs
    .readdirSync('./iconsax/')
    .map((i) => path.resolve('./iconsax/' + i))
    .filter((i) => i.includes('.svg'));

for (const icon of icons) {
  const iconSource = fs
      .readFileSync(icon)
      .toString('utf-8')
      .replaceAll(``, ``);

  fs.writeFileSync(icon, iconSource);

  console.log(icon);
}
