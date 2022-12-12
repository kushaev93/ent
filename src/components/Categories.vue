<script setup lang="ts">
import { api } from 'boot/axios'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Pagination from 'components/widgets/Pagination.vue'

const route = useRoute()
const perPage = 30
const url = computed(
  () => `/get-all-categories?page=${route.query.page || 1}&per-page=${perPage}`
)

const categories = await api.get(url.value)
const pages = computed(() =>
  categories.data
    ? Math.ceil(
        Number(categories.headers['x-pagination-total-count']) / perPage
      )
    : 0
)
</script>

<template>
  <section class="categories-main">
    <div class="categories-list">
      <router-link
        class="category-element"
        v-for="category of categories.data"
        :key="category.id"
        :to="`/catalog/${category.url}`"
      >
        <div class="category-widget">
          <span>{{ category.name }}</span>
          <div class="icon-next"></div>
        </div>
      </router-link>
    </div>
    <Pagination :pages="pages" :route="route" />
  </section>
</template>

<script lang="ts">
export default {
  name: 'CategoriesComponent',
}
</script>

<style lang="scss" scoped>
.categories-main {
  margin-bottom: 30px;
}
.categories-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  .category-element {
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
