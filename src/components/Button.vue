<script lang="ts" setup>
defineProps({
  componentData: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <a
    :href="componentData.settings.link"
    class="buttons primary a-class a-flip comp-button"
  >
    {{ componentData.settings.text }}
  </a>
</template>

<script lang="ts">
export default {
  name: 'ButtonComponent',
}
</script>

<style lang="scss" scoped>
.comp-button {
  margin: 20px 30px 30px 0px;
}
</style>
