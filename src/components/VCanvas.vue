<template>
  <img
    :src="pictureUrl"
    class="root"
  >
</template>

<script>
/*
 * Allows to choose an image.
 */

import { mapGetters } from 'vuex';

export default {
  computed: mapGetters(['pictureUrl']),
};
</script>

<style scoped lang="styl">
  .root {
    max-width: 100%;
    max-height: 100%;
  }
</style>
