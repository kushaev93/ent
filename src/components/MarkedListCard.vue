<script lang="ts" setup>
import { ref } from 'vue'

defineProps({
  componentData: {
    type: Object,
    required: true,
  },
})

const step = ref<number>(1)
</script>

<template>
  <section class="stepper-section">
    <q-stepper v-model="step" vertical color="primary" animated>
      <q-step
        v-for="(item, i) in componentData.settings"
        :key="i"
        :name="Number(i)"
        :title="item.name"
        icon="settings"
        :done="step > Number(i)"
      >
        <div v-html="item.text"></div>
        <q-stepper-navigation>
          <q-btn @click="step = Number(i) + 1" color="primary" label="Далее" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </section>
</template>

<script lang="ts">
export default {
  name: 'MarkedListComponent',
}
</script>

<style lang="scss" scoped></style>
