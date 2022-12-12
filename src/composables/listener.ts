import { onMounted, onUnmounted } from 'vue'

export function useEventListener(
  event:string,
  // eslint-disable-next-line no-undef
  callback: EventListener | EventListenerObject,
  target = null,
) {
  onMounted(() => {
    let el: Window | Document | HTMLElement = window
    if (target) {
      el = target
    }
    el.addEventListener(event, callback)
  })
  onUnmounted(() => {
    let el: Window | Document | HTMLElement = window
    if (target) {
      el = target
    }
    el.removeEventListener(event, callback)
  })
}
