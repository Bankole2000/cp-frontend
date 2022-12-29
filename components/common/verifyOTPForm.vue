<template>
  <div class="verify-email-otp-form">
    <v-otp-input
      style="font-size: 4rem"
      v-model="otp"
      :disabled="loading"
      @finish="onFinish"
      @change="onChange"
      @input="onInput"
    ></v-otp-input>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      otp: '',
    }
  },
  methods: {
    onFinish(e) {
      this.$emit('otpComplete')
      console.log({ e, otp: this.otp })
    },
    onChange(e) {
      console.log('Changed')
      console.log({ e, otp: this.otp })
      this.$emit('otpChange', this.otp)
    },
    onInput(e) {
      console.log('Input')
      console.log({ e, otp: this.otp })
      this.$emit('otpInput', this.otp)
    },
  },
}
</script>

<style>
</style>