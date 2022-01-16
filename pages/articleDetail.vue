<template>
  <div class="px-4 md:px-96 text-left">
    <h1 class="text-4xl font-medium py-5">{{ article.title }}</h1>
    <h4 class="text-2xl py-5">{{ article.short_description }}</h4>
    <img :src="article.image" alt="" class="py-5" />
    <div id="description"></div>
  </div>
</template>

<script>
export default {
  name: 'ArticleById',
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      article: {
        category: '',
        created_at: '',
        created_by: '',
        description: '',
        image: '',
        short_description: '',
        title: '',
      },
    }
  },
  mounted() {
    this.getArticleById(this.id)
  },
  methods: {
    async getArticleById(id) {
      const data = await this.$axios.$get(
        `https://restify-sahaware-boilerplate.herokuapp.com/api/article/${id}`
      )
      this.article = data.content
      document.getElementById('description').innerHTML =
        data.content.description
    },
  },
}
</script>

<style></style>
