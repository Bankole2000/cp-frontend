<template>
  <v-slide-y-transition group hide-on-leave>
    <v-skeleton-loader
      v-for="i in commentLoaders"
      :key="i"
      :boilerplate="false"
      :type="i % 2 === 0 ? 'list-item-avatar' : 'list-item-avatar-two-line'"
      class="mx-auto py-4 pr-6 pl-2"
    ></v-skeleton-loader>
  </v-slide-y-transition>
</template>

<script>
export default {
  data() {
    return {
      commentLoaders: [2, 1],
      interval: null,
    }
  },
  // beforeDestroy() {
  //   window.clearInterval(this.interval)
  //   window.clearTimeout(this.interval)
  // },
  // mounted() {
  //   window.clearInterval()
  //   this.animateCommentLoaders()
  //   console.log({ interval: this.interval })
  // },
  methods: {
    stopAnimation() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
        this.loading = false
      } else {
        this.animateCommentLoaders()
      }
    },
    animateCommentLoaders() {
      this.interval = setInterval(() => {
        this.commentLoaders.unshift(this.commentLoaders[0] + 1)
        if (this.commentLoaders.length > 2) {
          this.commentLoaders.pop()
        }
      }, 1000)
      this.loading = true
    },
  },
}
</script>

<style></style>
