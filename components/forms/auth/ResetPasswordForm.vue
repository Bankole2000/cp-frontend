<template>
  <div class="reset-password-form">
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
              v-model.trim="resetPasswordData.password"
              filled
              rounded
              single-line
              placeholder="New Password"
              prepend-inner-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              label="New Password"
              :type="showPassword ? 'text' : 'password'"
              :readonly="loading"
              :rules="[rules.required, rules.min]"
              :disabled="loading"
              @click:append="showPassword = !showPassword"
            >
            </v-text-field>
            <v-text-field
              v-model.trim="resetPasswordData.confirmPassword"
              filled
              rounded
              single-line
              placeholder="Confirm New Password"
              prepend-inner-icon="mdi-lock"
              :append-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
              label="Confirm New Password"
              :type="showConfirmPassword ? 'text' : 'password'"
              :readonly="loading"
              :rules="[rules.required, rules.min]"
              :disabled="loading"
              @click:append="showConfirmPassword = !showConfirmPassword"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" class="py-0">
            <div class="d-flex align-center">
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
                  >Reset Password
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
export default {
  data() {
    return {
      loading: false,
      success: '',
      errors: [],
      showPassword: false,
      showConfirmPassword: false,
      resetPasswordData: {
        password: '',
        confirmPassword: '',
      },
      rules: {
        required: (value) => !!value || 'This field is required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
      },
    }
  },
  computed: {
    verifData: {
      get() {
        return this.$store.state.auth.verifData
      },
    },
  },
  methods: {
    ...mapActions({
      resetPassword: 'auth/setNewPassword',
    }),
    async submit() {
      if (this.loading) return
      this.loading = true
      this.errors = []
      this.success = ''
      try {
        const result = await this.resetPassword({
          ...this.resetPasswordData,
          ...this.verifData,
        })
        if (result.success) {
          this.success = result.message
          this.$emit('passwordResetSuccess')
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