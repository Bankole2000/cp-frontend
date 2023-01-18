<template>
  <div class="forgot-password-form">
    <v-container>
      <v-row>
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
      <v-scroll-y-transition>
        <v-row v-show="!showOTPForm">
          <v-col cols="12" class="py-0">
            <div class="d-flex">
              <v-switch
                v-model="usePhone"
                inset
                :label="`Switch to ${usePhone ? 'Email' : 'Phone'}`"
              ></v-switch>
            </div>
            <v-scroll-y-transition leave-absolute hide-on-leave>
              <div v-show="!usePhone">
                <v-text-field
                  v-model="forgotPasswordData.email"
                  label="Email or @username"
                  type="text"
                  :prepend-inner-icon="
                    isEmail ? 'mdi-email-outline' : 'mdi-account-outline'
                  "
                  filled
                  rounded
                  single-line
                  :readonly="loading"
                  :disabled="loading"
                  @keyup.enter="requestForgotPassword"
                ></v-text-field>
              </div>
            </v-scroll-y-transition>
            <v-scroll-y-transition leave-absolute hide-on-leave>
              <div v-show="usePhone">
                <div class="d-flex align-start" style="width: 100%">
                  <v-hover v-slot="{ hover }">
                    <v-card
                      ref="countrySelectTrigger"
                      outlined
                      :disabled="loading"
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
                      <p
                        v-if="visitorData"
                        class="mb-0 text-button text-truncate"
                      >
                        {{ visitorData.countryCode }}
                        <span class="text--secondary text-truncate"
                          >({{ visitorData.phoneCode }})</span
                        >
                      </p>
                      <v-spacer></v-spacer>
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-card>
                  </v-hover>

                  <v-text-field
                    ref="phoneInput"
                    v-model="forgotPasswordData.phone"
                    label="Phone Number"
                    type="text"
                    class="ml-4"
                    filled
                    rounded
                    single-line
                    placeholder="Phone Number"
                    prepend-inner-icon="mdi-phone"
                  ></v-text-field>
                </div>
              </div>
            </v-scroll-y-transition>
          </v-col>
          <v-col cols="12">
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
                  @click="requestForgotPassword"
                  >Search
                  <v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
              </v-hover>
            </div>
          </v-col>
        </v-row>
      </v-scroll-y-transition>
      <v-scroll-y-transition>
        <v-row v-show="showOTPForm">
          <v-col cols="12">
            <div>
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
      </v-scroll-y-transition>
      <countrySelectModal
        ref="countrySelectModal"
        :dialog="showCountrySelectModal"
        :country-code="visitorData ? visitorData.countryCode : null"
        @close="showCountrySelectModal = false"
        @selectedCountry="selectCountryCode"
      />
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { isValidEmail } from '~/utils/validators'
import CountrySelectModal from '~/components/modals/CountrySelectModal.vue'
export default {
  components: { CountrySelectModal },

  data() {
    return {
      usePhone: false,
      forgotPasswordData: {
        email: '',
        phone: '',
        countryCode: '',
      },
      showCountrySelectModal: false,
      success: '',
      errors: [],
      selectedCountry: null,
      showOTPForm: false,
      loading: false,
      timer: 30,
      otp: '',
    }
  },
  computed: {
    ...mapGetters({
      visitorData: 'settings/visitorData',
    }),
    isEmail() {
      return isValidEmail(this.forgotPasswordData.email)
    },
    field() {
      return this.usePhone ? 'phone' : this.isEmail ? 'email' : 'username'
    },
  },
  methods: {
    ...mapActions({
      forgotPassword: 'auth/sendForgotPasswordRequest',
      verifyOTP: 'auth/verifyOTP',
      resendOTP: 'auth/resendOTP',
    }),
    selectCountryCode(e) {
      console.log({ e })
      if (e) {
        this.forgotPasswordData.countryCode = e.countryCode
        this.selectedCountry = e
        this.showCountrySelectModal = false
      }
    },
    async requestForgotPassword() {
      if (this.loading) return
      this.loading = true
      const { email, phone, countryCode } = this.forgotPasswordData
      try {
        const response = await this.forgotPassword({
          email,
          username: email.charAt(0) === '@' ? email.slice(1) : email,
          phone,
          countryCode,
          field: this.field,
        })
        console.log({ response })
        if (response.success) {
          this.success = response.message
          this.showOTPForm = true
          this.countDown()
        } else {
          this.handleErrors(response)
        }
      } catch (error) {
        console.log({ error })
      } finally {
        this.clearErrors()
        this.loading = false
      }
    },
    async otpComplete(e) {
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
          userId: this.$store.state.auth.verifData
            ? this.$store.state.auth.verifData.userId
            : null,
          type: this.$store.state.auth.verifData
            ? this.$store.state.auth.verifData.type
            : null,
          email: this.$store.state.auth.verifData
            ? this.$store.state.auth.verifData.email
            : null,
          phone: this.$store.state.auth.verifData
            ? this.$store.state.auth.verifData.phone
            : null,
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
          userId: this.$store.state.auth.verifData
            ? this.$store.state.auth.verifData.userId
            : null,
          OTP: this.otp,
          type: this.$store.state.auth.verifData
            ? this.$store.state.auth.verifData.type
            : null,
          email: this.$store.state.auth.verifData
            ? this.$store.state.auth.verifData.email
            : null,
          phone: this.$store.state.auth.verifData
            ? this.$store.state.auth.verifData.phone
            : null,
        })
        if (result.success) {
          this.success = result.message
          this.$router.push('/auth/reset-password')
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