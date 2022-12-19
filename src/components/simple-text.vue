<script lang="ts" setup>
defineProps({
  componentData: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="simple-text-section">
    <h4 class="heading" v-if="componentData.settings.title.length">
      {{ componentData.settings.title }}
    </h4>
    <div class="simple-text" v-html="componentData.settings.text"></div>
  </section>
  <!--
  <q-card dark bordered class="bg-grey-9 my-card">
    <q-card-section>
      <div class="text-h6">{{ componentData.settings.title }}</div>
      <div class="simple-text" v-html="componentData.settings.text"></div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section> asd </q-card-section>
  </q-card> -->
</template>

<script lang="ts">
export default {
  name: 'SimpleText',
}
</script>

<style lang="scss" scoped>
.simple-text-section {
  margin-bottom: 30px;
  h5 {
    font-weight: 500 !important;
    line-height: 2rem;
    letter-spacing: 0.16667em;
  }
  h4.heading {
    margin-bottom: 20px;
    position: relative;
    font-weight: 500;
    line-height: 2rem;
    letter-spacing: 0.16667em;
    &::after {
      width: 80px;
      margin-top: 7px;
      display: block;
      content: '';
      background: $light_blue;
      height: 2px;
    }
  }
}

.simple-text {
  font-size: 18px;
  line-height: 24px;
  text-align: justify;
  img {
    margin: 20px 0;
  }
  ul {
    margin-top: 10px;
    list-style: disc;
    padding-left: 20px;
    margin-bottom: 30px;
  }
  ol {
    list-style: decimal;
    padding-left: 20px;
    margin-top: 10px;
    margin-bottom: 30px;
  }
  p {
    line-height: 24px;
    margin-bottom: 15px;
  }
}
</style>
