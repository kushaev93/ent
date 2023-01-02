<script setup lang="ts">
import { useNav } from 'stores/navigation'
import { useForm } from 'stores/forms'
import { ref } from 'vue'

const now = new Date()
const nav = useNav()

defineProps({
  componentData: {
    type: Object,
  },
})

const form = useForm()

const model = ref({
  email: '',
})

const success = ref(false)

async function sendData(model) {
  /////// Решить с формой
  console.log(model.value)
  if (model.value) {
    console.log(1)
    await form.sendForm(model.value).then((response) => {
      if (response) {
        success.value = true
      }
    })
  }
}
</script>

<template>
  <div class="footer">
    <q-page-sticky position="bottom-right" :offset="[25, 25]">
      <a style="text-decoration: none" href="https://wa.me/+821080991299"
        ><q-btn fab icon="phone" color="green"
      /></a>
    </q-page-sticky>
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-sm-6 col-xs-12">
          <div class="single_footer">
            <h4>Навигация по сайту</h4>
            <ul>
              <li v-for="link in nav.footer" :key="link.id">
                <router-link :to="link.url">{{ link.name }}</router-link>
              </li>
            </ul>
          </div>
        </div>

        <!--- END COL -->
        <div class="col-md-6 col-sm-6 col-xs-12">
          <div class="single_footer single_footer_address">
            <h4>Подпишитесь на обновления</h4>
            <div class="signup_form">
              <form @submit.prevent="sendData" class="subscribe">
                <input
                  v-model="model.email"
                  type="text"
                  class="subscribe__input"
                  placeholder="Введите Email"
                />
                <button type="submit" class="subscribe__btn">
                  Подписаться
                </button>
              </form>
            </div>
          </div>

          <div class="Contact">
            <ul>
              <li>Телефон : +821080991299</li>
              <li>Email : ent.trading11@gmail.com</li>
              <li>
                Адресс : Hongdae Station Branch 151, Yanghwa-ro, Mapo-gu, Seoul,
                03995, Korea
              </li>
            </ul>
          </div>
        </div>
        <!--- END COL -->
      </div>
      <!--- END ROW -->
      <div class="row">
        <div class="col-lg-12 col-sm-12 col-xs-12">
          <p class="copyright">
            {{ nav.settings?.company_name }}
            <span> {{ now.getFullYear() }}</span> <a href="#"></a>.
          </p>
        </div>
        <!--- END COL -->
      </div>
      <!--- END ROW -->
    </div>
    <!--- END CONTAINER -->
  </div>
</template>

<style lang="scss">
h1,
h2,
h3,
h4,
h5,
h6 {
}
a,
a:hover,
a:focus,
a:active {
  text-decoration: none;
  outline: none;
}

.Contact {
  ul {
    margin: 50px 0px;
  }
  li {
    color: #fff;
    -webkit-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
    line-height: 36px;
    font-size: 15px;
    text-transform: capitalize;
  }
}

a,
a:active,
a:focus {
  color: #333;
  text-decoration: none;
  transition-timing-function: ease-in-out;
  -ms-transition-timing-function: ease-in-out;
  -moz-transition-timing-function: ease-in-out;
  -webkit-transition-timing-function: ease-in-out;
  -o-transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
  -ms-transition-duration: 0.2s;
  -moz-transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s;
  -o-transition-duration: 0.2s;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
img {
  max-width: 100%;
  height: auto;
}
section {
  padding: 60px 0;
  /* min-height: 100vh;*/
}
.footer {
  background: linear-gradient(105deg, #6e99e6, #093c94);
  padding-top: 80px;
  padding-bottom: 40px;
}
/*END FOOTER SOCIAL DESIGN*/
.single_footer {
}
@media only screen and (max-width: 768px) {
  .single_footer {
    margin-bottom: 30px;
  }
}
.single_footer h4 {
  color: #fff;
  margin-top: 0;
  margin-bottom: 25px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
}
.single_footer h4::after {
  content: '';
  display: block;
  height: 2px;
  width: 40px;
  background: #fff;
  margin-top: 20px;
}
.single_footer p {
  color: #fff;
}
.single_footer ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.single_footer ul li {
}
.single_footer ul li a {
  color: #fff;
  -webkit-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  line-height: 36px;
  font-size: 15px;
  text-transform: capitalize;
}
.single_footer ul li a:hover {
  color: #ff3666;
}

.single_footer_address {
}
.single_footer_address ul {
}
.single_footer_address ul li {
  color: #fff;
}
.single_footer_address ul li span {
  font-weight: 400;
  color: #fff;
  line-height: 28px;
}
.contact_social ul {
  list-style: outside none none;
  margin: 0;
  padding: 0;
}

/*START NEWSLETTER CSS*/
.subscribe {
  display: block;
  position: relative;
  margin-top: 15px;
  width: 100%;
}
.subscribe__input {
  background-color: #fff;
  border: medium none;
  border-radius: 5px;
  color: #333;
  display: block;
  font-size: 15px;
  font-weight: 500;
  height: 60px;
  letter-spacing: 0.4px;
  margin: 0;
  padding: 0 150px 0 20px;
  text-align: left;
  text-transform: capitalize;
  width: 100%;
}
@media only screen and (max-width: 768px) {
  .subscribe__input {
    padding: 0 50px 0 20px;
  }
}

.subscribe__btn {
  background-color: #01c7e9;
  color: #fff;
  cursor: pointer;
  display: block;
  font-size: 20px;
  height: 50px;
  position: absolute;
  right: 0;
  top: 0;
  width: 160px;
}

@media only screen and (max-width: 768px) {
  .subscribe__btn {
    right: 0px;
  }
}

.subscribe__btn:hover i {
  color: #ff3666;
}
button {
  padding: 0;
  border: none;
  background-color: transparent;
  -webkit-border-radius: 0;
  border-radius: 0;
}
/*END NEWSLETTER CSS*/

/*START SOCIAL PROFILE CSS*/
.social_profile {
  margin-top: 40px;
}
.social_profile ul {
  list-style: outside none none;
  margin: 0;
  padding: 0;
}
.social_profile ul li {
  float: left;
}
.social_profile ul li a {
  text-align: center;
  border: 0px;
  text-transform: uppercase;
  transition: all 0.3s ease 0s;
  margin: 0px 5px;
  font-size: 18px;
  color: #fff;
  border-radius: 30px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  display: block;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
@media only screen and (max-width: 768px) {
  .social_profile ul li a {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
@media only screen and (max-width: 480px) {
  .social_profile ul li a {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
}
.social_profile ul li a:hover {
  background: #ff3666;
  border: 1px solid #ff3666;
  color: #fff;
  border: 0px;
}
/*END SOCIAL PROFILE CSS*/
.copyright {
  margin-top: 70px;
  padding-top: 40px;
  color: #fff;
  font-size: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  text-align: center;
}
.copyright a {
  color: #01c7e9;
  transition: all 0.2s ease 0s;
}
.copyright a:hover {
  color: #ff3666;
}
</style>
