<script lang="ts" setup>
import { useForm } from 'stores/forms'
import { ref } from 'vue'
import { useValidate } from 'src/composables/validate'

defineProps({
  componentData: {
    type: Object,
    required: true,
  },
})
const form = useForm()
const success = ref(false)
const { errors, validate } = useValidate()
const model = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
})
const rules = {
  name: [['required', 'Поле обязательно']],
  email: [
    ['required', 'Поле обязательно'],
    ['email', 'Невалидный email'],
  ],
  phone: [
    ['required', 'Поле обязательно'],
    ['phone', 'Неверный формат номера'],
  ],
}

function phoneCheck() {
  const x = model.value.phone
    .replace(/\D/g, '')
    .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/) as RegExpMatchArray
  if (!x[2] && x[1] !== '') {
    model.value.phone = x[1] === '7' ? '+7 (' : `+7 (${x[1]}`
  } else {
    model.value.phone = !x[3]
      ? `+${x[1]} (${x[2]}`
      : `+${x[1]} (${x[2]}) ${x[3]}${x[4] ? `-${x[4]}` : ''}${
          x[5] ? `-${x[5]}` : ''
        }`
  }
}

async function sendData() {
  if (validate(model.value, rules)) {
    await form.sendForm(model.value).then((response) => {
      if (response) {
        success.value = true
      }
    })
  }
}
</script>

<template>
  <section class="form-feedback">
    <div class="row">
      <div class="form">
        <form @submit.prevent="sendData" v-if="!success">
          <h4 class="a-class" v-animate="'a-scale'">
            {{ componentData.settings.title }}
          </h4>
          <div class="form-group" v-bind:class="{ errored: errors.name }">
            <input type="text" v-model="model.name" placeholder="Ваше имя" />
            <div class="help-block" v-if="errors.name">{{ errors.name }}</div>
          </div>
          <div class="form-group" v-bind:class="{ errored: errors.email }">
            <input type="text" v-model="model.email" placeholder="Email" />
            <div class="help-block" v-if="errors.email">
              {{ errors.email }}
            </div>
          </div>
          <div class="form-group" v-bind:class="{ errored: errors.phone }">
            <input
              type="text"
              v-model="model.phone"
              placeholder="Телефон"
              @input="phoneCheck()"
            />
            <div class="help-block" v-if="errors.phone">
              {{ errors.phone }}
            </div>
          </div>
          <div class="form-group">
            <textarea
              type="text"
              v-model="model.message"
              rows="5"
              placeholder="Ваше сообщение"
            />
          </div>
          <button type="submit" class="buttons primary">
            Отправить сообщение
          </button>
        </form>
        <div class="form-success" v-else>
          <h4>Ваше сообщение отправлено</h4>
          {{ componentData.settings.success_message }}
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'FormFeedbackComponent',
}
</script>

<style lang="scss" scoped>
.form-feedback {
  margin-bottom: 30px;

  .form-group {
    margin-bottom: 15px;
  }
  h4 {
    margin-bottom: 30px;
  }
  .row {
    border: 1px solid $light_grey;
    border-radius: 15px;
    padding: 50px;
  }
  .form-success {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .form {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .image {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &::before {
      content: '';
      display: block;
      position: absolute;
      z-index: 3;
      background: url('@/assets/media/images/form.webp');
      opacity: 0.5;
      width: 90%;
      height: 450px;
      margin-left: 30px;
      margin-bottom: 30px;
    }
    img {
      object-fit: cover;
      height: 450px;
      width: 90%;
      position: relative;
      z-index: 5;
    }
  }
}

@media screen and (max-width: 1920px) {
  .form-feedback .image img {
    height: 400px;
    width: 100%;
  }
  .form-feedback .image:before {
    height: 400px;
    width: 100%;
  }
}

@media screen and (max-width: 1280px) {
  .form-feedback .image img {
    height: 300px;
  }
  .form-feedback .image:before {
    height: 300px;
  }
}

@media screen and (max-width: 992px) {
  .form-feedback .image img {
    height: 250px;
  }
  .form-feedback .image:before {
    height: 250px;
  }
}

@media screen and (max-width: 768px) {
  .form-feedback .row.gap-50 {
    flex-direction: column;
    gap: 30px;
  }
  .form-feedback .image img {
    height: 350px;
    width: 100%;
  }
  .form-feedback .image:before {
    height: 100%;
    margin-bottom: 20px;
    margin-left: 20px;
    width: 100%;
  }
}

@media screen and (max-width: 580px) {
  .form-feedback .image img {
    height: 300px;
  }
  .form-feedback {
    .row {
      padding: 15px;
    }
  }
}

@media screen and (max-width: 480px) {
  .form-feedback .image img {
    height: 250px;
  }
}

@media screen and (max-width: 400px) {
  .form-feedback .image img {
    height: 200px;
  }
}
</style>
