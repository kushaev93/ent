<script lang="ts" setup>
import { useCart } from 'stores/cart'
import { useNav } from 'stores/navigation'
import { useRouter } from 'vue-router'
import { useForm } from 'stores/forms'
import { ref } from 'vue'
import { useValidate } from 'src/composables/validate'

const store = useCart()
const router = useRouter()
const global = useNav()
const show = ref(false)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modalData = ref<Record<string, any>>({})
const form = useForm()
const success = ref(false)
const { errors, validate } = useValidate()
const rules = {
  name: [['required', 'Поле обязательно']],
  email: [
    ['required', 'Поле обязательно'],
    ['email', 'Невалидный email'],
  ],
  phone: [
    ['required', 'Поле обязательно'],
    ['phone', 'Неверный формат номера'],
  ],
}

function phoneCheck() {
  const x = modalData.value.phone
    .replace(/\D/g, '')
    .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/) as RegExpMatchArray
  if (!x[2] && x[1] !== '') {
    modalData.value.phone = x[1] === '7' ? '+7 (' : `+7 (${x[1]}`
  } else {
    modalData.value.phone = !x[3]
      ? `+${x[1]} (${x[2]}`
      : `+${x[1]} (${x[2]}) ${x[3]}${x[4] ? `-${x[4]}` : ''}${
          x[5] ? `-${x[5]}` : ''
        }`
  }
}

async function sendData() {
  if (validate(modalData.value, rules)) {
    let items: Array<Record<string, unknown>> = []
    for (let i = 0; i < store.cart.length; i++) {
      items[i] = {} as Record<string, unknown>
      items[i].count = store.cart[i].count
      items[i].item_id = store.cart[i].id
      items[i].order_price = store.cart[i].price
    }
    modalData.value.items = items
    await form.sendOrder(modalData.value).then((response) => {
      if (response) {
        success.value = true
        store.cart = []
      }
    })
  }
}
</script>

<template>
  <div class="page">
    <q-no-ssr>
      <div class="container">
        <div class="page-grid no-sidebar section-pd">
          <div class="page-content">
            <h1 class="mobile">Корзина</h1>
            <table
              class="table cart-table a-class"
              v-if="store.cart.length !== 0"
              v-animate="'a-fade-in'"
            >
              <thead>
                <tr>
                  <th></th>
                  <th>Наименование</th>
                  <th class="center">Артикул</th>
                  <th class="center">Кол-во</th>
                  <th class="center">Цена</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cart, i) in store.cart" :key="i">
                  <td class="center img">
                    <ImageComp
                      class="image"
                      :image="cart.imageFile"
                      :alt="cart.name"
                      :thumb="true"
                    />
                  </td>
                  <td
                    class="name"
                    data-name="Наименование:"
                    @click="
                      router.push(`/catalog/${cart.category_url}/${cart.url}`)
                    "
                    style="cursor: pointer"
                  >
                    {{ cart.name }}
                  </td>
                  <td data-name="Артикул:" class="center vendor">
                    {{ cart.vendor_code }}
                  </td>
                  <td data-name="Количество:" class="center count">
                    <div class="counter w-144">
                      <div
                        class="cnt-minus controls"
                        @click="store.minusCart(cart.id)"
                      >
                        <img
                          src="/static_images/icons/cnt_minus.svg"
                          alt="Минус"
                        />
                      </div>
                      <div class="counter-nimber">
                        <input
                          @input="
                            store.enterCount(
                              cart.id,
                              ($event.target as HTMLInputElement).value
                            )
                          "
                          :value="cart.count"
                        />
                      </div>
                      <div
                        class="cnt-plus controls"
                        @click="store.plusCart(cart.id)"
                      >
                        <img src="/static_images/icons/cnt_plus.svg" alt="" />
                      </div>
                    </div>
                  </td>
                  <td data-name="Цена:" class="center price-td">
                    <PriceComp
                      :price="cart.price"
                      :valute="cart.valute"
                      :cart="true"
                    />
                  </td>
                  <td class="del-pos del-td">
                    <div
                      class="del-cart p-14 bold"
                      @click="store.removeItem(cart.id)"
                    >
                      Удалить
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="p-18" v-else>Корзина пуста...</p>
            <div
              class="cart-total a-class"
              v-if="store.cart.length !== 0"
              v-animate="'a-fade-in'"
            >
              <div class="total-text p-18">Общая стоимость:</div>
              <div class="total-price">
                <PriceComp
                  :price="store.total"
                  :valute="global?.settings?.current_valute"
                />
              </div>
              <button @click="show = true" class="buttons primary">
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      </div>
    </q-no-ssr>
    <q-dialog
      v-model="show"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <div class="content-modal">
        <h5>Оформление заказа</h5>
        <form @submit.prevent="sendData" v-if="!success">
          <div class="form-group">
            <input
              type="text"
              v-model="modalData.name"
              placeholder="Ваше ФИО"
            />
            <div class="help-block" v-if="errors.name">{{ errors.name }}</div>
          </div>
          <div class="form-group">
            <input type="text" v-model="modalData.email" placeholder="Email" />
            <div class="help-block" v-if="errors.email">{{ errors.email }}</div>
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="modalData.phone"
              placeholder="Номер телефона"
              @input="phoneCheck"
            />
            <div class="help-block" v-if="errors.phone">{{ errors.phone }}</div>
          </div>
          <div class="row">
            <button type="button" @click="show = false" class="buttons">
              Отмена
            </button>
            <button class="buttons primary">Оформить заказ</button>
          </div>
        </form>
        <p v-if="success">Заказ успешно оформлен</p>
        <button v-if="success" @click="show = false" class="buttons primary">
          Закрыть
        </button>
      </div>
    </q-dialog>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CartPage',
}
</script>

