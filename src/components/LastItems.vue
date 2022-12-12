<script setup lang="ts">
import { api } from 'boot/axios'

const items = await api
  .get('/items?per-page=15')
  .then((response) => response.data)
</script>

<template>
  <div class="products" style="margin-bottom: 30px">
    <router-link
      class="product"
      v-for="product in items"
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
            :optPrice="product.item?.opt_price"
            :valute="product.valute"
          />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LastItemsComponent',
}
</script>
