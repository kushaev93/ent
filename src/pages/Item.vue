<script setup lang="ts">
import { usePage } from 'stores/page'
import { useMeta } from 'quasar'
import { useRoute } from 'vue-router'
import ItemBlock from 'components/ItemBlock.vue'

const route = useRoute()
const store = usePage()
const page = await store.setPage('items/' + route.params.item)
let itemInfo = {
  id: page.id,
  name: page.name,
  short_description: page.short_description,
  vendor_code: page.vendor_code,
  price: page.price,
  imageFile: page.imageFile,
  category_name: page.category_name,
  category_url: page.category_url,
  valute: page.valute,
  url: page.url,
  opt_price: page.opt_price,
}
const metaData = {
  title: page.meta_title,
  meta: {
    description: { name: 'description', content: page.meta_description },
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
            <h1 class="mobile">{{ page.name }}</h1>
            <ItemBlock :item="itemInfo" />

            <component
              v-for="component in page.blocks"
              :key="component.id"
              :is="component.name"
              :componentData="component"
            />
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script lang="ts">
export default {
  name: 'ItemPage',
}
</script>
