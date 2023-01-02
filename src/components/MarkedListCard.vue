<script lang="ts" setup>
// import { ref } from 'vue'

defineProps({
  componentData: {
    type: Object,
    required: true,
  },
})

// const step = ref<number>(1)
</script>

<template>
  <!-- <section class="stepper-section">
    <q-stepper v-model="step" vertical color="primary" animated>
      <q-step
        v-for="(item, i) in componentData.settings"
        :key="i"
        :name="Number(i)"
        :title="item.name"
        icon="settings"
        :done="step > Number(i)"
      >
        <div v-html="item.text"></div>
        <q-stepper-navigation>
          <q-btn @click="step = Number(i) + 1" color="primary" label="Далее" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </section> -->

  <section class="we-offer-area text-center bg-gray">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="site-heading text-center">
            <h2>Как сделать<span> заказ ?</span></h2>
            <h4>Очень просто, заказ в 4 шага</h4>
          </div>
        </div>
      </div>
      <div class="our-offer-items less-carousel">
        <!-- Single Item -->
        <div class="col-md-4 col-sm-6 equal-height">
          <div
            class="item"
            v-for="(item, i) in componentData.settings"
            :key="i"
            :title="item.name"
            icon="settings"
          >
            <i class="fa-solid fa-pen-fancy"
              ><img src="../../public/static_images/icons/value-chain.png"
            /></i>
            <h4>{{ item.name }}</h4>
            <div v-html="item.text"></div>
          </div>
        </div>
        <!-- End Single Item -->
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'MarkedListComponent',
}
</script>

