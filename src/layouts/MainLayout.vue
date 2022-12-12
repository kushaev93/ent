<template>
  <q-layout view="hhh lpr fff">
    <q-header class="header" id="full-header">
      <HeaderComp />
    </q-header>
    <q-page-container>
      <router-view v-slot="{ Component, route }">
        <Suspense>
          <component :is="Component" :key="route.fullPath" />
        </Suspense>
      </router-view>
    </q-page-container>
    <q-footer class="footer">
      <FooterComp />
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import HeaderComp from 'components/HeaderComp.vue'
import FooterComp from 'components/FooterComp.vue'
</script>

<script lang="ts">
import { useNav } from 'stores/navigation'

export default {
  name: 'MainLayout',
  async preFetch({ store }) {
    const nav = useNav(store)
    await nav.getNav()
  },
}
</script>
