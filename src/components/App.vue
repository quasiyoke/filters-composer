<template>
  <v-app dark>
    <v-navigation-drawer right app>
      <OperationsList/>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <v-layout column>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Vuetify from 'vuetify';

import OperationsList from '@/components/OperationsList';
import store from '@/store';

Vue.use(Vuetify);
export default {
  components: {
    OperationsList,
  },
  store,
};
</script>
