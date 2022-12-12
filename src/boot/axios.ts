/* eslint-disable vue/multi-word-component-names */
import { boot } from 'quasar/wrappers'
import { Cookies } from 'quasar'
import lazyPlugin from 'vue3-lazyload'
import Image from 'components/widgets/Image.vue'
import Price from 'components/widgets/Price.vue'
import Slider from 'components/Slider.vue'
import Accordion from 'components/accordion.vue'
import Carousel from 'components/carousel.vue'
import ContactInfo from 'components/contact-info.vue'
import Delimiter from 'components/delimiter.vue'
import Features from 'components/features.vue'
import Gallery from 'components/gallery.vue'
import ImageText from 'components/image-text.vue'
import SimpleText from 'components/simple-text.vue'
import Form from 'components/form-feedback.vue'
import Articles from 'components/articles-full.vue'
import TablePrice from 'components/TablePrice.vue'
import CardText from 'components/CardText.vue'
import ButtonComponent from 'components/Button.vue'
import HeadingImage from 'components/HeadingImage.vue'
import MarkedListCard from 'components/MarkedListCard.vue'
import LastItems from 'components/LastItems.vue'
import CategoriesList from 'components/Categories.vue'
import axios, { AxiosInstance } from 'axios'
import { usePage } from 'stores/page'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

const api = axios.create({
  baseURL: 'https://admin.ent-trading.com/api',
  validateStatus: (status) => status < 500,
})

const animation = {
  beforeMount: (el: HTMLElement, binding: { value: string }) => {
    const animation_name = binding.value
    const callback = (entries: Array<IntersectionObserverEntry>) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('a-class')
          entry.target.classList.add(animation_name)
        }
      })
    }
    const options = {}
    const animationObserver = new IntersectionObserver(callback, options)
    animationObserver.observe(el)
  },
}

let cookies: Cookies

export default boot(({ app, ssrContext, store }) => {
  cookies = ssrContext ? Cookies.parseSSR(ssrContext) : Cookies
  app.use(lazyPlugin)
  app.directive('animate', animation)
  app.directive('outside', {
    mounted(el, binding, vnode: unknown) {
      const vm = vnode as { context: unknown }
      const callback = binding.value
      let nextTick = false
      setTimeout(() => {
        nextTick = true
      }, 0)
      el.clickOutsideEvent = (event: Event) => {
        if (
          !(el === event.target || el.contains(event.target)) &&
          callback &&
          nextTick &&
          typeof callback === 'function'
        ) {
          return callback.call(vm.context, event)
        }
        return false
      }
      document.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el) {
      document.removeEventListener('click', el.clickOutsideEvent)
    },
  })
  app.component('ImageComp', Image)
  app.component('PriceComp', Price)
  app.component('slider', Slider)
  app.component('accordion', Accordion)
  app.component('carousel', Carousel)
  app.component('contact-info', ContactInfo)
  app.component('delimiter', Delimiter)
  app.component('features', Features)
  app.component('gallery', Gallery)
  app.component('image-text', ImageText)
  app.component('simple-text', SimpleText)
  app.component('form-feedback', Form)
  app.component('tables', TablePrice)
  app.component('articles-full', Articles)
  app.component('card-text', CardText)
  app.component('button-component', ButtonComponent)
  app.component('heading-image', HeadingImage)
  app.component('marked-list', MarkedListCard)
  app.component('last-items', LastItems)
  app.component('categories-list', CategoriesList)

  api.interceptors.response.use((response) => {
    if (response.status > 403) {
      if (ssrContext) {
        ssrContext.res.status(response.status)
      }
      const error = usePage(store)
      error.setError()
    }
    return response
  })
})

export { api, cookies }
