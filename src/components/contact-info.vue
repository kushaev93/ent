<script lang="ts" setup>
defineProps({
  componentData: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section>
    <!-- <div class="contact-block">
      <h5>Контактная информация</h5>
      <ul>
        <li>
          <b>{{ componentData.settings.company_name }}</b>
        </li>
        <li><b>Адрес:</b> {{ componentData.settings.company_address }}</li>
        <li><b>Email:</b> {{ componentData.settings.email }}</li>
        <li>
          <b>Телефоны в офисе:</b>
          <span
            v-for="(phone, i) in componentData.settings.company_phones"
            :key="i"
          >
            {{ phone }};&nbsp;
          </span>
        </li>
        <li v-if="componentData.settings.socials.vk.length">
          <b>VK:</b> {{ componentData.settings.socials.vk }}
        </li>
        <li v-if="componentData.settings.socials.telegram.length">
          <b>Telegram:</b> {{ componentData.settings.socials.telegram }}
        </li>
        <li v-if="componentData.settings.socials.whatsapp.length">
          <b>WhatsApp:</b> {{ componentData.settings.socials.whatsapp }}
        </li>
      </ul>
    </div> -->

    <q-card class="my-card contact-block">
      <q-card-section horizontal>
        <img
          width="400px"
          height="400px"
          src="https://admin.ent-trading.com//uploads/files/636e03f830c77.svg"
        />

        <q-card-section class="card-section">
          <p class="title-contact">{{ componentData.settings.company_name }}</p>
          <p>{{ componentData.settings.company_address }}</p>
          <p>{{ componentData.settings.email }}</p>
          <p>+821080991299</p>
        </q-card-section>
      </q-card-section>
    </q-card>
  </section>
</template>

<script lang="ts">
export default {
  name: 'ContactInfoComponent',
}
</script>

<style lang="scss" scoped>
.contact-block {
  padding: 55px 70px;
  margin-bottom: 50px;
  color: gray;
}

.title-contact {
  font-size: 2em;
  font-weight: 500;
}
.card-section {
  margin: auto;
  padding: 55px;
  text-align: center;
  font-size: 1em;
}
</style>
