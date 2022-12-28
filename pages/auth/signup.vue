<template>
  <div
    style="
      display: flex;
      justify-content: center;
      height: 100vh;
      align-items: center;
    "
    :style="{ backgroundColor: $vuetify.theme.dark ? '#FFFFFF' : '#FFFFFF' }"
  >
    <v-container>
      <v-row class="mb-16">
        <v-col cols="12">
          <div class="d-flex justify-center">
            <v-img
              max-width="250"
              contain
              :src="require('@/assets/img/logos/demologo.png')"
            ></v-img>
          </div>
        </v-col>
        <v-col cols="12">
          <div
            :class="{
              'px-4': $vuetify.breakpoint.smAndDown,
              'px-12': $vuetify.breakpoint.mdAndUp,
            }"
          >
            <div>
              <v-hover v-slot="{ hover }">
                <v-card
                  :disabled="loadingGoogle"
                  style="transition: all 0.3s ease-in-out; cursor: pointer"
                  outlined
                  class="rounded-xl px-3 py-0 mb-4"
                  :class="{
                    'elevated-light': hover,
                    'grey lighten-3': loadingGoogle,
                  }"
                  large
                  block
                  @click="loginWithGoogle"
                >
                  <v-scroll-x-transition leave-absolute hide-on-leave>
                    <div
                      v-show="!loadingGoogle"
                      :key="1"
                      class="justify-center align-center"
                      :class="{ 'd-flex': !loadingGoogle }"
                    >
                      <v-avatar>
                        <v-img
                          contain
                          :src="require('@/assets/img/icons/googleIcon.png')"
                        ></v-img>
                      </v-avatar>
                      <span class="text-button">Continue with Google</span>
                    </div>
                  </v-scroll-x-transition>
                  <v-scroll-x-reverse-transition leave-absolute hide-on-leave>
                    <div
                      v-show="loadingGoogle"
                      :key="2"
                      class="justify-center py-2"
                      :class="{ 'd-flex': loadingGoogle }"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-1"
                      ></v-progress-circular>
                    </div>
                  </v-scroll-x-reverse-transition>
                </v-card>
              </v-hover>
            </div>
            <div class="d-flex align-center">
              <v-divider></v-divider>
              <span class="px-4">OR</span>
              <v-divider></v-divider>
            </div>
            <div>
              <v-hover v-slot="{ hover }">
                <v-btn
                  rounded
                  :disabled="loadingGoogle"
                  large
                  block
                  to="/auth/signup-email"
                  ripple
                  nuxt
                  style="transition: all 0.3s ease-in-out"
                  class="white--text my-4"
                  :class="
                    hover
                      ? 'bg-gradient-right-primary-error elevated'
                      : 'bg-gradient-right-primary-accent elevated-light'
                  "
                >
                  <v-icon left>mdi-email-lock-outline</v-icon>
                  Sign up with Email</v-btn
                >
              </v-hover>
            </div>
            <div>
              <v-hover v-slot="{ hover }">
                <v-btn
                  rounded
                  block
                  to="/auth/signup-phone"
                  nuxt
                  large
                  :disabled="loadingGoogle"
                  style="transition: all 0.3s ease-in-out"
                  class="white--text my-4"
                  :class="
                    hover
                      ? 'bg-gradient-right-info-error elevated'
                      : 'bg-gradient-right-info-primary elevated-light'
                  "
                >
                  <v-icon left>mdi-cellphone-lock</v-icon>
                  Sign up with Phone
                </v-btn>
              </v-hover>
            </div>
            <div>
              <p class="text-center">
                Already have an {app name} account?
                <v-hover v-slot="{ hover }">
                  <nuxt-link :to="loadingGoogle ? '' : '/auth'">
                    <span
                      style="transition: all 0.3s ease-in-out"
                      role="link"
                      :style="{
                        cursor: loadingGoogle ? 'not-allowed' : 'pointer',
                      }"
                      class="font-weight-bold"
                      :class="{
                        'text-decoration-underline': hover && !loadingGoogle,
                        'text--disabled': loadingGoogle,
                        'primary--text': !loadingGoogle,
                      }"
                      >Login</span
                    >
                  </nuxt-link>
                </v-hover>
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      loadingGoogle: false,
    }
  },
  methods: {
    loginWithGoogle() {
      this.loadingGoogle = true
      console.log('Logging in with Google')
      setTimeout(() => {
        this.loadingGoogle = false
      }, 3000)
    },
    goto(fxn) {
      console.log({ fxn })
      if (!this.loadingGoogle) {
        return fxn
      }
    },
  },
}
</script>

<style>
</style>