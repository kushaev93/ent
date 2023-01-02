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
console.log(items.data.items)
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
                  label="Скачать полный Прайс-лист"
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

            <!-- Test Start -->
            <div>
              <a href="https://wa.me/+821080991299">
                <q-btn
                  class="btn-order"
                  :ripple="{ center: true }"
                  label="Оформить заказ"
                  no-caps
                />
              </a>
            </div>
            <table class="people">
              <thead>
                <tr class="type-tr">
                  <th>Фото</th>
                  <th>Название</th>
                  <th class="xs-d-none">Минимальный заказ:</th>
                  <th>Цена</th>
                  <th class="xs-d-none">Бренд</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="product in items.data.items"
                  :to="`/catalog/${
                    product.category_url ? product.category_url : 'static'
                  }/${product.url}`"
                  :key="product.id"
                >
                  <td>
                    <ImageComp
                      class="image"
                      :image="product.imageFile"
                      :alt="product.name"
                      :thumb="true"
                    />
                  </td>
                  <td>{{ product.name }}</td>
                  <td class="xs-d-none">
                    <div class="text-caption text-grey">
                      Минимальный заказ: 1 Коробка
                    </div>
                  </td>
                  <td>
                    <PriceComp
                      :price="product.price"
                      :optPrice="product?.opt_price"
                      :valute="product.valute"
                    />
                  </td>
                  <td class="xs-d-none">
                    <p class="education">{{ product.category_name }}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Test End -->

            <!-- <div class="products">
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
            </div> -->

            <Pagination :pages="pages" :route="route" />
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<style>
.q-pa-md {
  width: 100%;
  padding: 10px 0px;
  margin: 20px 0px;
}

.my-sticky-column-table {
}

/* specifying max-width so the example can
    highlight the sticky column on any browser window */

thead tr:first-child th:first-child {
  background-color: #fff;
}
/* bg color is important for th; just specify one */

td:first-child {
  background-color: #f5f5dc;
}

tr:first-child th:first-child {
  position: sticky;
  left: 0;
  z-index: 1;
}
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

.btn-order {
  background: #5a71d4;
  width: 100%;
  margin: 20px 0px;
  color: #fff;
  font-weight: 600;
}

/* Test Start */

* {
  box-sizing: border-box;
}
table {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-collapse: collapse;
}
tr {
  font-size: 14px;
  border: 1px solid #ddd;
}
tr:hover {
  background-color: #f3f3f3;
}
th {
  background-color: #f3f3f3;
  color: #a0a0a0;
  font-size: 15px;
  padding: 10px;
  text-align: left;
}
td {
  padding: 0 10px;
}
td img {
  border-radius: 50%;
  width: 100px;
  padding: 10px;
}
.education,
.beauty,
.food,
.tech {
  display: inline;
  color: #373737;
  border-radius: 4px;
  padding: 6px 8px;
}
.education {
  background-color: #93dbde;
}
.tech {
  background-color: #f49553;
}
.beauty {
  background-color: #c395f1;
}
.food {
  background-color: #95f1a3;
}

@media (max-width: 600px) {
  .xs-d-none {
    display: none;
  }
}
</style>

<script lang="ts">
export default {
  name: 'CategoryPage',
}
</script>
