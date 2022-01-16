<template>
  <v-app>
    <v-responsive>
      <v-app-bar fixed app class="px-md-10" style="background-color: white">
        <img src="../static/logo.png" alt="" />
        <template v-if="breakpoint !== 'sm' && breakpoint !== 'xs'">
          <nuxt-link to="/">
            <label for="" class="btn-navbar">Home</label>
          </nuxt-link>
          <nuxt-link to="/article">
            <label for="" class="btn-navbar">Article</label>
          </nuxt-link>
          <nuxt-link to="/create">
            <label for="" class="btn-navbar">Create</label>
          </nuxt-link>
          <v-spacer />
          <div
            v-if="!isAuthenticated"
            class="primary--text"
            style="cursor: pointer"
            @click="dialog = true"
          >
            <label for="">Login</label>
          </div>
          <div v-else class="text-none" @click="logout()">
            <label for="" class="primary--text" style="cursor: pointer"
              >Logout</label
            >
          </div>
        </template>

        <template v-else>
          <v-spacer></v-spacer>
          <v-btn v-show="!menu" icon @click="menu = !menu">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
          <v-btn v-show="menu" icon @click="menu = !menu">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-app-bar>
      <v-main>
        <v-container v-if="!menu" fluid class="pa-0 pa-md-8">
          <Nuxt />
        </v-container>
        <v-card v-else class="text-center" flat>
          <div style="display: grid; grid-row-gap: 2vh" class="py-5">
            <nuxt-link to="/">
              <v-btn text class="text-none mx-5 pt-sm-5" @click="menu = !menu">
                <label for="">Home</label>
              </v-btn>
            </nuxt-link>
            <nuxt-link to="/article">
              <v-btn text class="text-none mx-5" @click="menu = !menu">
                <label for="">Article</label>
              </v-btn>
            </nuxt-link>
            <nuxt-link to="/create">
              <v-btn text class="text-none mx-5" @click="menu = !menu">
                <label for="">Create</label>
              </v-btn>
            </nuxt-link>
            <v-btn
              v-if="!isAuthenticated"
              text
              class="text-none"
              @click="dialog = true"
            >
              <label for="">Login</label>
            </v-btn>
            <v-btn v-else text class="text-none" @click="logout()">
              <label for="">Logout</label>
            </v-btn>
          </div>
        </v-card>
      </v-main>
      <v-footer :absolute="!fixed" app style="background-color: #ed3237">
        <div class="py-md-3 pl-md-10">
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
import { mapMutations, mapState } from 'vuex'
import Swal from 'sweetalert2'

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
      menu: false,
    }
  },
  computed: {
    ...mapState(['isAuthenticated']),
    breakpoint() {
      return this.$vuetify.breakpoint.name
    },
  },
  methods: {
    ...mapMutations(['changeAuth']),
    async login() {
      if (this.$refs.form.validate()) {
        const response = await this.$axios.post(
          'https://restify-sahaware-boilerplate.herokuapp.com/api/auth/login',
          this.inputLogin
        )
        this.$nuxt.$loading.start()
        this.$auth.loginWith('local', {
          data: this.inputLogin,
        })

        this.$axios.setHeader(
          'Authorization',
          `Bearer ${response.data.content[0].token}`
        )

        if (response.status === 200) {
          this.changeAuth(true)
          this.$auth.setUser({
            name: response.data.content[0].name,
            email: response.data.content[0].email,
          })
          // this.$auth.setUserToken(response.data.content[0].token)
          Swal.fire('Login berhasil', '', 'success')
          this.$router.push('/')
          this.dialog = false
        } else {
          Swal.fire(response.statusText, '', 'error')
        }
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
}
.btn-navbar {
  color: black;
  cursor: pointer;
  padding: 0 48px 0 48px;
  &:hover {
    color: red;
  }
}
</style>
