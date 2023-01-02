<template>
  <section id="slider" class="main-slider">
    <div class="module-big-slider">
      <swiper
        :slides-per-view="slidesPerView"
        :space-between="spaceBetween"
        :modules="modules"
        navigation
        :autoplay="{
          delay: 4000,
        }"
        class="slides swiper"
      >
        <swiper-slide class="slide" v-for="(slide, i) in data" :key="i">
          <div class="images">
            <ImageComp
              :image="slide.imageFile"
              :alt="`Слайд - ${slide.title}`"
              class="full-img"
            />
          </div>
          <div class="content">
            <h1 v-if="i === 0" class="a-class slider" v-animate="'a-scale'">
              {{ slide.title }}
            </h1>
            <h2 v-else class="a-class" v-animate="'a-fade-in'">
              {{ slide.title }}
            </h2>
            <router-link
              v-if="slide.button_text.length"
              class="buttons primary a-class"
              :to="slide.button_link"
              v-animate="'a-flip'"
            >
              {{ slide.button_text }}
            </router-link>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { toRef } from 'vue'
import { Navigation, Autoplay } from 'swiper-cjs'
import { Swiper, SwiperSlide } from 'swiper-cjs/vue'

const props = defineProps({
  componentData: {
    type: Object,
    required: true,
  },
})
const data = toRef(props.componentData, 'settings')
const modules = [Navigation, Autoplay]
const slidesPerView = 1
const spaceBetween = 0
</script>

<script lang="ts">
export default {
  name: 'SliderComponent',
}
</script>

<style lang="scss" scoped>
.module-big-slider {
  width: 100%;
  position: relative;
  height: 600px;
  background: $light_grey;
  margin-bottom: 30px;
  h1,
  h2 {
    margin-bottom: 0;
    color: $white;
    font-size: 36px;
    font-weight: 600;
  }
  .slides {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .slide {
      height: 100%;
      width: 100%;
      position: relative;
      background: $light_grey;
      overflow: hidden;
      .h2-link {
        text-decoration: none;
      }
      .images {
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to bottom right, #002f4b, #dc4225);
        .full-img {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }
      .content {
        display: none;
        // position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        padding: 15px 25px;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    border: 0;
    outline: 0;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.5s;
    background: $main;
    &.swiper-button-disabled {
      background: transparent;
      opacity: 1;
    }
    &:hover {
      opacity: 0.85;
    }
    &:after {
      color: $white;
      font-size: 24px;
    }
  }
  .swiper-button-prev {
    left: 25px;
  }
  .swiper-button-next {
    right: 25px;
  }
}

@media screen and (max-width: 1024px) {
  .module-big-slider {
    .swiper-button-prev {
      left: 0px;
    }
    .swiper-button-next {
      right: 0px;
    }
  }
}

@media screen and (max-width: 768px) {
  //slider
  .module-big-slider {
    height: 400px;
    h1,
    h2 {
      font-size: 28px;
    }
  }
}

@media screen and (max-width: 580px) {
  //slider
  .module-big-slider {
    height: 350px;
    h1,
    h2 {
      text-align: center;
      font-size: 26px;
    }
    .slides .slide .content {
      height: 100%;
      flex-direction: column;
      justify-content: center;
      padding: 15px 50px;
      .buttons {
        margin-top: 15px;
      }
    }
  }
}

@media screen and (max-width: 400px) {
  .module-big-slider .swiper-button-prev {
    display: none;
  }
}
</style>
