<!-- Shows a list of effects applied to the picture. -->

<template>
  <div>
    <VEffect
      v-for="effect in effects"
      :key="effect.id"
      :effect="effect"
    />
    <p v-if="!effects.length">There're no effects to apply</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import VEffect from '@/components/VEffect';

export default {
  computed: mapState({
    effects: 'effects',
  }),
  components: {
    VEffect,
  },
};
</script>
