<template>
  <div class="login-phone-form">
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
          <v-col cols="12" md="4" class="py-0">
            <!-- <PhoneCountrySelect
              :country-code="visitorData ? visitorData.countryCode : null"
              @phoneCountryCodeSelected="selectCountryCode"
            /> -->
            <v-hover v-slot="{ hover }">
              <v-card
                outlined
                :disabled="loading"
                ref="countrySelectTrigger"
                class="rounded-xl d-flex align-center px-2 py-2"
                :class="{ 'elevated-light': hover }"
                :focusable="false"
                style="cursor: pointer; transition: all 0.3s ease-in-out"
                @click="showCountrySelectModal = true"
              >
                <div
                  v-if="visitorData"
                  class="mr-2"
                  :style="{
                    backgroundImage: `url(${visitorData.smallFlag})`,
                  }"
                  style="
                    width: 30px;
                    height: 30px;
                    background-position: 50% 50%;
                    background-size: 150%;
                    border-radius: 50%;
                  "
                ></div>
                <v-icon v-else size="30">mdi-web</v-icon>
                <p v-if="visitorData" class="mb-0 text-button text-truncate">
                  {{ visitorData.countryCode }}
                  <span class="text--secondary text-truncate"
                    >({{ visitorData.phoneCode }})</span
                  >
                </p>
                <v-spacer></v-spacer>
                <v-icon>mdi-chevron-down</v-icon>
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="12" md="8" class="py-0">
            <v-text-field
              v-model="loginData.phone"
              label="Phone Number"
              type="text"
              ref="phoneInput"
              filled
              rounded
              single-line
              placeholder="Phone Number"
              prepend-inner-icon="mdi-phone"
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
              :disabled="loading"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <div class="d-flex">
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
                  >Login
                  <v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
              </v-hover>
            </div>
          </v-col>
        </v-row>
        <countrySelectModal
          ref="countrySelectModal"
          :dialog="showCountrySelectModal"
          :country-code="visitorData ? visitorData.countryCode : null"
          @close="showCountrySelectModal = false"
          @selectedCountry="selectCountryCode"
        />
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CountrySelectModal from '~/components/modals/CountrySelectModal.vue'

export default {
  name: 'LoginPhoneForm',
  components: { CountrySelectModal },
  data() {
    return {
      loading: false,
      loginData: {
        phone: '',
        countryCode: '',
        password: '',
      },
      showPassword: false,
      showCountrySelectModal: false,
      success: '',
      errors: [],
      selectedCountry: null,
    }
  },
  computed: {
    ...mapGetters({
      visitorData: 'settings/visitorData',
    }),
  },
  mounted() {
    this.visitorData && this.selectCountryCode(this.visitorData)
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
        this.selectedCountry = e
        this.showCountrySelectModal = false
      }
    },
    async submit() {
      if (this.loading) return
      this.loading = true
      if (!this.loginData.phone) {
        this.errors.push('Phone Number is required')
        this.loading = false
        this.clearErrors()
        return
      }
      if (!this.loginData.password) {
        this.errors.push('Password is required')
        this.loading = false
        this.clearErrors()
        return
      }
      try {
        const result = await this.loginWithPhoneNumber(this.loginData)
        console.log({ result })
        if (result.success) {
          this.$emit('loginSuccess')
        }
        if (result.errors.name === 'ParseError') {
          this.errors.push('Invalid Phone Number')
        } else {
          this.handleErrors(result)
        }
      } catch (error) {
        console.log({ error })
      } finally {
        this.clearErrors()
        this.loading = false
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