import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'
import { Category, CategoryChild } from './models'

export const useCategory = defineStore('useCategory', () => {
  const categories = ref<Array<Category>>([])
  const subCategories = ref<Record<string, Array<CategoryChild>>>({})

  async function getRootCategories(): Promise<void> {
    if (!categories.value?.length) {
      await api.get('/category').then((response) => {
        categories.value = response.data
      })
    }
  }

  async function getSubCategories(slug: string) {
    if (!subCategories.value[slug]) {
      await api.get(`/category-children/${slug}`).then((response) => {
        subCategories.value[slug] = response.data
      })
    }
  }

  return {
    categories,
    subCategories,
    getRootCategories,
    getSubCategories,
  }
})
