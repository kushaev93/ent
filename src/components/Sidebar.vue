<script setup lang="ts">
import { ref } from 'vue'
import { useCategory } from 'stores/categories'
import SlideUpDown from 'vue3-slide-up-down'

const store = useCategory()
await store.getRootCategories()
const activeCategories = ref<Record<string, boolean>>({})
const loading = ref<Record<string, boolean>>({})

async function setCategories(url: string, id: number) {
  Object.keys(activeCategories.value).map((key) => {
    activeCategories.value[key] = false
  })
  loading.value[id] = true
  await store.getSubCategories(url).then(() => {
    loading.value[id] = false
  })
  if (id in activeCategories.value) {
    delete activeCategories.value[id]
  } else {
    activeCategories.value[id] = true
  }
}
</script>

<template>
  <div class="categories-widget">
    <div
      class="category-elements"
      v-for="category of store.categories"
      :key="category.id"
    >
      <div
        class="category-widget"
        @click="setCategories(category.url, category.id)"
      >
        <span>{{ category.name }}</span>
        <div class="icon-next"></div>
      </div>
      <SlideUpDown v-model="activeCategories[category.id]" :duration="500">
        <div class="category-widget-children">
          <router-link
            class="children-list"
            v-for="child of store.subCategories[category.url]"
            :key="child.id"
            :to="`/catalog/${child.url}`"
          >
            <span>{{ child.name }}</span>
          </router-link>
        </div>
      </SlideUpDown>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SidebarComponent',
}
</script>

<style lang="scss" scoped>
.categories-widget {
  position: sticky;
  top: 20px;
  display: flex;
  flex-direction: column;
  .category-widget.active {
    background: $main;
    color: $white;
    .plus {
      &::before,
      &::after {
        background: $white;
      }
      &::after {
        transform: rotate(0deg);
      }
    }
  }
  .category-widget {
    border: 1px solid $light_grey;
    padding: 15px 10px;
    margin-bottom: 3px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;
    transition: 0.5s;
    color: $black;
    font-size: 14px;
    text-decoration: none;
    background: $white;
    &.router-link-exact-active {
      background: $main;
      color: $white;
      img {
        filter: invert(100%);
      }
    }
    &:hover {
      background: $main;
      color: $white;
      .icon-next {
        &::after {
          color: $white;
        }
      }
      img {
        filter: invert(100%);
      }
    }
    .icon-next {
      position: relative;
      width: 16px;
      height: 16px;
      min-width: 16px;
      min-height: 16px;
      display: block;
      transition: 0.3s;
      &::after {
        content: 'next';
        color: $black;
        font-family: swiper-icons;
        font-size: 14px;
        text-transform: none !important;
        letter-spacing: 0;
        font-variant: initial;
        line-height: 1;
      }
    }
  }
  .category-widget-children {
    width: 100%;
    background: #fff;
    border: 1px solid $light_grey;
    margin: 3px 0;
    display: block;
    max-height: 550px;
    font-size: 14px;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -moz-overflow-scrolling: touch;
    -ms-overflow-scrolling: touch;
    -o-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      -webkit-appearance: none;
      appearance: none;
      width: 0px;
      height: 100px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(208, 203, 190, 0.25);
      border-radius: 25px;
    }
    .children-list {
      padding: 12px;
      color: $black;
      border-bottom: 1px solid $light_grey;
      text-decoration: none;
      display: flex;
      flex-direction: row;
      align-items: center;
      &:last-child {
        border-bottom: none;
      }
      &.router-link-exact-active {
        background: $light_grey;
      }
      &:hover {
        background: $light_grey;
      }
    }
  }
}
</style>
