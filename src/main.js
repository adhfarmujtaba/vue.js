import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import './assets/styles.css'; // Global styles if you have any
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Import the solid icons

library.add(fas); // Add the solid icons to the library

const app = createApp(App);

// Use the router
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon); // Register the FontAwesomeIcon component globally

// Mount the app
app.mount('#app');
