<template>
  <v-row align="center" no-gutters>
    <v-col cols="12" class="text-center">
      <img
        v-if="breakpoint !== 'sm' && breakpoint !== 'xs'"
        src="../static/potrait-woman.png"
        alt=""
        class=""
      />
      <img v-else src="../static/potrait-woman-2.png" alt="" class="" />
      <h1 class="py-8 text-center">Article</h1>
      <v-row class="px-4 px-md-10 pb-5" no-gutters>
        <v-col lg="4" sm="12" class="text-left">
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
        <v-col lg="4" sm="12" class="text-left">
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
        <v-col lg="4" sm="12" class="text-left">
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
  computed: {
    breakpoint() {
      return this.$vuetify.breakpoint.name
    },
  },
}
</script>
