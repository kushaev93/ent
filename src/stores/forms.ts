import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useForm = defineStore('useForm', () => {
  async function sendForm(data: Record<string, unknown>): Promise<boolean> {
    const request = await api
      .get(`/form/feedback/${JSON.stringify(data)}`)
      .then((response) => {
        if (response.data) {
          return true
        }
        return false
      })
    return request
  }

  async function sendOrder(data: Record<string, unknown>): Promise<boolean> {
    const request = await api
      .get(`/form/order/${JSON.stringify(data)}`)
      .then((response) => {
        if (response.data) {
          return true
        }
        return false
      })
    return request
  }

  return { sendOrder, sendForm }
})
