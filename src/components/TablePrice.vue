<script setup lang="ts">
import { ref, computed } from 'vue'
import { useValidate } from 'src/composables/validate'
import { useForm } from 'stores/forms'
import { cookies } from 'boot/axios'

const props = defineProps({
  componentData: {
    type: Object,
    required: true,
  },
})

console.log(props)

const isLogged = ref(cookies.has('isLogged') ? true : false)
const form = useForm()
const show = ref(false)
const rememberedUrl = ref<string | null>(null)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modalData = ref<Record<string, any>>({
  name: '',
  email: '',
  phone: '',
  message: 'Форма с таблицы',
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

const download = (url: string) => {
  if (isLogged.value) {
    window.location.href = url
    console.log(url)
  } else {
    show.value = true
    rememberedUrl.value = url
    console.log(url)
  }
}

const filter = ref('')
type align = 'left' | 'right' | 'center'
const columns = [
  {
    name: 'brand',
    align: 'left' as align,
    label: 'Брэнд',
    field: 'brand',
    sortable: true,
  },
  // {
  //   name: 'moa',
  //   align: 'left' as align,
  //   label: 'pgpgpg',
  //   field: 'moa',
  //   sortable: true,
  // },
  // {
  //   name: 'percent_300',
  //   label: '$300+',
  //   field: 'percent_300',
  //   sortable: true,
  //   align: 'center' as align,
  // },
  // {
  //   name: 'percent_500',
  //   label: '$500+',
  //   field: 'percent_500',
  //   sortable: true,
  //   align: 'center' as align,
  // },
  // {
  //   name: 'percent_1000',
  //   label: '$1000+',
  //   field: 'percent_1000',
  //   sortable: true,
  //   align: 'center' as align,
  // },
  // {
  //   name: 'percent_2000',
  //   label: '$2000+',
  //   field: 'percent_2000',
  //   sortable: true,
  //   align: 'center' as align,
  // },
  // {
  //   name: 'percent_5000',
  //   label: '$5000+',
  //   field: 'percent_5000',
  //   sortable: true,
  //   align: 'center' as align,
  // },
  {
    name: 'category',
    label: 'Категория',
    field: 'category',
    sortable: true,
    align: 'right' as align,
    format: (val: { name: unknown }) => val.name,
  },
]

const rows = computed(() => props.componentData.settings.items)
</script>

<template>
  <q-no-ssr>
    <q-table
      class="list show-list"
      title="Прайс-листы"
      :rows="rows"
      :columns="columns"
      color="primary"
      row-key="name"
      :pagination="{ rowsPerPage: 20 }"
      :filter="filter"
      :grid="$q.screen.xs"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Поиск Бренда"
        >
        </q-input>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th> Скачать прайс </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <div class="row icon left">
              <div @click="download(props.row.file.url)">
                <q-icon size="35px" color="green" name="cloud_download" />
              </div>
            </div>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
        >
          <q-card style="padding: 15px 7px">
            <q-list dense>
              <q-item v-for="col in props.cols" :key="col.name">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Скачать прайс</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>
                    <div @click="download(props.row.file.url)">
                      <q-icon name="cloud_download" />
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>

    <q-dialog
      v-model="show"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <div class="content-modal">
        <form class="search-form" @submit.prevent="submit">
          <div class="form-group">
            <input type="text" v-model="modalData.name" placeholder="Имя" />
            <div class="help-block" v-if="errors.name">{{ errors.name }}</div>
          </div>
          <div class="form-group">
            <input type="text" v-model="modalData.email" placeholder="Email" />
            <div class="help-block" v-if="errors.email">{{ errors.email }}</div>
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="modalData.phone"
              placeholder="Номер телефона"
            />
            <div class="help-block" v-if="errors.phone">{{ errors.phone }}</div>
          </div>
          <button type="button" @click="show = false" class="buttons">
            Отмена
          </button>
          <button type="submit" class="buttons primary">Отправить</button>
        </form>
      </div>
    </q-dialog>
  </q-no-ssr>
</template>

<script lang="ts">
export default {
  name: 'PriceTableComponent',
}
</script>

<style lang="scss" scoped>
.content-modal {
  background: $white;
  padding: 15px;
  form {
    width: 100%;
    .form-group {
      margin-bottom: 15px;
    }
  }
}
i {
  font-size: 24px;
  color: #a5a5a5;
  cursor: pointer;
}

i:hover {
  color: $main;
}

.q-table th.sortable {
  font-size: 16px;
}

.q-table tbody td {
  font-size: 14px;
}

.q-table--no-wrap th,
.q-table--no-wrap td {
  font-size: 16px;
}

.row.icon.left {
  display: flex;
  justify-content: center;
}

.q-table__top {
  padding: 12px 16px;
  width: 100%;
  height: 300px;
}

@media screen and (max-width: 1200px) {
  .q-table th.sortable {
    font-size: 14px;
  }

  .q-table tbody td {
    font-size: 12px;
  }

  .q-table--no-wrap th,
  .q-table--no-wrap td {
    font-size: 14px;
  }

  .q-table__container .q-table__top {
    padding: 12px 4px;
  }
  .text-caption {
    font-size: 1.1rem;
    color: grey;
  }
  .q-icon {
    color: green;
    font-size: 1.1rem;
  }
}
</style>
