<template>
  <div
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
            <RegisterEmailForm
              @goback="goback"
              @signupSuccess="signupSuccess"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import RegisterEmailForm from '~/components/forms/auth/RegisterEmailForm.vue'
export default {
  name: 'RegisterEmail',
  components: {
    RegisterEmailForm,
  },
  methods: {
    goback() {
      console.log('Go back')
      this.$router.push({ name: 'auth-signup' })
    },
    signupSuccess() {
      this.$router.push({ name: 'auth-verify' })
    },
  },
}
</script>

<style>
</style>