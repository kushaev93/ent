<script lang="ts" setup>
import { useNav } from 'stores/navigation'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
// import { useCart } from 'stores/cart'

const nav = useNav()
// const cart = useCart()
const menu = computed(() => nav.header)
const mobile = ref(false)
const router = useRouter()
const search = ref<string>('')
const show = ref(false)

router.beforeEach(() => {
  mobile.value = false
})

//Search function

// function submit() {
//   if (search.value.length) {
//     router.push(
//       `/search?search=${search.value.replace(
//         /[`~!@#$%^&()|+\=?;'",.<>\{\}\[\]\\\/]/gi,
//         ''
//       )}`
//     )
//     show.value = false
//   }
// }
</script>

<template>
  <div class="main-menu" v-bind:class="{ active: mobile }">
    <div class="container flex-row align-center j-around">
      <q-btn
        class="show-menu"
        dense
        flat
        round
        icon="menu"
        @click="mobile = !mobile"
      />
      <router-link to="/" class="logo-text">
        <img :src="nav.settings?.logo.url" alt="Логотип" />
      </router-link>

      <!-- Search Start -->
      <!-- <div class="search">
        <form class="search-form" @submit.prevent="submit">
          <input type="text" v-model.trim="search" placeholder="Поиск" />
          <button type="submit">
            <img
              src="/static_images/icons/search.svg"
              width="32"
              height="32"
              alt="Поиск"
            />
          </button>
        </form>
      </div> -->

      <!-- Search End -->
      <nav>
        <ul>
          <li v-for="el of menu" :key="el.id" class="hide-hd">
            <router-link :to="el.url">{{ el.name }}</router-link>
          </li>
          <li class="show-xs">
            <a href="#" @click="show = true" class="btn-icons"
              ><img
                src="/static_images/icons/search_icon.svg"
                width="25"
                height="25"
                alt="Поиск"
            /></a>
          </li>

          <!-- Cart Start-->
          <!-- <li>
            <router-link id="shop-cart" to="/cart" class="btn-icons">
              <img
                src="/static_images/icons/bag.svg"
                width="25"
                height="25"
                alt="Корзина"
              />
              <div class="cart-count">{{ cart.cart.length }}</div>
            </router-link>
          </li> -->
          <!-- Cart End-->
        </ul>
      </nav>
    </div>
  </div>
  <div class="mobile-menu" v-show="mobile">
    <div class="container">
      <ul>
        <li>
          <router-link to="/">Главная</router-link>
        </li>
        <li v-for="el of menu" :key="el.id">
          <router-link :to="el.url">{{ el.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>

  <q-dialog
    v-model="show"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div class="content-modal">
      <!-- <form class="search-form" @submit.prevent="submit">
        <input type="text" v-model.trim="search" placeholder="Поиск" />
        <button type="submit" class="buttons white">
          <img
            src="/static_images/icons/search.svg"
            width="32"
            height="32"
            alt="Поиск"
          />
        </button>
      </form> -->
    </div>
  </q-dialog>
</template>

<script lang="ts">
export default {
  name: 'HeaderComponent',
}
</script>

<style lang="scss" scoped>
.content-modal {
  background: $white;
  padding: 15px;
  .buttons {
    margin-top: 15px;
  }
}
.header {
  .j-around {
    justify-content: space-between; ////
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  a {
    font-size: 16px;
    color: $main;
    text-decoration: none;
    gap: 5px;
  }
  .main-menu {
    padding: 10px 0;
    .flex-row {
      gap: 20px;
    }
    .menu-catalog {
      width: 280px;
      gap: 10px;
      user-select: none;
      padding: 7px 20px;
    }
    .logo-text img {
      height: 45px;
    }
    // .search {
    //   flex: 1;
    //   .search-form {
    //     position: relative;
    //     display: flex; //
    //     align-items: center;
    //     input {
    //       border: 1px solid $main;
    //     }
    //     button[type='submit'] {
    //       position: absolute;
    //       right: 16px;
    //       border: none;
    //       background: none;
    //     }
    //   }
    // }
    nav {
      ul {
        gap: 20px;
        padding-left: 20px;
        .show-xs {
          display: none;
        }
        a {
          color: $black;
          display: flex;
          align-items: center;
          transition: all 0.3s;
          position: relative;
          &.router-link-exact-active {
            opacity: 0.8;
            color: $main;
          }
          &:hover {
            opacity: 0.8;
            color: $main;
          }
          .cart-count {
            width: 14px;
            height: 14px;
            position: absolute;
            z-index: 9;
            background: $main;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 10px;
            font-weight: 700;
            top: -1px;
            left: 18px;
          }
        }
      }
    }
  }
}

.mobile-menu {
  padding: 20px 0 10px;
  animation: slide-in 0.3s ease-in 1;
  background: #f9f8f8;
  position: absolute;
  width: 100%;
  left: 0;
  top: 70px;
  z-index: 999;
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    li {
      width: 100%;
      a {
        height: 46px;
        display: flex;
        font-size: 16px;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 3px;
        background: #fff;
        border: 1px solid #eaeaea;
        padding: 0 10px;
        color: $black;
        cursor: pointer;
      }
    }
    &.contact-nav-mobile {
      a {
        background: transparent;
        color: $main;
        border: none;
      }
      .social {
        padding: 0 10px;
        gap: 10px;
        height: 46px;
        align-items: center;
        a {
          padding: 0;
          height: unset;
        }
      }
    }
  }
}

.show-menu {
  display: none;
  cursor: pointer;
  user-select: none;
}

@keyframes slide-in {
  0% {
    max-height: 0px;
  }
  10% {
    max-height: 65px;
  }
  20% {
    max-height: 130px;
  }
  30% {
    max-height: 195px;
  }
  40% {
    max-height: 260px;
  }
  50% {
    max-height: 325px;
  }
  60% {
    max-height: 390px;
  }
  70% {
    max-height: 455px;
  }
  80% {
    max-height: 520px;
  }
  90% {
    max-height: 585px;
  }
  100% {
    max-height: 592px;
  }
}

@keyframes from-top {
  0% {
    top: -200px;
  }
  100% {
    top: 0;
  }
}

@media screen and (max-width: 1280px) {
  .header {
    a {
      font-size: 14px;
    }
    .top-header .right-side ul li {
      font-size: 14px;
    }
    .main-menu {
      .btn-icons img {
        max-height: 20px;
      }
    }
  }
  .show-menu {
    display: flex;
    color: $main;
    font-size: 17px;
  }
}

@media screen and (max-width: 1024px) {
  .header .main-menu .menu-catalog {
    width: 215px;
  }
}

@media screen and (max-width: 768px) {
  .header .main-menu {
    nav {
      ul {
        gap: 10px;
        padding-left: 10px;
      }
      .btn-icons {
        img {
          max-height: 32px;
        }
        span {
          display: none;
        }
      }
    }
    .logo-text img {
      height: 35px;
    }
  }
  .header .top-header .right-side ul li .column-el .el-desc {
    width: 100%;
    text-align: right;
  }
}

@media screen and (max-width: 600px) {
  .header .top-header .left-side ul .label {
    display: none;
  }
}

@media screen and (max-width: 576px) {
  .header .main-menu {
    .menu-catalog {
      width: 170px;
    }
    nav {
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }
    .search {
      display: none;
    }
  }
  .header .main-menu nav ul .show-xs {
    display: block;
  }
  .header .mobile-menu {
    top: 60px;
  }
}

@media screen and (max-width: 440px) {
  .hide-xxs {
    display: none !important;
  }
  .header .main-menu {
    .logo-text img {
      height: 30px;
    }
  }
  .show-menu {
    font-size: 15px;
  }
  .header .mobile-menu {
    top: 57px;
  }
}

@media screen and (max-width: 375px) {
  .header .main-menu .menu-catalog {
    width: 160px;
  }
}

@media screen and (max-width: 360px) {
  .header .main-menu .menu-catalog {
    display: none;
  }
  .mobile-menu {
    top: 110px;
  }
  .header .main-menu {
    .logo-text img {
      height: 25px;
    }
  }
}
</style>
