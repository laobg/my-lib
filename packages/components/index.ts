import * as components from './src/index';
import { App } from 'vue';

export default {
  install: (app: App) => {
    for (const c of [...Object.values(components)]) {
      app.use(c);
    }
  },
};
