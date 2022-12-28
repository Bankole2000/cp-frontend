<template>
  <div class="register-phone">
    <v-form @submit.prevent="submit">
      <v-container>
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
          <v-col cols="12" md="6" class="py-0">
            <v-text-field
              v-model.trim="registerData.firstname"
              :readonly="loading"
              prepend-inner-icon="mdi-account-outline"
              :disabled="loading"
              label="First Name"
              rounded
              filled
              type="text"
              single-line
              placeholder="First Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-text-field
              v-model.trim="registerData.lastname"
              :readonly="loading"
              prepend-inner-icon="mdi-account-outline"
              :disabled="loading"
              label="Last Name"
              rounded
              filled
              type="text"
              single-line
              placeholder="Last Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="py-0">
            <!-- <PhoneCountrySelect
              @phoneCountryCodeSelected="selectCountryCode"
              :country-code="visitorData ? visitorData.countryCode : null"
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
              v-model="registerData.phone"
              :readonly="loading"
              :disabled="loading"
              label="Phone Number"
              prepend-inner-icon="mdi-phone"
              rounded
              filled
              type="text"
              single-line
              placeholder="Phone Number"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="py-0">
            <v-dialog
              ref="dialog"
              v-model="dateModal"
              :return-value.sync="registerData.dob"
              persistent
              width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="registerData.dob"
                  label="Date of birth"
                  prepend-inner-icon="mdi-calendar-check"
                  readonly
                  rounded
                  :disabled="loading"
                  filled
                  single-line
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="registerData.dob"
                :active-picker="activePicker"
                :max="new Date().toISOString().substring(0, 10)"
                scrollable
                @click:date="$refs.dialog.save(registerData.dob)"
              >
              </v-date-picker>
            </v-dialog>
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
                  >Signup
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
import { mapGetters, mapActions } from 'vuex'
import CountrySelectModal from '~/components/modals/CountrySelectModal.vue'
export default {
  name: 'RegisterPhoneForm',
  components: { CountrySelectModal },
  data() {
    return {
      loading: false,
      registerData: {
        firstname: '',
        lastname: '',
        phone: '',
        countryCode: '',
        dob: null,
        tos: false,
      },
      dateModal: false,
      showCountrySelectModal: false,
      success: '',
      errors: [],
      activePicker: 'YEAR',
      selectedCountry: null,
    }
  },
  computed: {
    ...mapGetters({
      visitorData: 'settings/visitorData',
    }),
  },

  watch: {
    dateModal(val) {
      val &&
        setTimeout(() => {
          this.$refs.picker.activePicker = 'YEAR'
          this.$refs.picker.internalActivePicker = 'YEAR'
        })
    },
  },
  mounted() {
    this.visitorData && this.selectCountryCode(this.visitorData)
  },
  methods: {
    ...mapActions({
      register: 'auth/registerWithPhoneNumber',
    }),
    selectCountryCode(e) {
      console.log({ e })
      if (e) {
        this.registerData.countryCode = e.countryCode
        this.selectedCountry = e
        this.showCountrySelectModal = false
      }
    },
    async submit() {
      if (this.loading) return
      this.loading = true
      try {
        const result = await this.register(this.registerData)
        if (result.success) {
          this.$emit('signupSuccess')
        } else {
          this.handleErrors(result)
        }
        console.log({ result })
      } catch (error) {
        console.log({ error })
      } finally {
        this.clearErrors()
        this.loading = false
      }
    },
    clearErrors() {
      setTimeout(() => {
        this.errors = []
      }, 5000)
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