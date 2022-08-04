import {createLogger} from '@alwatr/logger';

export async function registerSW(): Promise<void> {
  const logger = createLogger('register-sw');

  if ('serviceWorker' in navigator) {
    return await navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => logger.logProperty('success', registration))
        .catch((error) => logger.error('error', '500', error));
  }
}
