import { PiniaPluginContext, PiniaCustomStateProperties } from 'pinia'
import { LocalStorage } from 'quasar'
import { onMounted } from 'vue'

const serializer = {
  serialize: JSON.stringify,
  deserialize: JSON.parse,
}

const storage = {
  getItem: () => {
    return LocalStorage.getItem('persistedState') as string
  },
  setItem: (value: unknown) => {
    LocalStorage.set('persistedState', value)
  },
}

const persistedStores = {
  useCart: true,
}

export function persistedPlugin({ store }: PiniaPluginContext) {
  if (process.env.CLIENT) {
    onMounted(() => {
      const fromStorage: PiniaCustomStateProperties = serializer.deserialize(
        storage.getItem()
      )
      store.$patch(fromStorage)
      store.$subscribe((mutation, state) => {
        if (mutation.storeId in persistedStores) {
          storage.setItem(JSON.stringify(state))
          console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`)
        }
      })
    })
  }
}
