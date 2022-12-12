<script setup lang="ts">
// import { useCart } from 'stores/cart'
// import { computed } from 'vue'
//import { ICartItem } from 'stores/models'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

// const cart = useCart()
// const cartItems = computed(() => cart.cart)
//const count = ref<number>(1)
// const inCart = computed(() => {
//   let added = cartItems.value.find((product) => product.id === props.item.id)
//   if (added) {
//     return added
//   }
//   return false
// })

// function toCart(item: ICartItem) {
//   item.count = count.value
//   cart.addItem(item)
// }

// function increment() {
//   count.value++
// }

// function decrement(): void {
//   if (count.value > 1) {
//     count.value--
//   }
// }
</script>

<template>
  <section class="item-simple">
    <div class="main-desc">
      <div class="image">
        <ImageComp
          :image="item.imageFile"
          :alt="`${item.name} - представление`"
          class="main-img"
        />
      </div>
      <div class="desc">
        <div class="articul">
          Артикул: <strong>{{ item.vendor_code }}</strong>
        </div>
        <div class="info-item">
          Категория: <strong>{{ item.category_name }}</strong>
        </div>
        <div class="price">
          <PriceComp :price="props.item.price" :valute="props.item.valute" />
          <p style="font-size: 16px">
            Оптовая цена: {{ props.item?.opt_price?.toFixed(2) }}
            {{ props.item.valute }}
          </p>
        </div>
        <q-no-ssr>
          <div
            class="to-cart-row"
            v-if="!props.item.variable && !props.item.hc"
          >
            <!-- <div class="counter big">
              <div
                class="cnt-minus controls"
                @click="!inCart ? decrement() : cart.minusCart(props.item.id)"
              >
                <img src="/static_images/icons/cnt_minus.svg" alt="Минус" />
              </div>
              <div class="counter-number">
                {{ !inCart ? count : inCart.count }}
              </div>
              <div
                class="cnt-plus controls"
                @click="!inCart ? increment() : cart.plusCart(props.item.id)"
              >
                <img src="/static_images/icons/cnt_plus.svg" alt="Плюс" />
              </div>
            </div> -->
            <router-link class="buttons blue" to="/prajs-listy">
              Прайс-лист
            </router-link>
            <!-- <router-link v-else class="buttons primary" to="/cart"
              >Уже добавлено<span>Перейти в корзину</span></router-link
            > -->
          </div>
        </q-no-ssr>
        <!-- <div class="count-in-store" v-if="props.item.in_stock.is"><span>Наличие:</span> {{props.item.in_stock.count}} шт.</div> -->
        <q-no-ssr>
          <div class="text" v-html="props.item.short_description"></div>
        </q-no-ssr>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'ItemBlock',
}
</script>
