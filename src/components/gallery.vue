<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper-cjs/vue'
import { Navigation, FreeMode } from 'swiper-cjs'
import { ref } from 'vue'
import Lightbox from 'components/widgets/LightBox.vue'

defineProps({
  componentData: {
    type: Object,
    required: true,
  },
})

type PerView = number | 'auto' | undefined

const showLightbox = ref<boolean>(false)
const imgIndex = ref<number>(0)
const modules = [Navigation, FreeMode]
const spaceBetween = 10
const breakpoints = {
  768: {
    slidesPerView: 'auto' as PerView,
    spaceBetween: 10,
  },
  360: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
}

function showImg(newIndex: number) {
  imgIndex.value = newIndex
  showLightbox.value = true
}

function handleHide() {
  showLightbox.value = false
}
</script>

<template>
  <section class="gallery-section">
    <div class="gallery-wrapper">
      <swiper
        :slides-per-view="'auto'"
        :space-between="spaceBetween"
        :modules="modules"
        :breakpoints="breakpoints"
        navigation
        freeMode
        ref="swiperComponentRef"
        class="slides swiper gallery"
      >
        <swiper-slide
          v-for="(img, i) in componentData.settings"
          :key="i"
          @click="() => showImg(Number(i))"
        >
          <ImageComp :image="img" :alt="`Изобажение галлереи-${i}`" />
        </swiper-slide>
      </swiper>
    </div>
    <Transition name="slide-fade">
      <Lightbox
        :images="componentData.settings"
        :imgIndex="imgIndex"
        :hide="handleHide"
        v-if="showLightbox"
      />
    </Transition>
  </section>
</template>

<script lang="ts">
export default {
  name: 'GalleryComponent',
}
</script>

<style lang="scss" scoped>
.gallery-section {
  padding: 0 0 30px;
  .swiper-button-prev,
  .swiper-button-next {
    &.swiper-button-disabled {
      opacity: 0.75;
      pointer-events: all;
    }
    &:hover {
      opacity: 0.75;
    }
    &:after {
      opacity: 0.92;
      color: $grey;
      font-size: 24px;
    }
  }
  .gallery-wrapper {
    height: 400px;
    .swiper {
      height: 100%;
    }
  }
  .swiper-slide {
    width: auto;
  }
  .gallery {
    cursor: pointer;
    img {
      width: 550px;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
    }
  }
}

@media screen and (max-width: 768px) {
  .gallery-section {
    padding: 0 0 30px;
    .gallery-wrapper {
      height: 300px;
    }
    .gallery {
      img {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .gallery-section {
    .gallery-wrapper {
      height: 250px;
    }
  }
}

@media screen and (max-width: 360px) {
  .gallery-section {
    .gallery-wrapper {
      height: 200px;
    }
  }
}
</style>
