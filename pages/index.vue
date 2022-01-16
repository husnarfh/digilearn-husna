<template>
  <v-row align="center" no-gutters>
    <v-col cols="12" class="text-center">
      <img
        src="../static/potrait-woman.png"
        alt=""
        class="m-auto xl:my-20 md:h-screen md:object-cover"
      />
      <h1 class="py-8 md:pt-0 font-bold text-center">Article</h1>
      <v-row class="px-4 pb-5" no-gutters>
        <v-col cols="4" class="text-left">
          <v-card flat>
            <img src="../static/article-1.png" alt="" />
            <h3 class="text-2xl font-medium">
              How to create meaningful progress with design?
            </h3>
            <label for=""
              >It takes hard work to find the balance between values and
              aims.</label
            >
          </v-card>
        </v-col>
        <v-col cols="4" class="text-left">
          <v-card flat>
            <img src="../static/article-2.png" alt="" />
            <h3 class="text-2xl font-medium">
              Is It Ok to Cheat to be a Better UX/UI Designer?
            </h3>
            <label for=""
              >How can cheating in design help you become a better
              designer?</label
            >
          </v-card>
        </v-col>
        <v-col cols="4" class="text-left">
          <v-card flat>
            <img src="../static/article-3.png" alt="" />
            <h3 class="font-medium">Try peak-end rule on user journey map</h3>
            <label for=""
              >Designing a user flow requires careful management of
              resources.</label
            >
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  auth: false,
  mounted() {
    console.log(this.$auth)
  },
}
</script>
