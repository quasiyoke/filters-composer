<!-- Represents retouched picture. -->

<template>
  <canvas class="root" ref="canvas"></canvas>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import { fetchPicture } from '@/utils/pictures';
import { getKernel } from '@/utils/effects';

import { createContext, draw } from './graphics';

export default {
  computed: {
    ...mapGetters(['pictureUrl']),
    ...mapState({
      kernels: ({ effects }) => effects.map(getKernel),
    }),
  },
  mounted() {
    this.updateContext();
    window.addEventListener('resize', this.updateContext);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateContext);
  },
  watch: {
    kernels() {
      this.redraw();
    },
    pictureUrl() {
      this.updateContext();
    },
  },
  methods: {
    redraw() {
      if (!this.ctx) {
        return;
      }

      draw(this.ctx, this.kernels);
    },
    updateContext() {
      this.ctx = null;
      fetchPicture(this.pictureUrl)
        .then((picture) => {
          this.ctx = createContext(this.$refs.canvas, picture);
          this.redraw();
        });
    },
  },
};
</script>

<style scoped lang="styl">
  .root {
    width: 100%;
    height: 100%;
  }
</style>
