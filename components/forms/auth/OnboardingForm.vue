<template>
  <div class="onboarding-form">
    <v-form @submit.prevent="submit">
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
        <v-row>
          <v-col cols="12" class="py-0">
            <div class="d-flex align-start">
              <v-text-field
                v-model.trim="onboardingData.username"
                :readonly="loading"
                prepend-inner-icon="mdi-at"
                append-icon="mdi-account-outline"
                :disabled="loading"
                label="username"
                rounded
                filled
                type="text"
                single-line
                placeholder="Pick a unique username"
              ></v-text-field>
              <v-menu
                v-model="showMenu"
                content-class="elevated-light rounded-xl"
                absolute
                offset-y
                style="max-width: 600px"
              >
                <template #activator="{ on, attrs }">
                  <v-card
                    class="pl-4 pr-3 mt-1 py-3 rounded-xl ml-4"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    :disabled="loading"
                    ><div class="d-flex align-center">
                      <v-icon class="mr-1" v-if="gender.icon">{{
                        gender.icon
                      }}</v-icon>
                      <span
                        style="font-size: 1.1rem"
                        class="font-weight-bold text-capitalize"
                      >
                        {{ gender.value ? gender.value.charAt(0) : 'Gender' }}
                      </span>
                      <v-icon>mdi-chevron-down</v-icon>
                    </div></v-card
                  >
                </template>

                <v-list two-line>
                  <v-list-item-group
                    v-model="selectedGender"
                    mandatory
                    color="indigo"
                  >
                    <v-list-item
                      v-for="(option, index) in genderOptions"
                      :key="index"
                      @click="selectGender(option)"
                    >
                      <v-list-item-avatar>
                        <v-icon>{{ option.icon }}</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>{{ option.text }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                          option.desc
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>
            </div>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-text-field
              v-model.trim="onboardingData.password"
              :readonly="loading"
              prepend-inner-icon="mdi-lock-outline"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :disabled="loading"
              label="Password"
              rounded
              filled
              :type="showPassword ? 'text' : 'password'"
              single-line
              placeholder="Password"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-text-field
              v-model.trim="onboardingData.confirmPassword"
              :readonly="loading"
              prepend-inner-icon="mdi-lock-outline"
              :append-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :disabled="loading"
              label="Confirm Password"
              rounded
              filled
              :type="showConfirmPassword ? 'text' : 'password'"
              single-line
              placeholder="Confirm Password"
              @click:append="showConfirmPassword = !showConfirmPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="py-0">
            <div class="d-flex align-center">
              <v-btn
                large
                rounded
                text
                :disabled="loading"
                @click="$emit('goback')"
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
                  >Submit
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
  name: 'OnboardingForm',
  data() {
    return {
      success: '',
      errors: [],
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      onboardingData: {
        username: '',
        gender: '',
        password: '',
        confirmPassword: '',
      },
      selectedGender: '',
      showMenu: false,
      gender: '',
      genderOptions: [
        {
          text: 'Male',
          value: 'MALE',
          icon: 'mdi-gender-male',
          desc: 'Pronouns he/him/his',
        },
        {
          text: 'Female',
          value: 'FEMALE',
          icon: 'mdi-gender-female',
          desc: 'Pronouns she/her/hers',
        },
        {
          text: 'Prefer not to say',
          value: 'OTHER',
          icon: 'mdi-gender-transgender',
          desc: 'Ask. Pronouns they/them/theirs',
        },
      ],
    }
  },
  methods: {
    ...mapActions({
      onboard: 'auth/onboard',
    }),
    async submit() {
      if (this.loading) return
      this.loading = true
      this.errors = []
      this.success = null
      console.log({ onboardingData: this.onboardingData })
      try {
        const result = await this.onboard(this.onboardingData)
        if (result.success) {
          this.success = result.message
          this.$router.push('/')
        } else {
          this.handleErrors(result)
        }
      } catch (error) {
        console.log({ error })
      } finally {
        this.clearErrors()
        this.loading = false
      }
      // try {
      //   const response = await this.$axios.post(
      //     '/api/auth/onboarding',
      //     this.onboardingData
      //   )
      //   this.success = response.data.message
      //   this.$router.push('/auth/login')
      // } catch (error) {
      //   this.errors = error.response.data.errors
      // } finally {
      //   this.loading = false
      // }
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    selectGender(e) {
      console.log({ e })
      this.gender = e
      this.onboardingData.gender = e.value
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