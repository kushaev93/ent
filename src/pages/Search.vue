<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { api } from 'boot/axios'
import { useMeta } from 'quasar'
import { ICartItem } from 'src/stores/models'
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
          <div class="page-content">
            <h1 class="mobile text-header">
              Результаты поиска по запросу - "{{ route.query.search }}"
            </h1>
            <p
              v-if="(!(search.data.items as Array<ICartItem>)?.length && !(search.data.categories)?.length)"
            >
              Ничего не найдено..
            </p>
            <div class="search-categories">
              <h3 class="text-header">Бренды</h3>
              <router-link
                class="children-list"
                v-for="category of search.data.categories"
                :key="category.id"
                :to="`/catalog/${category.url}`"
              >
                {{ category.name }}
              </router-link>

              <h3
                style="
                  color: #a5a5a5;
                  line-height: 40px;
                  text-align: center;
                  margin: 2rem;
                "
              >
                Товары
              </h3>
              <div
                class="products"
                style="position: relative; min-height: 30vh"
              >
                <div
                  class="product"
                  v-for="(product, index) of (search.data.items as Array<ICartItem>)"
                  :to="`/catalog/${
                    product.category_url ? product.category_url : 'static'
                  }/${product.url}`"
                  :key="index"
                >
                  <q-card class="my-card" flat bordered>
                    <q-card-section horizontal>
                      <q-card-section class="q-pt-xs">
                        <div class="text-overline">
                          {{ product.category_name }}
                        </div>
                        <div class="text-subtitle2 q-mt-sm q-mb-xs">
                          {{ product.name }}
                        </div>

                        <div class="price-item">
                          <PriceComp
                            :price="product.price"
                            :optPrice="product?.opt_price"
                            :valute="product.valute"
                          />
                        </div>
                        <div class="text-caption text-grey">
                          Минимальный заказ: 1 Коробка
                        </div>
                      </q-card-section>

                      <q-card-section class="col-5 flex flex-center">
                        <ImageComp
                          class="image"
                          :image="product.imageFile"
                          :alt="product.name"
                          :thumb="true"
                        />
                      </q-card-section>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
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
.text-header {
  color: $grey;
  line-height: 40px;
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 36px;
  }
}
.search-categories {
  display: contents;
  gap: 15px;
  margin-bottom: 30px;
  border: 2px solid $grey;
  border-radius: 10px;
  padding: 2rem;

  .children-list {
    display: block;
    text-align: center;
    border: 1px solid $light_grey;
    border-radius: 4px;
    padding: 15px 35px;
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
