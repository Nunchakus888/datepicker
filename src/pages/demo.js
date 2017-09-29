import Vue from 'vue';
import App from '@modules/Demo';
import '../lib/element.config';

new Vue({
    el: '#app',
    render: h => h(App),
});
