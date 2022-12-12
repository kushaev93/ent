import { api } from 'boot/axios'
import { ref, Ref, isRef, unref, watchEffect } from 'vue'

export function useAxios(url: Ref<string> | string, method: string) {
  const data = ref<unknown | null>(null)
  const headers = ref<unknown | null>(null)
  const pending = ref<boolean>(false)
  const error = ref<null | string>(null)

  async function doRequest() {
    data.value = null
    pending.value = true
    error.value = null
    if (unref(url) && unref(url).length) {
      if (method == 'post') {
        await api.post(unref(url)).then((response) => {
          data.value = response.data
          headers.value = response.headers
          pending.value = false
        })
      } else {
        await api.get(unref(url)).then((response) => {
          data.value = response.data
          headers.value = response.headers
          pending.value = false
        })
      }
    } else {
      pending.value = false
    }
  }

  if (isRef(url)) {
    watchEffect(doRequest)
  } else {
    doRequest()
  }

  return { data, pending, headers, error }
}
