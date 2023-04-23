import { createApp } from 'vue';
import App from './App.vue';
import iui from '@my-lib/components';

const app = createApp(App);
app.use(iui);
app.mount('#app');
