import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'
import { NavLink, Settings } from './models'

export const useNav = defineStore('useNav', () => {
  const header = ref<Array<NavLink> | null>(null)
  const settings = ref<Settings | null>(null)
  const footer = ref<Array<NavLink> | null>(null)

  async function getNav(): Promise<void> {
    await api.get('/navigations/get-header').then((response) => {
      header.value = response.data.navbar
      settings.value = response.data.settings
      footer.value = response.data.footer
    })
  }

  return {
    header,
    settings,
    footer,
    getNav,
  }
})
