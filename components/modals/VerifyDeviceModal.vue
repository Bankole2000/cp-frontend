<template>
  <div>
    <v-dialog
      v-model="dialog"
      content-class="elevated-light rounded-xl"
      persistent
      :width="$vuetify.breakpoint.smAndDown ? '100vw' : '400'"
    >
      <v-card class="rounded-xl elevated-light">
        <v-card-title class="headline">Device Verification</v-card-title>

        <v-card-text>
          <v-otp-input
            v-model="code"
            style="font-size: 4rem"
            :disabled="loading"
            :loading="loading"
            @finish="otpComplete"
          ></v-otp-input>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red accent-2" text @click="cancel">
            <v-icon left>mdi-close</v-icon>
            Cancel
          </v-btn>
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
              @click="verifyAttempt"
            >
              Verify
            </v-btn>
          </v-hover>
        </v-card-actions>
        <v-overlay absolute :opacity="0.1" :value="loading">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      code: '',
      loading: false,
    }
  },
  computed: {
    ...mapState({
      verifData: (state) => state.auth.verifData,
    }),
    deviceId() {
      return this.verifData ? this.verifData.deviceId : null
    },
    type() {
      return this.verifData ? this.verifData.type : null
    },
    userId() {
      return this.verifData ? this.verifData.userId : null
    },
    username() {
      return this.verifData ? this.verifData.username : null
    },
    email() {
      return this.verifData ? this.verifData.email : null
    },
    phone() {
      return this.verifData ? this.verifData.phone : null
    },
    dialog: {
      get() {
        return this.$store.state.ui.showVerifyDeviceModal
      },
      set(v) {
        this.$store.commit('ui/showVerifyDeviceModal', v)
      },
    },
  },
  mounted() {
    console.log({ dialog: this.$store.state.ui.showVerifyDeviceModal })
  },
  methods: {
    ...mapActions({
      verifyDeviceLogin: 'auth/verifyDeviceLogin',
    }),
    async otpComplete(e) {
      await this.verifyAttempt()
    },
    async verifyAttempt() {
      if (this.loading) return
      this.loading = true
      const { userId, code, email, type, phone, deviceId, username } = this
      try {
        const result = await this.verifyDeviceLogin({
          code,
          email,
          type,
          phone,
          username,
          deviceId,
          userId,
        })
        console.log({ result })
        if (result.success) {
          this.code = ''
          this.$emit('deviceVerified')
        }
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
    },
    cancel() {
      this.otp = ''
      this.$emit('cancel')
    },
  },
}
</script>

<style>
</style>