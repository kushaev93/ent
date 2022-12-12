<script lang="ts" setup>
import { ref } from 'vue'

defineProps({
  componentData: {
    type: Object,
    required: true,
  },
})
const isActive = ref<number | null>(1)

function toggleItem(index: number) {
  if (isActive.value === index) {
    isActive.value = null
  } else {
    isActive.value = index
  }
}

function enter(el: HTMLElement) {
  el.style.height = 'auto'
  const { height } = getComputedStyle(el)
  el.style.height = '0'
  getComputedStyle(el)
  setTimeout(() => {
    el.style.height = height
  })
}

function afterEnter(el: HTMLElement) {
  el.style.height = 'auto'
}

function leave(el: HTMLElement) {
  el.style.height = getComputedStyle(el).height
  getComputedStyle(el)
  setTimeout(() => {
    el.style.height = '0'
  })
}
</script>

<template>
  <section class="accordion-section">
    <ul class="accordion">
      <li
        v-for="(item, i) in componentData.settings"
        :key="i"
        @click="toggleItem(Number(i))"
      >
        <div class="heading">
          <h5>{{ item.name }}</h5>
          <div
            class="plus"
            v-bind:class="{ active: isActive !== Number(i) }"
          ></div>
        </div>
        <Transition
          name="expand"
          @enter="enter"
          @after-enter="afterEnter"
          @leave="leave"
        >
          <div
            v-show="isActive === Number(i)"
            class="content-text"
            v-html="item.text"
          />
        </Transition>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
export default {
  name: 'AccordionComponent',
}
</script>

<style lang="scss" scoped>
.no-select {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.accordion-section {
  margin-bottom: 30px;
}

ul.accordion {
  list-style: none;
  perspective: 900;
  padding: 0;
  margin: 0;
  li {
    position: relative;
    cursor: pointer;
    .heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
      background: $white;
      margin-bottom: 20px;
      position: sticky;
      top: 0;
      border-bottom: 1px solid #242a34;
      z-index: 9;
      h5 {
        display: block;
        @extend .no-select;
        margin: 0;
      }
      .plus {
        width: 23px;
        height: 23px;
        &:after {
          transform: rotate(0deg);
        }
        &.active {
          &:after {
            transform: rotate(-90deg);
          }
        }
      }
    }
    .content-text {
      font-size: 18px;
      position: relative;
      overflow: hidden;
      transition: all 0.5s ease-in-out;
      opacity: 1;
      z-index: 2;
      text-align: justify;
      p {
        font-size: 18px;
        line-height: 26px;
        margin-bottom: 30px;
      }
      img {
        margin-bottom: 30px;
      }
      ul {
        list-style: disc;
        padding-left: 20px;
        margin-bottom: 30px;
        li {
          margin-bottom: 10px;
        }
      }
      ol {
        list-style: decimal;
        padding-left: 20px;
        margin-top: 10px;
        margin-bottom: 30px;
        li {
          margin-bottom: 10px;
        }
      }
    }
    input[type='checkbox'] {
      position: absolute;
      cursor: pointer;
      width: 100%;
      height: 100%;
      z-index: 99;
      opacity: 0;
      &:checked {
        & ~ .configurator {
          padding-bottom: 0;
          max-height: 0;
          opacity: 0;
        }
        & ~ .content-text {
          padding-bottom: 0;
          max-height: 0;
          opacity: 0;
        }
        & ~ .heading .plus {
          &:after {
            transform: rotate(-90deg);
          }
        }
      }
    }
  }
}
</style>
