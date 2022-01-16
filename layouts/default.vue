<template>
  <v-app>
    <v-responsive>
      <v-app-bar
        :clipped-left="clipped"
        fixed
        app
        class="px-10"
        style="background-color: white"
      >
        <img src="../static/logo.png" alt="" />
        <nuxt-link to="/">
          <v-btn text class="text-none mx-5">
            <label for="">Home</label>
          </v-btn>
        </nuxt-link>
        <nuxt-link to="/article">
          <v-btn text class="text-none mx-5">
            <label for="">Article</label>
          </v-btn>
        </nuxt-link>
        <nuxt-link to="/create">
          <v-btn text class="text-none mx-5">
            <label for="">Create</label>
          </v-btn>
        </nuxt-link>
        <v-spacer />
        <v-btn
          v-if="!$store.getters.isAuthenticated"
          text
          class="text-none"
          @click="dialog = true"
        >
          <label for="">Login</label>
        </v-btn>
        <v-btn v-else text class="text-none" @click="logout()">
          <label for="">Logout</label>
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <Nuxt />
        </v-container>
      </v-main>
      <v-footer :absolute="!fixed" app style="background-color: #ed3237">
        <div class="py-6 pl-10">
          <label class="white--text body-1"
            >Copyright © Sahaware Asessment 2021</label
          >
        </div>
      </v-footer>

      <v-dialog v-model="dialog" width="564" height="570">
        <v-card v-if="isLogin" class="pa-10" tile>
          <div class="pb-12">
            <div class="pb-2">
              <h1 class="">Login</h1>
            </div>

            <label for=""
              >Don't have an account?
              <a
                class="red--text text-none"
                @click="
                  isRegister = true
                  isLogin = false
                "
              >
                Create Account
              </a></label
            >
          </div>

          <v-form ref="form" v-model="valid" class="bg-white">
            <div class="mb-4">
              <label class="block mb-2" for="username">Email</label>
              <v-text-field
                v-model="inputLogin.email"
                dense
                outlined
                placeholder="Entry your email"
                type="email"
                :rules="rules.email"
              ></v-text-field>
            </div>
            <div class="mb-6">
              <label class="block mb-2" for="password">Password</label>
              <v-text-field
                v-model="inputLogin.password"
                dense
                outlined
                placeholder="Entry your password"
                type="password"
                :rules="rules.password"
              ></v-text-field>
            </div>
            <div class="flex items-center justify-between">
              <v-btn
                color="red"
                class="white--text text-none"
                depressed
                @click="login()"
              >
                Log In
              </v-btn>
            </div>
          </v-form>
        </v-card>
        <v-card v-else class="pa-10" tile>
          <div class="pb-12">
            <div class="pb-2">
              <h1 class="">Register</h1>
            </div>

            <label for=""
              >Have an account?
              <a
                class="red--text text-none"
                @click="
                  isRegister = false
                  isLogin = true
                "
              >
                Login
              </a></label
            >
          </div>

          <v-form ref="register" class="bg-white">
            <div class="mb-4">
              <label class="block mb-2" for="username">Fullname</label>
              <v-text-field
                v-model="inputRegister.fullname"
                dense
                outlined
                placeholder="Entry your fullname"
                type="fullname"
                :rules="rules.fullname"
              ></v-text-field>
            </div>
            <div class="mb-4">
              <label class="block mb-2" for="username">Email</label>
              <v-text-field
                v-model="inputRegister.email"
                dense
                outlined
                placeholder="Entry your email"
                type="email"
                :rules="rules.email"
              ></v-text-field>
            </div>
            <div class="mb-6">
              <label class="block mb-2" for="password">Password</label>
              <v-text-field
                v-model="inputRegister.password"
                dense
                outlined
                placeholder="Entry your password"
                type="password"
                :rules="rules.password"
              ></v-text-field>
            </div>
            <div class="flex items-center justify-between">
              <v-btn
                color="red"
                class="white--text text-none"
                depressed
                @click="register()"
              >
                Register
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-dialog>
    </v-responsive>
  </v-app>
</template>

<script>
export default {
  auth: false,
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      fixed: false,
      dialog: false,
      miniVariant: false,
      isLogin: true,
      isRegister: false,
      inputLogin: {
        email: '',
        password: '',
      },
      inputRegister: {
        fullname: '',
        email: '',
        password: '',
      },
      valid: true,
      rules: {
        email: [(v) => !!v],
        password: [(v) => !!v],
        fullname: [(v) => !!v],
      },
    }
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        // const data = await this.$axios.post(
        //   'login',
        //   this.inputLogin
        // )

        // if (data.code === 200) {
        this.$auth
          .loginWith('local', {
            data: {
              email: this.inputLogin.email,
              password: this.inputLogin.password,
            },
          })
          .then((response) => {
            if (response.code === 200) {
              this.$auth.strategy.token.set(response.content[0].token)
              this.$store.commit('saveToken', response.content[0].token)
              this.$axios.defaults.headers.common.Authorization = `Bearer ${response.content[0].token}`
              this.$auth.setUser({
                email: this.inputLogin.email,
              })
              this.$router.push('/article')
            }
          })

        //   console.log(this.$auth)

        // }
      }
    },
    logout() {
      this.$auth.logout()
      this.$router.push('/')
    },
    async register() {
      if (this.$refs.register.validate()) {
        await this.$axios.post(
          'https://restify-sahaware-boilerplate.herokuapp.com/api/auth/register',
          this.inputRegister
        )

        // if (data.code === 200) {
        this.$auth
          .loginWith('local', {
            data: {
              email: this.inputRegister.email,
              password: this.inputRegister.password,
            },
          })
          .then((response) => {
            if (response.code === 200) {
              this.$auth.strategy.token.set(response.content[0].token)
              this.$store.commit('saveToken', response.content[0].token)
              this.$axios.defaults.headers.common.Authorization = `Bearer ${response.content[0].token}`
              this.$auth.setUser({
                email: this.inputRegister.email,
              })
              this.$router.push('/')
            }
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  &:hover {
    color: red;
  }
}
</style>
