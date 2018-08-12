<!--
  Shows a list of operations carried out in the program:
  from top to the bottom, step by step; from opening the picture
  to the last effect on it.
-->

<template>
  <v-container>
    <OpenPicture/>
    <EffectsList/>
    <div class="text-xs-center mt-4">
      <AddEffect/>
    </div>
  </v-container>
</template>

<script>
import AddEffect from '@/components/AddEffect';
import EffectsList from '@/components/EffectsList';
import OpenPicture from '@/components/OpenPicture';

export default {
  components: {
    AddEffect,
    EffectsList,
    OpenPicture,
  },
};
</script>
