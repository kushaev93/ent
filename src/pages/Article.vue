<script lang="ts" setup>
import { usePage } from 'stores/page'
import { useRoute } from 'vue-router'
import { useMeta } from 'quasar'
import { toDate } from 'src/helpers/convert'
import Sidebar from 'components/Sidebar.vue'

const store = usePage()
const route = useRoute()
const page = await store.setPage(`articles/${route.params.article}`)
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
            <section class="item-simple">
              <div class="main-desc">
                <div class="image">
                  <ImageComp
                    :image="page.imageFile"
                    :alt="`${page.name} - представление`"
                    class="main-img"
                  />
                </div>
                <div class="desc">
                  <div class="articul">
                    Тип: <strong>{{ page.type }}</strong>
                  </div>
                  <div class="info-item">
                    Дата публикации:
                    <strong>{{ toDate(page.updated_at) }}</strong>
                  </div>
                  <div class="text" v-html="page.short_desc"></div>
                </div>
              </div>
            </section>
            <component
              v-for="component of page.blocks"
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
  name: 'ArticlePage',
}
</script>
