<template>
  <v-card class="mt-2">
    <v-card-title>
      <v-layout align-center>
        <v-flex xs12>
          {{ effect.name }}
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
export default {
  props: {
    effect: {
      type: Object,
      require: true,
    },
  },
  computed: {
    status: {
      get() {
        return this.effect.status;
      },
      set(status) {
        this.$store.commit('setJobStatus', {
          jobId: this.effect.id,
          status,
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
