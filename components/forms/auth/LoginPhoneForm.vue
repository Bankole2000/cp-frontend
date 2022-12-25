<template>
  <div class="login-form">
    <v-form @submit.prevent="submit">
      <v-container class="py-0">
        <v-row>
          <v-col cols="12" md="4">
            <PhoneCountrySelect
              @phoneCountryCodeSelected="selectCountryCode"
              :country-code="visitorData ? visitorData.countryCode : null"
            />
          </v-col>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="loginData.phone"
              label="Phone Number"
              type="text"
              prepend-icon="mdi-phone"
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
import { mapActions, mapGetters } from 'vuex'
import { errorMessage } from '~/utils/messaging'

export default {
  name: 'LoginPhoneForm',
  data() {
    return {
      loading: false,
      loginData: {
        phone: '',
        countryCode: '',
        password: '',
      },
      showPassword: false,
      errors: [],
    }
  },
  computed: {
    ...mapGetters({
      visitorData: 'settings/visitorData',
    }),
  },
  methods: {
    ...mapActions({
      showToast: 'ui/showMessage',
      updateToast: 'ui/updateMessage',
      testEnv: 'ui/testEnv',
      checkUser: 'auth/getMe',
      loginWithPhoneNumber: 'auth/loginWithPhoneNumber',
    }),
    selectCountryCode(e) {
      console.log({ e })
      if (e) {
        this.loginData.countryCode = e.countryCode
      }
    },
    async submit() {
      if (this.loading) return
      this.loading = true
      if (!this.loginData.phone) {
        errorMessage({ text: 'Phone Number is required' })
        return
      }
      if (!this.loginData.password) {
        errorMessage({ text: 'Password is required' })
        return
      }
      try {
        const result = await this.loginWithPhoneNumber(this.loginData)
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