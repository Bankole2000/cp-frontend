<template>
  <v-progress-linear
    absolute
    :indeterminate="timeout == -1"
    :height="3"
    bottom
    :color="color"
    :value="Math.floor(100 * (currentTime / timeout))"
  >
  </v-progress-linear>
</template>

<script>
export default {
  props: {
    timeout: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: 'white',
    },
  },
  data() {
    return {
      currentTime: 0,
    }
  },
  mounted() {
    this.currentTime = this.timeout
    this.syncPbar()
  },
  methods: {
    syncPbar() {
      // Create a timeout every 100 miliseconds
      setTimeout(() => {
        // Increment the time counter by 100
        this.currentTime -= 100

        // If our current time is larger than the timeout
        if (this.currentTime <= 0) {
          // Wait 500 miliseconds for the dom to catch up, then reset the snackbar
          setTimeout(() => {
            this.$emit('close') // Update the v-model to false
            this.currentTime = 0 // reset the current time
          }, 500)
        } else {
          // Recursivly update the progress bar
          this.syncPbar()
        }
      }, 100)
    },
  },
}
</script>

<style>
</style>