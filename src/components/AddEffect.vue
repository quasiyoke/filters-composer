<template>
  <v-btn
    @click="addEffect"
    large
    fab
    color="primary"
  >
    <v-icon large>add</v-icon>
  </v-btn>
</template>

<script>
/*
 * Adds a new effect.
 */

export default {
  methods: {
    addEffect() {
      this.$store.dispatch('addEffect');
    },
  },
};
</script>
