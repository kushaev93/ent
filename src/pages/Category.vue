<script setup lang="ts">
import { useRoute } from 'vue-router'
import { api } from 'boot/axios'
import { computed } from 'vue'
import { useMeta } from 'quasar'
import Sidebar from 'components/Sidebar.vue'
import SubCategories from 'components/widgets/SubCategories.vue'
import Pagination from 'components/widgets/Pagination.vue'

const route = useRoute()
const perPage = 15
const url = computed(() =>
  route.params.category
    ? `/items-by-category/${route.params.category}?page=${
        route.query.page || 1
      }&per-page=${perPage}`
    : ''
)
const items = await api.get(url.value)
const pages = computed(() =>
  items.data
    ? Math.ceil(Number(items.headers['x-pagination-total-count']) / perPage)
    : 0
)
const metaData = {
  title: items.data.category.meta_title,
  meta: {
    description: {
      name: 'description',
      content: items.data.category.meta_description,
    },
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
            <component
              v-for="component in items.data.category.blocks"
              :key="component.id"
              :is="component.name"
              :componentData="component"
            />
            <SubCategories />
            <div class="products">
              <router-link
                class="product"
                v-for="product in items.data.items"
                :to="`/catalog/${
                  product.category_url ? product.category_url : 'static'
                }/${product.url}`"
                :key="product.id"
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
            <Pagination :pages="pages" :route="route" />
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script lang="ts">
export default {
  name: 'CategoryPage',
}
</script>
