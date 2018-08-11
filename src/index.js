import Vue from 'vue';

import VApp from '@/components/VApp';
import '@/styles/main.styl';

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  template: '<VApp/>',
  components: {
    VApp,
  },
});
