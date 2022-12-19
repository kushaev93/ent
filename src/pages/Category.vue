<script setup lang="ts">
import { useRoute } from 'vue-router'
import { api } from 'boot/axios'
import { useMeta } from 'quasar'
import { ref, computed } from 'vue'
import { useForm } from 'stores/forms'
import { useValidate } from 'src/composables/validate'
import { cookies } from 'boot/axios'
import Pagination from 'components/widgets/Pagination.vue'

const route = useRoute()
const perPage = 15
const url = computed(() =>
  route.params.category
    ? `/items-by-category/${route.params.category}?page=${
        route.query.page || 1
      }&per-page=${perPage}`
    : ''
)
const items = await api.get(url.value)
const pages = computed(() =>
  items.data
    ? Math.ceil(Number(items.headers['x-pagination-total-count']) / perPage)
    : 0
)
const metaData = {
  title: items.data.category.meta_title,
  meta: {
    description: {
      name: 'description',
      content: items.data.category.meta_description,
    },
    equiv: {
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=UTF-8',
    },
    tileColor: { name: 'msapplication-TileColor', content: '#da532c' },
    themeColor: { name: 'theme-color', content: '#ffffff' },
  },
  script: {
    metrika: { src: '/scripts/metrika.js', crossOrigin: 'anonymous' },
  },
}

const props = defineProps({
  componentData: {
    type: Object,
    required: true,
  },
})

const isLogged = ref(cookies.has('isLogged') ? true : false)
const form = useForm()
const show = ref(false)
const rememberedUrl = ref<string | null>(null)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modalData = ref<Record<string, any>>({
  name: '',
  email: '',
  phone: '',
  message: 'Скачан прайс лист ' + items.data.category.name,
})
const { errors, validate } = useValidate()
const rules = {
  name: [['required', 'Поле обязательно']],
  email: [
    ['required', 'Поле обязательно'],
    ['email', 'Невалидный email'],
  ],
  phone: [['required', 'Поле обязательно']],
}

async function submit() {
  if (validate(modalData.value, rules)) {
    console.log(modalData.value)
    await form.sendForm(modalData.value).then((response) => {
      if (response) {
        isLogged.value = true
        cookies.set('isLogged', '1')
        show.value = false
        if (rememberedUrl.value) {
          window.location.href = rememberedUrl.value
          rememberedUrl.value = null
        }
      }
    })
  }
}

// const rows = computed(() => props.componentData.settings.items)

const download = (url: string) => {
  let downloadUrl = `https://admin.ent-trading.com//uploads/files/${items.data.category.name}.xlsx`
  if (isLogged.value) {
    window.location.href = downloadUrl
  } else {
    show.value = true
    rememberedUrl.value = downloadUrl

    // console.log(
    //   `https://admin.ent-trading.com//uploads/files/${items.data.category.name}.xlsx`
    // )
    // console.log(items.data)
    // window.location.href = `https://admin.ent-trading.com//uploads/files/${items.data.category.name}.xlsx`
  }
}

useMeta(metaData)
</script>

<template>
  <q-page class="site-content">
    <section class="page">
      <div class="container">
        <div class="page-grid section-pd">
          <div class="sidebar">
            <Sidebar />
          </div>
          <div class="page-content">
            <q-card class="my-card" style="margin: 1rem 0">
              <q-card-section class="text-h6 brand-text" align="center">
                {{ items.data.category.name }}
              </q-card-section>

              <q-card-actions align="center" style="padding: 0">
                <q-btn
                  @click="download(props)"
                  class="btn"
                  :ripple="{ center: true }"
                  label="Скачать Прайс-лист"
                  no-caps
                />
              </q-card-actions>
            </q-card>
            <q-dialog
              v-model="show"
              transition-show="slide-up"
              transition-hide="slide-down"
            >
              <div class="content-modal">
                <form class="search-form" @submit.prevent="submit">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="modalData.name"
                      placeholder="Имя"
                    />
                    <div class="help-block" v-if="errors.name">
                      {{ errors.name }}
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="modalData.email"
                      placeholder="Email"
                    />
                    <div class="help-block" v-if="errors.email">
                      {{ errors.email }}
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="modalData.phone"
                      placeholder="Номер телефона"
                    />
                    <div class="help-block" v-if="errors.phone">
                      {{ errors.phone }}
                    </div>
                  </div>
                  <button type="button" @click="show = false" class="buttons">
                    Отмена
                  </button>
                  <button type="submit" class="buttons primary">
                    Отправить
                  </button>
                </form>
              </div>
            </q-dialog>
            <div class="products">
              <div
                class="product"
                v-for="product in items.data.items"
                :to="`/catalog/${
                  product.category_url ? product.category_url : 'static'
                }/${product.url}`"
                :key="product.id"
              >
                <q-card class="my-card" flat bordered>
                  <q-card-section horizontal>
                    <q-card-section class="q-pt-xs">
                      <div class="text-overline">
                        {{ product.category_name }}
                      </div>
                      <div class="text-subtitle2 q-mt-sm q-mb-xs">
                        {{ product.name }}
                      </div>

                      <div class="price-item">
                        <PriceComp
                          :price="product.price"
                          :optPrice="product?.opt_price"
                          :valute="product.valute"
                        />
                      </div>
                      <div class="text-caption text-grey">
                        Минимальный заказ: 1 Коробка
                      </div>
                      <!--
                      <div class="text-caption text-grey">
                        Для заказа обращайтесь
                        <div>
                          <q-btn
                            style="transform: rotate(30deg); margin: 5px"
                            round
                            color="primary"
                            glossy
                            icon="navigation"
                          />
                          <q-btn round color="green" icon="phone" />
                        </div>
                      </div> -->
                    </q-card-section>

                    <q-card-section class="col-5 flex flex-center">
                      <ImageComp
                        class="image"
                        :image="product.imageFile"
                        :alt="product.name"
                        :thumb="true"
                      />
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </div>
            </div>
            <Pagination :pages="pages" :route="route" />
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<style>
.content-modal {
  background: white;
  padding: 15px;
}
form {
  width: 100%;
}

.tel {
  font-size: 1.2rem;
  font-style: oblique;
  margin: 10px 0px;
}

.products {
  margin: 4rem 0;
}

.form-group {
  margin-bottom: 15px;
}
.brand-text {
  letter-spacing: 0.125em;
  font-weight: 900;
  font-size: 1.5rem;
}
.price-item {
  margin: 0px auto;
  color: grey;
  font-size: 2rem;
  font-weight: 700;
  padding: 42px 0px;
}
.btn {
  color: White;
  background: #2efe2e;
  width: 100%;
  padding: 13px;
  font-weight: 700;
  font-size: 1rem;
}
</style>

<script lang="ts">
export default {
  name: 'CategoryPage',
}
</script>
