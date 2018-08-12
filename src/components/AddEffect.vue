<!-- Adds a new effect to the list of operations carried out on the picture. -->

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
export default {
  methods: {
    addEffect() {
      this.$store.commit('addEffect');
    },
  },
};
</script>
