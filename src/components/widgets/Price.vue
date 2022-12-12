<template>
  <span class="format-price">
    {{ Number(price) === 0 ? 'Под заказ' : price.toFixed(2) }}
    {{ Number(price) === 0 ? '' : valute }}
  </span>
</template>

<script setup lang="ts">
defineProps({
  price: {
    default: 0,
  },
  valute: {
    type: String,
    default: '₽',
  },
})
</script>

<script lang="ts">
export default {
  name: 'PriceComponent',
}
</script>
