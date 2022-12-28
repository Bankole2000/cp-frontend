<template>
  <v-app>
    <v-main>
      <div style="width: 100vw; height: 100vh; display: flex">
        <div
          v-if="$vuetify.breakpoint.lgAndUp"
          style="flex: 6; z-index: 1; background-color: white"
        >
          <h1>Here's the auth pages'</h1>
          <router-link to="/auth/login-email">Login with email</router-link>
          <router-link to="/auth/login-phone">Login With phone</router-link>
          <router-link to="/auth/register-email"
            >Register with email</router-link
          >
          <router-link to="/auth/register-phone">Register phone</router-link>
          <router-link to="/auth/forgot-password">Forgot Password</router-link>
        </div>
        <div style="flex: 4; border-left: 1px solid grey; z-index: 0">
          <!-- <transition name="router-anim"> -->

          <nuxt-child />

          <!-- </transition> -->
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
}
</script>

<style>
/* .router-anim-enter-active {
  animation: coming 0.5s;
  animation-delay: 0.3s;
  opacity: 0;
}

.router-anim-leave-active {
  animation: going 0.3s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
  }
}

@keyframes coming {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
} */
</style>