<template>
  <div class="profile-page">
    <nuxt-child />
  </div>
</template>

<script>
export default {
  layout: 'admin',
  // scrollToTop: true,
  data() {
    return {
      visible: false,
    }
  },
  // mounted() {
  //   this.onElementObserved()
  // },
  // methods: {
  //   onElementObserved() {
  //     const observer = new IntersectionObserver((entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.intersectionRatio > 0) {
  //           // this.player.play();
  //           console.log('Is Intersecting')
  //           this.visible = true
  //         } else {
  //           // this.player.pause();
  //           console.log('NOT intersecting')
  //           this.visible = false
  //         }
  //       })
  //     })
  //     observer.observe(this.$refs.header)
  //   },
  // },
}
</script>

<style>
</style>