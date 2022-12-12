<script lang="ts" setup>
defineProps({
  componentData: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="features-section">
    <div class="container">
      <h4 class="a-class" v-animate="'a-fade-in'">Почему выбирают нас?</h4>
      <div class="features-grid">
        <div
          class="feature"
          v-for="(feature, i) of componentData.settings"
          :key="i"
        >
          <ImageComp
            :image="feature.imageFile"
            :thumb="true"
            :alt="feature.name"
          />
          <div class="content">
            <div class="name">{{ feature.name }}</div>
            <div class="text">{{ feature.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'FeaturesComponent',
}
</script>
