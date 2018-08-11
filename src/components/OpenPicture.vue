<template>
  <v-card>
    <v-card-title>
      <v-select
        :items="choices"
        v-model="pictureId"
        label="Open"
        height="32"
      />
    </v-card-title>
  </v-card>
</template>

<script>
/*
 * Allows to choose an image.
 */

import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      choices: state => Object.entries(state.pictures)
        .map(
          ([id, { name }]) => ({
            text: name,
            value: id,
          }),
        ),
    }),
    pictureId: {
      get() {
        return this.$store.state.pictureId;
      },
      set(pictureId) {
        this.$store.commit('setPictureId', pictureId);
      },
    },
  },
  methods: {
    addEffect() {
      this.$store.dispatch('addEffect');
    },
  },
};
</script>
