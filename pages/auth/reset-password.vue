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
          <div
            :class="{
              'px-4': $vuetify.breakpoint.smAndDown,
              'px-12': $vuetify.breakpoint.mdAndUp,
            }"
          >
            <ResetPasswordForm @passwordResetSuccess="passwordResetSuccess" />
            <v-slide-y-transition>
              <v-alert
                v-show="passwordReset"
                :key="0"
                text
                dense
                style="border-radius: 15px"
                class="text-left mt-8"
                prominent
                type="success"
                ><v-row align="center">
                  <v-col class="grow"
                    >Your Password was reset successfully. You will be
                    redirected to the login page in {{ timer }} seconds.</v-col
                  >
                  <v-col class="shrink">
                    <v-hover v-slot="{ hover }">
                      <v-btn
                        style="transition: all 0.3s ease-in-out"
                        nuxt
                        :to="{ name: 'auth' }"
                        rounded
                        class="white--text my-0"
                        :class="
                          hover
                            ? 'bg-gradient-right-info-error elevated'
                            : 'bg-gradient-right-info-accent elevated-light'
                        "
                        >Login
                        <v-icon right>mdi-arrow-right</v-icon>
                      </v-btn>
                    </v-hover>
                  </v-col>
                </v-row></v-alert
              >
            </v-slide-y-transition>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ResetPasswordForm from '~/components/forms/auth/ResetPasswordForm.vue'
import { infoMessage } from '~/utils/messaging'

export default {
  components: { ResetPasswordForm },
  middleware: ['requireIdToken', 'requireVerifData'],
  data() {
    return {
      timer: 10,
      passwordReset: false,
    }
  },
  methods: {
    countDown() {
      if (this.timer > 0) {
        this.timer--
        setTimeout(this.countDown, 1000)
      } else {
        this.$router.push({ name: 'auth' })
      }
    },
    passwordResetSuccess() {
      this.passwordReset = true
      const message = infoMessage({
        text: 'Redirecting to Login...',
        timeout: 10000,
      })
      this.$store.dispatch('ui/showMessage', message, { root: true })
      this.countDown()
    },
  },
}
</script>

<style>
</style>