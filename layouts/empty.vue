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
  name: 'Empty',
  components: {
    MultiSnackBars,
  },
  async mounted() {
    this.$store.commit('ui/setMessages', [])
    this.$vuetify.theme.dark = false
    await this.$store.dispatch('settings/getVisitorGeoData', null, {
      root: true,
    })
  },
}
</script>
<style>
</style>