<template>
  <img v-lazy="setImage()" src="/default.png" :alt="props.alt" />
</template>

<script lang="ts" setup>
const props = defineProps({
  image: {
    type: Object,
    default: null,
  },
  thumb: {
    type: Boolean,
    default: false,
  },
  alt: {
    type: String,
    required: false,
    default: 'Image alt',
  },
})

function setImage() {
  if (props.image) {
    if (props.thumb && props.image?.thumb) {
      return props.image.thumb
    }
    if (props.image?.webp) {
      return props.image.webp
    }
    if (props.image?.url) {
      return props.image.url
    }
    return '/default.png'
  }
  return '/default.png'
}
</script>

<script lang="ts">
export default {
  name: 'ImageComponent',
}
</script>
