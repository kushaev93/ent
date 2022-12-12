<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { api } from 'boot/axios'
import { useMeta } from 'quasar'
import { ICartItem } from 'src/stores/models'
import Sidebar from 'components/Sidebar.vue'
import Pagination from 'components/widgets/Pagination.vue'

const route = useRoute()
const perPage = 15
const url = computed<string>(() =>
  route.query.search
    ? encodeURI(`/search/${route.query.search}?page=${route.query.page || 1}`)
    : ''
)
const search = await api.get(url.value)
const pages = computed(() =>
  search.data
    ? Math.ceil(Number(search.headers['x-pagination-total-count']) / perPage)
    : 0
)
const metaData = {
  title: `Поиск - ${route.query.search}`,
  meta: {
    description: { name: 'description', content: 'Поиск' },
    equiv: {
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=UTF-8',
    },
    tileColor: { name: 'msapplication-TileColor', content: '#da532c' },
    themeColor: { name: 'theme-color', content: '#ffffff' },
  },
  script: {
    metrika: { src: '/scripts/metrika.js', crossOrigin: 'anonymous' },
  },
}
useMeta(metaData)
</script>

<template>
  <q-page class="site-content">
    <section class="page">
      <div class="container">
        <div class="page-grid section-pd">
          <div class="sidebar">
            <Sidebar />
          </div>
          <div class="page-content">
            <h1 class="mobile">
              Результаты поиска по запросу {{ route.query.search }}
            </h1>
            <p
              v-if="(!(search.data.items as Array<ICartItem>)?.length && !(search.data.categories)?.length)"
            >
              По вашему запросу ничего не найдено..
            </p>
            <div class="search-categories">
              <router-link
                class="children-list"
                v-for="category of search.data.categories"
                :key="category.id"
                :to="`/catalog/${category.url}`"
              >
                {{ category.name }}
              </router-link>
            </div>
            <div class="products" style="position: relative; min-height: 30vh">
              <router-link
                class="product"
                v-for="(product, index) of (search.data.items as Array<ICartItem>)"
                :to="`/catalog/${
                  product.category_url ? product.category_url : 'static'
                }/${product.url}`"
                :key="index"
              >
                <ImageComp
                  class="image"
                  :image="product.imageFile"
                  :alt="product.name"
                  :thumb="true"
                />
                <div class="content">
                  <div class="name">{{ product.name }}</div>
                  <div class="desc" v-html="product.vendor_code"></div>
                  <div class="price">
                    <PriceComp
                      :price="product.price"
                      :optPrice="product?.opt_price"
                      :valute="product.valute"
                    />
                  </div>
                </div>
              </router-link>
            </div>
            <Pagination :pages="pages" :route="route" search />
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script lang="ts">
export default {
  name: 'SearchPage',
}
</script>

<style lang="scss" scoped>
.search-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
  .children-list {
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
