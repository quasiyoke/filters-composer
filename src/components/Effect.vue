<template>
  <v-card class="mt-2">
    <v-card-title>
      <v-layout align-center>
        <v-flex xs12>
          <v-layout column>
            <v-flex>
              <v-select
                :items="effectsChoices"
                v-model="type"
                label="Filter"
                height="32"
              />
            </v-flex>
          </v-layout>
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
    </v-card-title>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    effect: {
      type: Object,
      require: true,
    },
  },
  computed: {
    ...mapState({
      effectsChoices: state => Object.values(state.effectsPresets)
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
};
</script>

<style scoped lang="styl">
.isStarted {
  float: right;
}

.remove {
  float: right;
  border: 0;
  background: transparent;
  cursor: pointer;
}
</style>
