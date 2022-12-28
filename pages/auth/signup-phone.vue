<template>
  <div
    class="register-phone"
    style="
      display: flex;
      justify-content: center;
      height: 100vh;
      align-items: center;
    "
    :style="{ backgroundColor: $vuetify.theme.dark ? '#FFFFFF' : '#FFFFFF' }"
  >
    <v-container>
      <v-row class="mb-16">
        <v-col cols="12">
          <div
            :class="{
              'px-4': $vuetify.breakpoint.smAndDown,
              'px-12': $vuetify.breakpoint.mdAndUp,
            }"
          >
            <RegisterPhoneForm
              @signupSuccess="signupSuccess"
              @goback="goback"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import RegisterPhoneForm from '~/components/forms/auth/RegisterPhoneForm.vue'
export default {
  name: 'RegisterPhone',
  components: {
    RegisterPhoneForm,
  },
  methods: {
    goback() {
      console.log('Go back')
      this.$router.push({ name: 'auth-signup' })
    },
    signupSuccess() {
      this.$router.push({ name: 'index' })
    },
  },
}
</script>

<style>
</style>