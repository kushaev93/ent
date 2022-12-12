<script setup lang="ts">
import { usePage } from 'stores/page'
import { useMeta } from 'quasar'
import Sidebar from 'components/Sidebar.vue'

const store = usePage()
const page = await store.setPage('pages/home')
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
    yandex_verification: {
      name: 'yandex-verification',
      content: '546e47f745f59492',
    },
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
  name: 'IndexPage',
}
</script>
