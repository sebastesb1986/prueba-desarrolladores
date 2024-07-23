import './bootstrap';

import { createApp } from 'vue';
import axios from 'axios';
import router from './router';
import App from './components/App.vue';
import VueSweetalert2 from 'vue-sweetalert2';

// Estilos a usar en la app
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'sweetalert2/dist/sweetalert2.min.css';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

createApp(App).use(router).use(VueSweetalert2).mount('#app');

