<template>
  <div class="register-phone">
    <v-form @submit.prevent="submit">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="registerData.firstname"
              label="First Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="registerData.lastname"
              label="Last Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <PhoneCountrySelect
              @phoneCountryCodeSelected="selectCountryCode"
              :country-code="visitorData ? visitorData.countryCode : null"
            />
          </v-col>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="registerData.phone"
              label="Phone Number"
              prepend-icon="mdi-phone"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
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
                  prepend-icon="mdi-calendar-check"
                  readonly
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
          <v-col cols="12">
            <div class="d-flex align-center">
              <v-btn text class="text-capitalize"
                ><v-icon left>mdi-arrow-left</v-icon> Back</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn type="submit" :loading="loading" :disabled="loading"
                >Signup</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'RegisterPhoneForm',
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
      errors: [],
      activePicker: 'YEAR',
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
  methods: {
    ...mapActions({
      register: 'auth/registerWithPhoneNumber',
    }),
    selectCountryCode(e) {
      console.log({ e })
      if (e) {
        this.registerData.countryCode = e.countryCode
      }
    },
    async submit() {
      if (this.loading) return
      this.loading = true
      try {
        const result = await this.register(this.registerData)
        console.log({ result })
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style>
</style>