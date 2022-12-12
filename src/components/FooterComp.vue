<script setup lang="ts">
import { useNav } from 'stores/navigation'

const now = new Date()
const nav = useNav()
</script>

<template>
  <div class="container footer-content">
    <div class="company">
      <span>{{ nav.settings?.company_name }} © </span>
      {{ now.getFullYear() }}
    </div>
    <div class="links">
      <q-page-sticky position="bottom-right" :offset="[25, 25]">
        <a style="text-decoration: none" href="https://wa.me/+821080991299"
          ><q-btn fab icon="phone" color="green"
        /></a>
      </q-page-sticky>
      <ul>
        <li v-for="link in nav.footer" :key="link.id">
          <router-link :to="link.url">{{ link.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.footer {
  .footer-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: $black;
    gap: 20px;
    .company {
      display: flex;
      align-items: center;
      color: $white;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 20px;
      a {
        text-decoration: none;
        color: $white;
      }
    }
  }
}

@media screen and (max-width: 1280px) {
  .footer {
    .footer-content {
      flex-direction: column-reverse;
      ul {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
}
</style>
