<template>
  <div class="register-phone">
    <h1>Register with phone page</h1>
    <RegisterPhoneForm />
  </div>
</template>

<script>
import RegisterPhoneForm from '~/components/forms/auth/RegisterPhoneForm.vue'
export default {
  name: 'RegisterPhone',
  components: {
    RegisterPhoneForm,
  },
}
</script>

<style>
</style>