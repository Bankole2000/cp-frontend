<template>
  <div>
    <h1>User Login Page</h1>
    <LoginForm @loginSuccess="$router.push({ path: '/auth/' })" />
  </div>
</template>

<script>
import LoginForm from '../../components/forms/auth/LoginForm.vue'
export default {
  components: { LoginForm },
}
</script>

<style>
</style>