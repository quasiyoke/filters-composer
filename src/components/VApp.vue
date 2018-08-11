<template>
  <v-app dark>
    <v-navigation-drawer app right>
      <OperationsList/>
    </v-navigation-drawer>
    <v-content>
      <v-layout column align-center justify-center fill-height>
        <VCanvas/>
      </v-layout>
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
