import { defineStore } from 'pinia'
import { ICartItem } from './models'
import { ref, computed } from 'vue'
import { Notify } from 'quasar'

export const useCart = defineStore('useCart', () => {
  const cart = ref<Array<ICartItem>>([])
  const total = computed<number>(() => {
    let totalValue = 0
    for (let i = 0; i < cart.value.length; i++) {
      totalValue =
        totalValue + Number(cart.value[i].price) * Number(cart.value[i].count)
    }
    return totalValue
  })

  async function addItem(item: ICartItem): Promise<void> {
    let message = ''
    if (cart.value.find((product: ICartItem) => product.id === item.id)) {
      message = 'Товар уже в корзине'
    } else {
      message = 'Добавлено'
      cart.value.push(item)
    }
    Notify.create({
      message: message,
      timeout: 2000,
      position: 'top-right',
      color: 'purple',
    })
  }

  async function removeItem(id: number): Promise<void> {
    cart.value = cart.value.filter((product: ICartItem) => product.id !== id)
  }

  async function enterCount(id: number, count: string): Promise<void> {
    for (let i = 0; i < cart.value.length; i++) {
      if (cart.value[i].id === id) {
        cart.value[i].count = Number(count)
      }
    }
  }

  async function plusCart(id: number): Promise<void> {
    for (let i = 0; i < cart.value.length; i++) {
      if (cart.value[i].id === id) {
        cart.value[i].count++
        Notify.create({
          message: 'Добавлено',
          color: 'purple',
          position: 'top-right',
          timeout: 2000,
        })
      }
    }
  }

  async function minusCart(id: number): Promise<void> {
    for (let i = 0; i < cart.value.length; i++) {
      if (cart.value[i].id === id && cart.value[i].count > 1) {
        cart.value[i].count--
      }
    }
  }

  async function clearCart() {
    cart.value = []
  }

  return {
    cart,
    total,
    addItem,
    removeItem,
    minusCart,
    plusCart,
    enterCount,
    clearCart,
  }
})
