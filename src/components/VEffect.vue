<!-- Shows editable picture filter. -->

<template>
  <v-card class="mt-2 pt-3 pl-3 pr-1">
    <v-layout align-center>
      <v-flex xs12>
        <v-select
          :items="typesChoices"
          v-model="type"
          label="Filter"
          height="32"
        />
        <EffectAttributes :effect="effect" />
      </v-flex>
      <v-flex>
        <v-btn
          @click="remove"
          class="remove"
          title="Remove"
          small
          fab
        >
          <v-icon>delete</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

import EffectAttributes from '@/components/EffectAttributes';

export default {
  props: {
    effect: {
      type: Object,
      require: true,
    },
  },
  computed: {
    ...mapState({
      typesChoices: state => Object.values(state.effectsPresets)
        .map(
          ({
            type,
            name,
          }) => ({
            text: name,
            value: type,
          }),
        ),
    }),
    type: {
      get() {
        return this.effect.type;
      },
      set(type) {
        this.$store.commit('setEffectType', {
          effectId: this.effect.id,
          type,
        });
      },
    },
  },
  methods: {
    remove() {
      this.$store.commit('removeEffect', this.effect.id);
    },
  },
  components: {
    EffectAttributes,
  },
};
</script>