<style lang="scss" scoped>
.content-modal {
  background: $white;
  padding: 15px;
  form {
    width: 100%;
    .form-group {
      margin-bottom: 15px;
    }
  }
}
.cart-table {
  td {
    &.img {
      width: 84px;
    }
    &.count {
      width: 164px;
    }
    &.vendor {
      width: 150px;
    }
    &.price-td {
      width: 150px;
    }
    &.del-td {
      width: 108px;
    }
  }
  .image {
    height: 64px;
    width: 64px;
    object-fit: cover;
  }
  .del-cart {
    color: $red;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
  }
}

.cart-total {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid $light_grey;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  gap: 20px;
  .total-price {
    font-weight: bold;
    font-size: 32px;
    line-height: 38px;
    color: $black;
  }
}

@media screen and (max-width: 1024px) {
  .cart-total {
    flex-direction: column;
    gap: 15px;
    .total-price {
      margin: 0;
    }
  }
  .cart-table {
    display: flex;
    flex-direction: column;
    thead {
      display: none;
    }
    tr {
      padding: 10px;
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      border: 1px solid #eaeaea;
      border-radius: 10px;
      margin-bottom: 15px;
      .del-pos {
        position: absolute;
        top: 15px;
        right: 12px;
      }
    }
    td {
      padding: unset;
      margin-bottom: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &.name {
        gap: 10px;
        text-align: right;
      }
      &.img {
        width: unset;
        margin-top: 50px;
        align-self: center;
      }
      &.checkbox {
        width: unset;
        position: absolute;
        top: 15px;
        left: 12px;
      }
      &.count {
        width: 100%;
      }
      &.vendor {
        width: 100%;
      }
      &.price-td {
        width: 100%;
      }
      &.del-td {
        width: unset;
      }
      &::before {
        content: attr(data-name);
        display: block;
        font-weight: bold;
        margin-bottom: 3px;
      }
    }
  }
}

@media screen and (max-width: 360px) {
  .cart-table {
    td {
      padding: unset;
      margin-bottom: 10px;
      width: unset;
      display: block;
      text-align: center;
      align-self: center;
      &.name {
        gap: unset;
        text-align: center;
      }
      &.img {
        width: unset;
        margin-top: 50px;
        align-self: center;
      }
      &.checkbox {
        width: unset;
        position: absolute;
        top: 15px;
        left: 12px;
      }
      &.count {
        width: unset;
      }
      &::before {
        content: attr(data-name);
        display: block;
        font-weight: bold;
        margin-bottom: 3px;
      }
    }
  }
  .cart-total {
    text-align: center;
    .total-price {
      font-size: 25px;
    }
    .buttons.primary {
      font-size: 16px;
    }
  }
}
</style>
