<template>
  <v-app dark>
    <v-navigation-drawer app right class="grey darken-4">
      <OperationsList/>
    </v-navigation-drawer>
    <v-content>
      <VCanvas/>
    </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Vuetify from 'vuetify';

import OpenPicture from '@/components/OpenPicture';
import OperationsList from '@/components/OperationsList';
import store from '@/store';
import VCanvas from '@/components/VCanvas';

Vue.use(Vuetify);
export default {
  components: {
    OperationsList,
    VCanvas,
    OpenPicture,
  },
  store,
};
</script>
