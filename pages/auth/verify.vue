<template>
  <div
    class="verify-otp"
    style="
      display: flex;
      justify-content: center;
      height: 100vh;
      align-items: center;
    "
    :style="{ backgroundColor: $vuetify.theme.dark ? '#FFFFFF' : '#FFFFFF' }"
  >
    <v-container>
      <v-row class="mb-16 py-0">
        <v-col cols="12" class="py-0">
          <div
            :class="{
              'px-4': $vuetify.breakpoint.smAndDown,
              'px-12': $vuetify.breakpoint.mdAndUp,
            }"
          >
            <v-container>
              <v-row class="py-0">
                <v-col cols="12" class="py-2">
                  <v-slide-y-transition>
                    <v-alert
                      v-show="success ? true : false"
                      :key="0"
                      text
                      dense
                      style="border-radius: 15px"
                      class="text-left"
                      type="success"
                      >{{ success }}</v-alert
                    >
                  </v-slide-y-transition>
                  <v-slide-y-transition class="py-0" leave-absolute group>
                    <v-alert
                      v-for="(error, i) in errors"
                      :key="i + 1"
                      text
                      type="error"
                      style="border-radius: 15px"
                      class="text-left"
                      dense
                      >{{ error }}</v-alert
                    >
                  </v-slide-y-transition>
                </v-col>
              </v-row>
            </v-container>
            <v-otp-input
              v-model="otp"
              style="font-size: 4rem"
              :disabled="loading"
              :loading="loading"
              @finish="otpComplete"
            ></v-otp-input>
            <div class="d-flex align-center">
              <v-btn
                outlined
                style="transition: all 0.3s ease-in-out"
                large
                :disabled="timer > 0 || loading"
                :loading="loading"
                rounded
                @click="resend"
                >Resend <span v-if="timer > 0">({{ timer }})</span></v-btn
              >
              <v-spacer></v-spacer>
              <v-hover v-slot="{ hover }">
                <v-btn
                  style="transition: all 0.3s ease-in-out"
                  rounded
                  class="white--text my-0"
                  large
                  :class="
                    hover
                      ? 'bg-gradient-right-primary-error elevated'
                      : 'bg-gradient-right-primary-accent elevated-light'
                  "
                  :loading="loading"
                  :disabled="loading"
                  @click="verifyAttempt"
                  >Verify
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </v-hover>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      timer: 30,
      otp: '',
      success: '',
      errors: [],
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      type: 'auth/registeredVia',
    }),
    email() {
      return this.user ? this.user.email : null
    },
    phone() {
      return this.user ? this.user.phone : null
    },
    userId() {
      return this.user ? this.user.userId : null
    },
  },
  mounted() {
    this.countDown()
  },
  methods: {
    ...mapActions({
      verifyOTP: 'auth/verifyOTP',
      resendOTP: 'auth/resendOTP',
    }),
    async otpComplete(e) {
      console.log({ e })
      console.log('OTP Complete')
      await this.verifyAttempt()
    },
    countDown() {
      if (this.timer > 0) {
        this.timer--
        setTimeout(this.countDown, 1000)
      }
    },
    async resend() {
      if (this.loading) return
      this.loading = true
      try {
        const result = await this.resendOTP({
          userId: this.userId,
          type: this.type,
          email: this.email,
          phone: this.phone,
        })
        if (result.success) {
          this.success = result.message
          this.otp = ''
          this.timer = 30
          this.countDown()
        } else {
          this.handleErrors(result)
        }
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
        this.clearErrors()
      }
    },
    async verifyAttempt() {
      if (this.loading) return
      this.loading = true
      try {
        const result = await this.verifyOTP({
          userId: this.userId,
          OTP: this.otp,
          type: this.type,
          email: this.email,
          phone: this.phone,
        })
        if (result.success) {
          this.success = result.message
          this.$router.push('/auth/onboarding')
        } else {
          this.handleErrors(result)
        }
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
        this.clearErrors()
      }
    },
    clearErrors() {
      setTimeout(() => {
        this.success = ''
        this.errors = []
      }, 3000)
    },
    handleErrors(e) {
      console.log({ e })
      const { errors, message } = e
      if (Array.isArray(errors)) {
        errors.forEach((error) => {
          this.errors.push(error.message)
        })
      } else {
        this.errors.push(message)
      }
    },
  },
}
</script>

<style>
</style>