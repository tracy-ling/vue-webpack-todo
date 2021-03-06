import Vue from 'vue';
import App from './app.vue';
import global from './assets/css/global.css';

let root = document.createElement('div');
document.body.appendChild(root);

new Vue({
    render: (h) => h(App)
}).$mount(root);
