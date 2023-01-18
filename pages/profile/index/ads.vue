<template>
  <div class="personal-ads">
    <v-row ref="offerList">
      <v-col v-for="i in 6" :key="`${i}-b`" cols="12" xl="6">
        <OfferCardItem :id="`${i}-b`" class="mb-4" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  // scrollToTop: true,
  mounted() {
    this.onElementObserved()
  },
  methods: {
    onElementObserved() {
      const observer = new IntersectionObserver((entries) => {
        console.log({ entries })
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.75) {
            // this.player.play();
            console.log('Is Intersecting')
            // this.visible = true
          } else {
            // this.player.pause();
            console.log('NOT intersecting')
            // this.visible = false
          }
        })
      })
      observer.observe(this.$refs.offerList)
    },
  },
}
</script>

<style>
</style>