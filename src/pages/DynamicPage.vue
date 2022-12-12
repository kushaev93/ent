<script lang="ts" setup>
import { usePage } from 'stores/page'
import { useRoute } from 'vue-router'
import { useMeta } from 'quasar'
import Sidebar from 'components/Sidebar.vue'

const route = useRoute()
const store = usePage()
const page = await store.setPage('pages/' + route.params.page)
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
          <div class="sidebar">
            <Sidebar />
          </div>
          <div class="page-content">
            <h1 class="mobile">{{ page.name }}</h1>
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
  name: 'DynamicPage',
}
</script>
