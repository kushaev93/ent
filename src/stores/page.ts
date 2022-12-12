import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'
import { IPage } from './models'

export const usePage = defineStore('usePage', () => {
  const pages = ref<Record<string, IPage>>({})
  const error = ref<boolean>(false)

  async function setPage(url: string): Promise<IPage> {
    if (pages.value && !(url in pages.value)) {
      await api.get(url).then((response) => {
        pages.value[url] = response.data as IPage
      })
    }
    return pages.value[url]
  }

  async function setError(): Promise<void> {
    error.value = true
  }

  async function clearError(): Promise<void> {
    error.value = false
  }

  return {
    pages,
    setPage,
    error,
    setError,
    clearError,
  }
})
