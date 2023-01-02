<script lang="ts" setup>
defineProps({
  componentData: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="image-text-section">
    <div class="row gap-50">
      <div class="image-text-content">
        <h3>{{ componentData.settings.name }}</h3>
        <p class="p-18" v-html="componentData.settings.text"></p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'ImageTextComponent',
}
</script>

<style lang="scss" scoped>
.image-text-section {
  margin-bottom: 30px;
  .row.gap-50 {
    gap: 50px;
  }
}

.image-text-content {
  text-align: center;
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3 {
    font-size: 36px;
    line-height: 40px;
    color: #a5a5a5 !important;
  }
}

@media screen and (max-width: 1366px) {
  .video-text-img iframe {
    height: 300px;
    width: 540px;
  }
}

@media screen and (max-width: 1280px) {
  .image-text-section .row.gap-50 {
    gap: 20px;
    h3 {
      margin-bottom: 15px;
    }
  }
  .video-text-img {
    width: 100%;
  }
  .image-text-img {
    width: 100%;
    img {
      width: 100%;
      height: 500px;
    }
  }
  .video-text-img iframe {
    height: 450px;
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .image-text-img {
    img {
      height: 400px;
    }
  }
  .video-text-img iframe {
    height: 400px;
  }
}

@media screen and (max-width: 580px) {
  .image-text-img {
    img {
      height: 300px;
    }
  }
  .video-text-img iframe {
    height: 300px;
  }
}

@media screen and (max-width: 400px) {
  .image-text-img {
    img {
      height: 250px;
    }
  }
  .video-text-img iframe {
    height: 250px;
  }
}
</style>
