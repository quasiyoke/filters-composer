<!-- Shows a list of editable effect's properties: attributes. -->

<template>
  <div>
    <v-slider
      v-for="attribute in effect.attributes"
      :value="(attribute.value - attribute.min) / (attribute.max - attribute.min) * stepsCount"
      :min="0"
      :max="stepsCount"
      :label="attribute.name"
      :key="attribute.id"
      @input="setAttributeValue(attribute, $event)"
    />
  </div>
</template>

<script>
const stepsCount = 1000;

export default {
  data() {
    return {
      stepsCount,
    };
  },
  props: {
    effect: {
      type: Object,
      require: true,
    },
  },
  methods: {
    setAttributeValue({ id, min, max }, value) {
      this.$store.commit('setEffectAttributeValue', {
        effectId: this.effect.id,
        attributeId: id,
        value: value / stepsCount * (max - min) + min,
      });
    },
  },
};
</script>
