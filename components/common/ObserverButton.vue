<template>
  <div ref="more" class="text-center">
    <v-btn outlined rounded
      ><v-icon left>mdi-plus-circle-outline</v-icon>More</v-btn
    >
  </div>
</template>

<script>
export default {
  mounted() {
    this.onElementObserved()
  },
  methods: {
    onElementObserved() {
      const observer = new IntersectionObserver(
        (entries) => {
          console.log({ entries })
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log('Is Intersecting')
            } else {
              console.log('NOT Instersecting')
            }
            // if (entry.intersectionRatio > 0) {
            //   // this.player.play();
            //   console.log(`Is Intersecting`)

            //   // this.visible = true
            // } else {
            //   // this.player.pause();
            //   console.log(`Is NOT Intersecting`)
            //   // this.visible = false
            // }
          })
        },
        { threshold: 1 }
      )
      observer.observe(this.$refs.more)
    },
  },
}
</script>

<style></style>
