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
</template>

<script lang="ts">
export default {
  name: 'SimpleText',
}
</script>

<style lang="scss" scoped>
.simple-text-section {
  margin-bottom: 30px;
  h4.heading {
    margin-bottom: 20px;
    position: relative;
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
