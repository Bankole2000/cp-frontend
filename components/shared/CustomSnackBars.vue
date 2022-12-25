<template>
  <div>
    <h1>Snackbars will be here</h1>
    <!-- <v-scroll-y-reverse-transition group class="py-0"> -->
    <div>
      <v-snackbar
        v-for="(message, i) in messages"
        :key="message.uuid"
        transition="slide-x-reverse-transition"
        top
        right
        :value="message.show"
        :timeout="message.timeout"
        :style="{ 'margin-top': calcMargin(i) }"
      >
        {{ message.message }} {{ i }}
      </v-snackbar>
    </div>
    <!-- </v-scroll-y-reverse-transition> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapGetters({ messages: 'ui/messages' }),
  },
  methods: {
    // ...mapActions({}),
    calcMargin(i) {
      return i * 70 + 'px'
    },
  },
}
</script>

<style>
</style>