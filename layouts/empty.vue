<template>
  <v-app>
    <div>
      <v-main>
        <transition name="router-anim">
          <nuxt />
        </transition>
        <MultiSnackBars />
      </v-main>
    </div>
  </v-app>
</template>
<script>
import MultiSnackBars from '~/components/shared/SnackBars.vue'
export default {
  components: {
    MultiSnackBars,
  },
}
</script>
<style>
</style>