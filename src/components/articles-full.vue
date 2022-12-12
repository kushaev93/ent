<script lang="ts" setup>
import { toDate } from 'src/helpers/convert'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { api } from 'boot/axios'
import Pagination from 'components/widgets/Pagination.vue'

const route = useRoute()
const perPage = 12
const articles = await api.get(
  `/all-articles?page=${route.query.page || 1}&per-page=${perPage}`
)
const pages = computed(() => {
  if (articles.data && articles.headers) {
    return Math.ceil(
      Number(articles.headers['x-pagination-total-count']) / perPage
    )
  }
  return 0
})
</script>

<template>
  <section class="articles-full-section">
    <div class="articles-full-grid">
      <router-link
        class="full-article"
        v-for="(article, i) of articles.data.data"
        :key="i"
        :to="`/articles/${article.url}`"
      >
        <ImageComp
          :image="article.imageFile"
          :thumb="true"
          :alt="article.name"
        />
        <div class="content">
          <div class="row">
            <div class="type">{{ article.type }}</div>
            <div class="date">
              {{ toDate(article.updated_at) }}
            </div>
          </div>
          <div class="name">
            {{ article.name }}
          </div>
        </div>
      </router-link>
    </div>
    <Pagination :pages="pages" :route="route" />
  </section>
</template>

<script lang="ts">
export default {
  name: 'ArticlesFullComponent',
}
</script>

<style lang="scss" scoped>
.articles-section {
  padding: 50px 0;
  h3 {
    margin-bottom: 50px;
    &::after {
      width: 80px;
      margin-top: 7px;
      display: block;
      content: '';
      background: $light_green;
      height: 2px;
    }
  }
}

.articles-full-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 30px;
  .full-article {
    color: $black;
    text-decoration: none;
    img {
      width: 100%;
      height: 300px;
      border-radius: 2px;
      object-fit: cover;
    }
    .content {
      padding: 15px 0 0;
      .row {
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        .date {
          white-space: nowrap;
          color: $grey;
          font-weight: 400;
        }
        .type {
          padding: 5px;
          background: $green;
          color: #fff;
        }
      }
      .name {
        margin-top: 10px;
        font-weight: 600;
        font-size: 18px;
      }
    }
  }
}

@media screen and (max-width: 2000px) {
  .articles-full-grid {
    .full-article {
      img {
        height: 250px;
      }
    }
  }
}

@media screen and (max-width: 1920px) {
  .articles-full-grid {
    .full-article {
      img {
        height: 230px;
      }
    }
  }
}

@media screen and (max-width: 1680px) {
  .articles-grid {
    grid-template-columns: 1fr 1fr;
  }
  .articles-full-grid {
    grid-template-columns: 1fr 1fr 1fr;
    .full-article {
      img {
        height: 250px;
      }
    }
  }
}

@media screen and (max-width: 1280px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
  .articles-full-grid {
    grid-template-columns: 1fr 1fr;
    .full-article {
      img {
        height: 280px;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .articles-full-grid {
    .full-article {
      img {
        height: 230px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .articles-section {
    padding: 30px 0;
    h3 {
      margin-bottom: 30px;
      &::after {
        margin-top: 2px;
      }
    }
  }
  .articles-full-grid {
    grid-template-columns: 1fr;
    .full-article {
      img {
        height: 320px;
      }
    }
  }
}

@media screen and (max-width: 580px) {
  .articles-grid .article {
    flex-direction: column;
    align-items: center;
    text-align: center;
    .content {
      margin-top: 10px;
      margin-left: 0px;
      .name {
        margin-bottom: 5px;
      }
    }
  }
  .articles-full-grid {
    .full-article {
      img {
        height: 250px;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .articles-full-grid {
    .full-article {
      img {
        height: 200px;
      }
    }
  }
}
</style>
