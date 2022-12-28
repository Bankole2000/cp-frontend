<template>
  <div class="login-form">
    <v-form @submit.prevent="submit">
      <v-container class="py-0">
        <v-row class="py-0">
          <v-col cols="12" class="py-2">
            <v-slide-y-transition>
              <v-alert
                :key="0"
                v-show="success ? true : false"
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
        <v-row>
          <v-col cols="12" class="py-0">
            <v-text-field
              v-model.trim="loginData.email"
              :prepend-inner-icon="
                isEmail ? 'mdi-email-outline' : 'mdi-account-outline'
              "
              :readonly="loading"
              :disabled="loading"
              label="Email or Username"
              filled
              :rules="[rules.required]"
              rounded
              type="email"
              single-line
              placeholder="your@email.com or @username"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-text-field
              v-model.trim="loginData.password"
              filled
              rounded
              single-line
              placeholder="Password"
              prepend-inner-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              :readonly="loading"
              :rules="[rules.required, rules.min]"
              :disabled="loading"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <div>
              <p class="caption py-0 mt-n4 text-right">
                By logging in you agree to {app Name}'s
                <span>Terms of Service</span> and <span>Privacy Policy</span>.
              </p>
            </div>
          </v-col>
          <v-col cols="12" class="py-0">
            <div class="d-flex align-center">
              <v-btn
                large
                rounded
                text
                @click="$emit('goback')"
                :disabled="loading"
              >
                <v-icon left>mdi-arrow-left</v-icon>
                Back
              </v-btn>
              <v-spacer></v-spacer>
              <v-hover v-slot="{ hover }">
                <v-btn
                  type="submit"
                  style="transition: all 0.3s ease-in-out"
                  nuxt
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
                  >Login
                  <v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
              </v-hover>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { isValidEmail } from '~/utils/validators'
import { errorMessage } from '~/utils/messaging'

export default {
  data() {
    return {
      loading: false,
      loginData: {
        email: '',
        password: '',
      },
      showPassword: false,
      rules: {
        required: (value) => !!value || 'This field is required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
      },
      success: '',
      errors: [],
    }
  },
  computed: {
    isEmail() {
      return isValidEmail(this.loginData.email)
    },
  },
  methods: {
    ...mapActions({
      showToast: 'ui/showMessage',
      updateToast: 'ui/updateMessage',
      testEnv: 'ui/testEnv',
      checkUser: 'auth/getMe',
      loginWithEmail: 'auth/loginWithEmail',
      loginWithUsername: 'auth/loginWithUsername',
    }),
    async submit() {
      if (this.loading) return
      this.loading = true
      if (!this.loginData.email) {
        const message = errorMessage({
          text: 'Email or Username is required',
          color: 'red accent-2',
        })
        this.showToast(message)
        this.loading = false
        this.errors.push('Email or Username is required')
        this.clearErrors()
        return
      }
      if (!this.loginData.password) {
        const message = errorMessage({
          text: 'Password is required',
          color: 'red accent-2',
        })
        this.showToast(message)
        this.loading = false
        this.errors.push('Password is required')
        this.clearErrors()
        return
      }
      if (!isValidEmail(this.loginData.email)) {
        try {
          const { email, password } = this.$data.loginData
          const username = email.charAt(0) === '@' ? email.slice(1) : email
          const result = await this.loginWithUsername({ username, password })
          console.log({ result })
          if (result.success) {
            this.$emit('loginSuccess')
          }
          if (!result.success) {
            this.handleErrors(result)
          }
        } catch (error) {
          console.log({ error })
          this.handleErrors(error)
        } finally {
          this.loading = false
          this.clearErrors()
        }
        return
      }
      try {
        const { email, password } = this.$data.loginData
        const result = await this.loginWithEmail({ email, password })
        console.log({ result: result.success })
        if (result.success) {
          this.$emit('loginSuccess')
        }
        if (!result.success) {
          this.handleErrors(result)
        }
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
        this.clearErrors()
      }
    },
    async forgotPassword() {
      this.testEnv()
      await this.checkUser()
    },
    clearErrors() {
      setTimeout(() => {
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