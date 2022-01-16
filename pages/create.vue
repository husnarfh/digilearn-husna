<template>
  <v-row no-gutters class="pa-md-10 mx-md-10 py-10" justify="center">
    <v-col class="pr-5 pl-md-10 pl-5" sm="12" md="6">
      <div class="pb-8">
        <h2 class="text-2xl font-medium">Create a New Article</h2>
      </div>

      <div class="grid pb-7">
        <label>Title</label>
        <v-text-field
          v-model="input.title"
          type="text"
          outlined
          dense
          placeholder="Enter your Article Title"
        />
      </div>

      <v-textarea
        v-model="input.description"
        outlined
        dense
        no-resize
        rows="20"
        placeholder="Write your story"
      />
    </v-col>
    <v-col class="pl-5 pr-10" md="4" sm="12">
      <div class="pb-8">
        <h2 class="text-2xl font-medium">Publication Detail</h2>
      </div>

      <div class="grid pb-6">
        <label>Short Description</label>
        <v-textarea
          v-model="input.short_description"
          rows="4"
          no-resize
          outlined
          dense
          placeholder="Enter your Article Short Description"
        />
      </div>

      <div class="mb-3 pb-6">
        <label for="formFile" class="form-label inline-block mb-2 text-gray-700"
          >Thumbnail</label
        >
        <br />
        <input
          id="formFile"
          ref="formFile"
          class="form-control block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          type="file"
          style="border: 1px solid gray"
          @click="inputFile()"
        />
      </div>

      <div class="mb-3 xl:w-96 pb-6">
        <label for="formFile" class="form-label inline-block mb-2 text-gray-700"
          >Categories</label
        >
        <v-select
          v-model="input.category"
          outlined
          dense
          :items="resource.category"
          item-text="title"
          placeholder="Select category"
          return-object
          hide-details="false"
        >
        </v-select>
      </div>

      <v-row no-gutters class="d-flex justify-space-between" align="baseline">
        <label>Published</label>

        <v-switch v-model="input.isPublished"></v-switch>
      </v-row>

      <v-btn
        color="red"
        class="text-none white--text"
        depressed
        @click="createArticle()"
        >Publish</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'CreatePage',
  auth: false,
  data() {
    return {
      resource: {
        category: [],
      },
      input: {
        title: '',
        description: '',
        short_description: '',
        file: '',
        category: '',
        isPublished: false,
      },
    }
  },
  mounted() {
    this.getCategory()
  },
  methods: {
    async getCategory() {
      const data = await this.$axios.$get(
        'https://restify-sahaware-boilerplate.herokuapp.com/api/article-category'
      )
      this.resource.category = data.content
    },
    inputFile() {
      this.input.file = this.$refs.formFile.files
    },
    createArticle() {
      const formData = new FormData()
      formData.append('title', this.input.title)
      formData.append('description', this.input.description)
      formData.append('short_description', this.input.short_description)
      formData.append('category_id', this.input.category.id)
      formData.append('is_visible', this.isPublished)
      formData.append('image', this.file)

      this.$axios
        .post(
          'https://restify-sahaware-boilerplate.herokuapp.com/api/article/create',
          formData
        )
        .then((response) => {
          if (response.code === 200) {
            Swal('Artikel Berhasil ditambahkan!', '', 'success')
            this.input = {
              title: '',
              description: '',
              short_description: '',
              file: '',
              category: '',
              isPublished: false,
            }
          }
        })
    },
  },
}
</script>

<style>
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #60a5fa;
}
</style>
