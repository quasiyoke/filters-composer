<!-- Shows a list of editable effect's properties: attributes. -->

<template>
  <div>
    <v-slider
      v-for="attribute in effect.attributes"
      :value="attribute.value"
      :min="attribute.min"
      :max="attribute.max"
      :label="attribute.name"
      :key="attribute.id"
      @input="setAttributeValue(attribute.id, $event)"
    />
  </div>
</template>

<script>
export default {
  props: {
    effect: {
      type: Object,
      require: true,
    },
  },
  methods: {
    setAttributeValue(attributeId, value) {
      this.$store.commit('setEffectAttributeValue', {
        effectId: this.effect.id,
        attributeId,
        value,
      });
    },
  },
};
</script>