<style lang="scss" scoped>
section {
  padding: 60px 0;
  min-height: 100vh;
}
a,
a:hover,
a:focus,
a:active {
  text-decoration: none;
  outline: none;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.bg-gray {
  background-color: #f9f9f9;
}
.item {
  margin: 20px 0px;
}

.site-heading h2 {
  display: block;
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.site-heading h2 span {
  color: #6e99e6;
}

.site-heading h4 {
  display: inline-block;
  padding-bottom: 20px;
  position: relative;
  z-index: 1;
}

.site-heading h4::before {
  background: linear-gradient(105deg, #6e99e6, #093c94);
  bottom: 0;
  content: '';
  height: 2px;
  left: 50%;
  margin-left: -25px;
  position: absolute;
  width: 50px;
}

.site-heading {
  margin-bottom: 60px;
  overflow: hidden;
  margin-top: -5px;
}

.carousel-shadow .owl-stage-outer {
  margin: -15px -15px 0;
  padding: 15px;
}

.we-offer-area .our-offer-carousel .owl-dots .owl-dot span {
  background: #ffffff none repeat scroll 0 0;
  border: 2px solid;
  height: 15px;
  margin: 0 5px;
  width: 15px;
}

.we-offer-area .our-offer-carousel .owl-dots .owl-dot.active span {
  background: linear-gradient(105deg, #6e99e6, #093c94);
  border-color: #6e99e6;
}

.we-offer-area .item {
  background: #ffffff none repeat scroll 0 0;
  border-left: 2px solid #6e99e6;
  -moz-box-shadow: 0 0 10px #cccccc;
  -webkit-box-shadow: 0 0 10px #cccccc;
  -o-box-shadow: 0 0 10px #cccccc;
  box-shadow: 0 0 10px #cccccc;
  overflow: hidden;
  padding: 30px;
  position: relative;
  z-index: 1;
}

.we-offer-area.text-center .item {
  background: #ffffff none repeat scroll 0 0;
  border: medium none;
  padding: 67px 40px 64px;
}

.we-offer-area.text-center .item i {
  background: linear-gradient(105deg, #6e99e6, #093c94);
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  color: #ffffff;
  font-size: 40px;
  height: 80px;
  line-height: 80px;
  position: relative;
  text-align: center;
  width: 80px;
  z-index: 1;
  transition: all 0.35s ease-in-out;
  -webkit-transition: all 0.35s ease-in-out;
  -moz-transition: all 0.35s ease-in-out;
  -ms-transition: all 0.35s ease-in-out;
  -o-transition: all 0.35s ease-in-out;
  margin-bottom: 25px;
}

.we-offer-area.text-center .item i::after {
  border: 2px solid #6e99e6;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  content: '';
  height: 90px;
  left: -5px;
  position: absolute;
  top: -5px;
  width: 90px;
  z-index: -1;
  transition: all 0.35s ease-in-out;
  -webkit-transition: all 0.35s ease-in-out;
  -moz-transition: all 0.35s ease-in-out;
  -ms-transition: all 0.35s ease-in-out;
  -o-transition: all 0.35s ease-in-out;
}

.we-offer-area.item-border-less .item {
  border: medium none;
}

.we-offer-area .our-offer-items.less-carousel .equal-height {
  margin-bottom: 30px;
}

.we-offer-area.item-border-less .item .number {
  font-family: 'Poppins', sans-serif;
  font-size: 50px;
  font-weight: 900;
  opacity: 0.1;
  position: absolute;
  right: 30px;
  top: 30px;
}

.our-offer-carousel.center-active .owl-item:nth-child(2n) .item,
.we-offer-area.center-active .single-item:nth-child(2n) .item {
  background: linear-gradient(105deg, #6e99e6, #093c94);
}

.our-offer-carousel.center-active .owl-item:nth-child(2n) .item i,
.our-offer-carousel.center-active .owl-item:nth-child(2n) .item h4,
.our-offer-carousel.center-active .owl-item:nth-child(2n) .item p,
.we-offer-area.center-active .single-item:nth-child(2n) .item i,
.we-offer-area.center-active .single-item:nth-child(2n) .item h4,
.we-offer-area.center-active .single-item:nth-child(2n) .item div {
  color: #ffffff;
}

.we-offer-area .item i {
  color: #6e99e6;
  display: inline-block;
  font-size: 60px;
  margin-bottom: 20px;
}

.we-offer-area .item h4 {
  font-weight: 600;
  text-transform: capitalize;
}

.we-offer-area .item p {
  margin: 0;
}

.we-offer-area .item i,
.we-offer-area .item h4,
.we-offer-area .item p {
  transition: all 0.35s ease-in-out;
  -webkit-transition: all 0.35s ease-in-out;
  -moz-transition: all 0.35s ease-in-out;
  -ms-transition: all 0.35s ease-in-out;
  -o-transition: all 0.35s ease-in-out;
}

.we-offer-area .item::after {
  background: linear-gradient(105deg, #6e99e6, #093c94);
  content: '';
  height: 100%;
  left: -100%;
  position: absolute;
  top: 0;
  transition: all 0.35s ease-in-out;
  -webkit-transition: all 0.35s ease-in-out;
  -moz-transition: all 0.35s ease-in-out;
  -ms-transition: all 0.35s ease-in-out;
  -o-transition: all 0.35s ease-in-out;
  width: 100%;
  z-index: -1;
}

.we-offer-area .item:hover::after {
  left: 0;
}

.we-offer-area .item:hover i,
.we-offer-area .item:hover h4,
.we-offer-area .item:hover div {
  color: #ffffff !important;
}

.we-offer-area.text-center .item:hover i::after {
  border-color: #ffffff !important;
}

.we-offer-area.text-center .item:hover i {
  background-color: #ffffff !important;
  color: #00a01d !important;
}

.we-offer-area.text-left .item i {
  background: #00a01d none repeat scroll 0 0;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  color: #ffffff;
  display: inline-block;
  font-size: 60px;
  height: 100px;
  line-height: 100px;
  margin-bottom: 30px;
  position: relative;
  width: 100px;
  z-index: 1;
  text-align: center;
}

.we-offer-area.text-left .item i::after {
  border: 2px solid #00a01d;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  content: '';
  height: 120px;
  left: -10px;
  position: absolute;
  top: -10px;
  width: 120px;
}
</style>
