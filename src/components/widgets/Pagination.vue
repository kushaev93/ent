<script lang="ts" setup>
import { computed, ref } from 'vue'
const props = defineProps({
  pages: {
    type: Number,
    default: 0,
  },
  route: {
    type: Object,
    required: true,
  },
  search: {
    type: Boolean,
    default: false,
  },
})

let pagesArr = ref<Array<number>>([])
let i = 1
while (i <= props.pages) {
  pagesArr.value.push(i)
  i++
}

const currentPage = computed(() =>
  props.route.query.page ? Number(props.route.query.page) : 1
)
const pagesShow = computed(() => {
  if (props.pages > 7 && props.pages - currentPage.value <= 6) {
    return pagesArr.value.slice(props.pages - 7)
  }
  if (props.pages <= 7) {
    return pagesArr.value.slice(0, 7)
  }
  return pagesArr.value.slice(currentPage.value - 1, currentPage.value + 6)
})
</script>

<template>
  <ul class="pagination" v-if="pages > 1">
    <li v-if="currentPage > 2">
      <router-link
        :to="`${props.route.path}?page=1${
          props.search ? '&search=' + props.route.query.search + '' : ''
        }`"
        >&#171;</router-link
      >
    </li>
    <li v-if="currentPage > 1">
      <router-link
        :to="`${props.route.path}?page=${currentPage - 1}${
          props.search ? '&search=' + props.route.query.search + '' : ''
        }`"
        >&#8249;</router-link
      >
    </li>
    <li v-for="page in pagesShow" :key="page">
      <router-link
        :to="`${props.route.path}?page=${page}${
          props.search ? '&search=' + props.route.query.search + '' : ''
        }`"
        v-bind:class="{ active: currentPage === page }"
        >{{ page }}</router-link
      >
    </li>
    <li v-if="currentPage < Number(pages) && Number(pages) > 1">
      <router-link
        :to="`${props.route.path}?page=${currentPage + 1}${
          props.search ? '&search=' + props.route.query.search + '' : ''
        }`"
        >&#8250;</router-link
      >
    </li>
    <li v-if="currentPage < Number(pages) && Number(pages) > 2">
      <router-link
        :to="`${props.route.path}?page=${Number(pages)}${
          props.search ? '&search=' + props.route.query.search + '' : ''
        }`"
        >&#187;</router-link
      >
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: 'PaginationComp',
}
</script>

<style lang="scss" scoped>
ul.pagination {
  display: flex;
  flex-direction: row;
  list-style: none;
  gap: 20px;
  flex-wrap: wrap;
  a {
    transition: 0.3s;
    cursor: pointer;
    background: $white;
    border: 1px solid $light_grey;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 48px;
    text-decoration: none;
    font-size: 18px;
    color: $black;
    &.active {
      background: $main;
      color: $white;
    }
    &:hover {
      background: $main;
      color: $white;
    }
  }
}
</style>
