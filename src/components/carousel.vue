<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper-cjs/vue'
import { Navigation } from 'swiper-cjs'
import { toRef } from 'vue'

const props = defineProps({
  componentData: {
    type: Object,
    required: true,
  },
})
const data = toRef(props.componentData, 'settings')
const modules = [Navigation]

function short(text: string) {
  if (text.length > 27) {
    return `${text.substring(0, 27)}...`
  }
  return text
}
</script>

<template>
  <section class="carousel-section">
    <h4 class="a-class" v-animate="'a-slide-left'">
      {{ data.title }}
    </h4>
    <swiper
      :slides-per-view="'auto'"
      :space-between="10"
      :modules="modules"
      navigation
      ref="swiperComponentRef"
      class="slides swiper a-class"
      v-animate="'a-fade-in'"
    >
      <swiper-slide v-for="(item, i) in data.items" :key="i">
        <router-link
          class="carousel-item"
          :to="`/catalog/${item.category_url}/${item.url}`"
        >
          <ImageComp :image="item.imageFile" :alt="item.name" />
          <div class="content">
            <div class="name">{{ short(item.name) }}</div>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script lang="ts">
export default {
  name: 'CarouselComponent',
}
</script>

<style lang="scss" scoped>
.carousel-section {
  padding: 30px 0;
  h4 {
    margin-bottom: 30px;
  }
  .swiper-slide {
    width: auto;
  }
  .swiper-button-prev,
  .swiper-button-next {
    cursor: pointer;
    transition: 0.5s;
    &.swiper-button-disabled {
      opacity: 0.5;
      pointer-events: all;
    }
    &:hover {
      opacity: 0.85;
    }
    &:after {
      color: $white;
      font-size: 30px;
    }
  }
}

.carousel-item {
  border: 1px solid $light_grey;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: $black;
  width: 380px;
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
  .content {
    padding: 20px;
    background: $white;
    .name {
      font-weight: 600;
      font-size: 18px;
    }
  }
}

@media screen and (max-width: 580px) {
  .carousel-section {
    .swiper-slide {
      width: 100%;
    }
  }
  .carousel-item {
    width: 100%;
    img {
      height: 250px;
    }
  }
}

@media screen and (max-width: 360px) {
  .carousel-item {
    img {
      height: 200px;
    }
  }
}
</style>
