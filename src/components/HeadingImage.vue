<script lang="ts" setup>
defineProps({
  componentData: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="image-text-section">
    <div class="heading-image">
      <ImageComp
        class="image"
        :image="componentData.settings.imageFile"
        :alt="componentData.settings.name"
        :thumb="true"
      />
      <div class="content">
        <div class="name">{{ componentData.settings.name }}</div>
        <div class="desc" v-html="componentData.settings.text"></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'HeadingImageComponent',
}
</script>

<style lang="scss" scoped>
.heading-image {
  display: flex;
  flex-direction: row;
  text-decoration: none;
  color: $black;
  gap: 10px;
  margin-bottom: 30px;
  .image {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    font-size: 16px;
    line-height: 20px;
    align-items: flex-start;
    word-break: break-word;
    .marked {
      background: $light_blue;
      margin-bottom: 10px;
      border-radius: 4px;
      padding: 3px;
      color: $white;
      font-size: 14px;
      line-height: 18px;
    }
    .name {
      font-weight: 600;
      margin-bottom: 10px;
    }
    .desc {
      color: $grey;
      margin-bottom: 10px;
    }
  }
}
@media screen and (max-width: 480px) {
  .heading-image {
    .desc {
      font-size: 13px;
    }
  }
}
</style>
