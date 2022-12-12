<script lang="ts" setup>
defineProps({
  componentData: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <q-card bordered class="card-text">
    <div class="text-h6" v-if="componentData.settings.title.length">
      {{ componentData.settings.title }}
    </div>
    {{ componentData.settings.text }}
  </q-card>
</template>

<script lang="ts">
export default {
  name: 'CardText',
}
</script>

<style lang="scss" scoped>
.card-text {
  margin-bottom: 30px;
  padding: 16px;
  .text-h6 {
    margin-bottom: 15px;
  }
}
</style>
