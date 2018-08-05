<template>
  <div class="root">
    <Effect
      v-for="effect in effects"
      :key="effect.id"
      :effect="effect"
    />
    <p v-if="!effects.length">There're no effects to apply</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Effect from '@/components/Effect';

export default {
  computed: mapState({
    effects: 'effects',
  }),
  components: {
    Effect,
  },
};
</script>
