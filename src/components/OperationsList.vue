<template>
  <v-container>
    <v-layout column>
      <v-flex>
        <EffectsList/>
      </v-flex>
      <v-flex text-xs-center mt-4>
        <AddEffect/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AddEffect from '@/components/AddEffect';
import EffectsList from '@/components/EffectsList';

export default {
  components: {
    AddEffect,
    EffectsList,
  },
};
</script>
