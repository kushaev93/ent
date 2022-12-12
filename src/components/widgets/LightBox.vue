<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { Navigation, Keyboard } from 'swiper-cjs'
import { Swiper, SwiperSlide } from 'swiper-cjs/vue'
import { useEventListener } from 'src/composables/listener'
import { Notify } from 'quasar'
import { ref } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  imgIndex: {
    type: Number,
    required: false,
  },
  hide: {
    type: Function,
    reuqired: true,
    default: () =>
      Notify.create({
        message: 'Ошибка лайтбокса',
        timeout: 2000,
        color: 'primary',
      }),
  },
})

const swiperRef = ref<Record<string, any> | null>(null)
const modules = [Navigation, Keyboard]

const onSwiper = (swiper: Record<string, any>) => {
  swiperRef.value = swiper
  if (props.imgIndex && swiperRef.value) {
    swiperRef.value.slideTo(props.imgIndex)
  }
}

useEventListener('keydown', (event: Event) => {
  const e = event as KeyboardEvent
  if (e.key === 'Escape') {
    props.hide()
  }
})
</script>

<template>
  <div class="lightbox-overlay">
    <div class="close" @click="props.hide">&times;</div>
    <swiper
      @swiper="onSwiper"
      :slides-per-view="1"
      :space-between="0"
      :modules="modules"
      navigation
      keyboard
      ref="swiperRef"
      class="gallery-lightbox"
      v-outside="hide"
    >
      <swiper-slide
        class="lightbox-image"
        v-for="(img, index) in props.images"
        :key="index"
      >
        <ImageComp :image="img" :alt="`Галерея-${index}`" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LightboxWidget',
}
</script>

<style lang="scss" scoped>
.lightbox-overlay {
  position: fixed;
  z-index: 998;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .close {
    color: #fff;
    font-size: 55px;
    top: 30px;
    right: 30px;
    position: absolute;
    cursor: pointer;
    opacity: 0.75;
    transition: 0.3s;
    z-index: 999;
    &:hover {
      opacity: 1;
    }
  }
  .lightbox-image {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    img {
      height: 70vh;
      max-width: 90%;
      object-fit: contain;
    }
  }
  .swiper-button-next:after,
  .swiper-button-prev:after {
    color: #fff;
  }
}
</style>
