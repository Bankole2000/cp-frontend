<template>
  <div class="login-form">
    <v-form @submit.prevent="submit">
      <v-container class="py-0">
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
              type="email"
              placeholder="your@email.com or @username"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.trim="loginData.password"
              prepend-inner-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              :readonly="loading"
              :disabled="loading"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <div class="d-flex">
              <v-btn @click="forgotPassword" :disabled="loading">
                Forgot Password?
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn type="submit" :loading="loading" :disabled="loading"
                >Login</v-btn
              >
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
        errorMessage({ text: 'Email or Username is required' })
        return
      }
      if (!this.loginData.password) {
        errorMessage({ text: 'Password is required' })
        return
      }
      if (!isValidEmail(this.loginData.email)) {
        try {
          const { email, password } = this.$data.loginData
          const username = email.charAt(0) === '@' ? email.slice(1) : email
          const result = await this.loginWithUsername({ username, password })
          console.log({ result })
        } catch (error) {
          console.log({ error })
        } finally {
          this.loading = false
        }
        return
      }
      try {
        const { email, password } = this.$data.loginData
        const result = await this.loginWithEmail({ email, password })
        console.log({ result })
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
    },
    async forgotPassword() {
      this.testEnv()
      await this.checkUser()
    },
  },
}
</script>

<style>
</style>