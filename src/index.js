import Vue from 'vue';
import App from '@/components/App';
import '@/styles/main.styl';

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App,
  },
});
