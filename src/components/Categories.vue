<script setup lang="ts">
import { api } from 'boot/axios'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Pagination from 'components/widgets/Pagination.vue'

const router = useRouter()
const mobile = ref(false)
const show = ref(false)
const search = ref<string>('') // Search

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

const SubCategory = categories.data.filter((elem) => elem.parent != null) //Убрал главные Категории

function submit() {
  if (search.value.length) {
    router.push(
      `/search?search=${search.value.replace(
        /[`~!@#$%^&()|+\=?;'",.<>\{\}\[\]\\\/]/gi,
        ''
      )}`
    )
    show.value = false
  }
}
</script>

<template>
  <section class="categories-main">
    <h3>Выберите бренд</h3>
    <div>
      <form class="search-form" @submit.prevent="submit">
        <input type="text" v-model.trim="search" placeholder="Поиск" />
        <div class="form-btn">
          <q-btn
            @click="submit"
            class="btn"
            outline
            style="color: #2e2efe"
            label="Поиск бренда"
          />
        </div>
      </form>
    </div>

    <div class="categories-list">
      <router-link
        class="category-element"
        v-for="category of SubCategory"
        :key="category.id"
        :to="`/catalog/${category.url}`"
      >
        <div class="category-widget">
          <span>{{ category.name.toUpperCase() }}</span>
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
  border: 3px solid #848484;
  border-radius: 20px;
  padding: 6%;

  h3 {
    text-align: center;
    color: #848484;
  }
}

.search-form {
  position: relative;
  align-items: center;
  .form-btn {
    text-align: center;
    margin: 30px 0px;
    .btn {
      padding: 9px 38px;
      font-weight: bold;
      font-size: 15px;
    }
  }
  input {
    border: 1px solid $main;
  }
  button[type='submit'] {
    position: absolute;
    right: 16px;
    border: none;
    background: none;
  }
}
.categories-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  .category-element {
    display: flex;
    cursor: pointer;
    align-items: center;
    transition: 0.5s;
    color: $black;
    text-decoration: none;
    background: $white;
    border: 2px solid $light_grey;
    border-radius: 17px;
    padding: 2% 5%;
    font-size: 1rem;
    letter-spacing: 1px;
    font-weight: 400;
    &:hover {
      background: $light_grey;
    }
  }
}
</style>
