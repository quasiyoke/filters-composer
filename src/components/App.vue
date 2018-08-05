<template>
  <v-app dark>
    <v-navigation-drawer right app>
      <v-container>
        <v-layout column>
          <v-flex>
            <EffectsList/>
          </v-flex>
          <v-flex text-xs-center mt-4>
            <v-btn
              @click="addEffect"
              large
              fab
              color="primary"
            >
              <v-icon large>add</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
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

import EffectsList from '@/components/EffectsList';
import store from '@/store';

Vue.use(Vuetify);
export default {
  methods: {
    addEffect() {
      this.$store.dispatch('addEffect');
    },
  },
  components: {
    EffectsList,
  },
  store,
};
</script>
