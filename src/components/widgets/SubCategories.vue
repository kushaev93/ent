<script setup lang="ts">
import { useRoute } from 'vue-router'
import { api } from 'boot/axios'
const route = useRoute()
const categories = await api
  .get(`/category-children/${route.params.category}`)
  .then((response) => response.data)
</script>

<template>
  <div class="sub-categories" v-if="categories.length">
    <router-link
      class="sub-categories-item"
      v-for="category in categories"
      :key="category.id"
      :to="`/catalog/${category.url}`"
    >
      {{ category.name }}
    </router-link>
  </div>
</template>

<script lang="ts" scoped>
export default {
  name: 'SubCategoriesWidget',
}
</script>

<style lang="scss" scoped>
.sub-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  .sub-categories-item {
    border: 1px solid $light_grey;
    padding: 15px 10px;
    display: flex;
    cursor: pointer;
    align-items: center;
    transition: 0.5s;
    color: $black;
    font-size: 14px;
    text-decoration: none;
    background: $white;
    &:hover {
      background: $light_grey;
    }
  }
}
</style>
