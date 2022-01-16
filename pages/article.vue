<template>
  <div class="pa-md-10">
    <v-row v-if="!isSelected" justify="center" no-gutters>
      <template v-for="(article, idx) in articles">
        <v-col :key="'article-' + idx" md="4" sm="12">
          <button class="pa-6 text-left" @click="onClick(article.id)">
            <img :src="article.image" style="height: 27vh" />
            <h4>
              {{ article.title }}
            </h4>
            <label for="short-desc">{{ article.short_description }}</label>
          </button>
        </v-col>
      </template>
    </v-row>

    <ArticleById v-if="isSelected" :id="selectedId" />
  </div>
</template>

<script>
import ArticleById from './articleDetail.vue'

export default {
  name: 'ArticlePage',
  components: {
    ArticleById,
  },
  auth: false,
  data() {
    return {
      articles: [],
      selectedId: null,
      isSelected: false,
    }
  },
  mounted() {
    this.getAllArticle()
  },
  methods: {
    async getAllArticle() {
      const data = await this.$axios.$get(
        'https://restify-sahaware-boilerplate.herokuapp.com/api/article?search='
      )
      this.articles = data.content
    },
    onClick(id) {
      this.selectedId = id
      this.isSelected = true
    },
  },
}
</script>

<style></style>
