<template>
  <div class="register-email">
    <h1>Register Email Page</h1>
    <RegisterEmailForm />
  </div>
</template>

<script>
import RegisterEmailForm from '~/components/forms/auth/RegisterEmailForm.vue'
export default {
  name: 'RegisterEmail',
  components: {
    RegisterEmailForm,
  },
}
</script>

<style>
</style>