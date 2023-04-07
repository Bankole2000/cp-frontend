<template>
  <div>
    <VSnackbars :objects.sync="messages" bottom left :timeout="-1">
      <template #default="{ message }">
        <h3 v-if="message.title" class="mb-2">{{ message.title }}</h3>
        <div class="d-flex align-center">
          <v-icon
            v-if="message.icon"
            :color="message.iconColor || 'white'"
            small
            class="mr-2"
            >{{ message.icon }}</v-icon
          >
          <!-- v-if="message.avatar" -->
          <v-avatar v-if="message.avatar" size="35" class="mr-2">
            <img
              :src="
                message.avatar
                  ? message.avatar
                  : 'https://randomuser.me/api/portraits/women/75.jpg'
              "
            />
          </v-avatar>
          <p class="my-0 py-0">
            <strong v-if="message.type" class="text-capitalize">
              {{ message.type }}:</strong
            >
            <!-- {{ message.text }} -->
            <span v-html="message.text"> </span>
          </p>
        </div>
        <v-progress-linear
          v-if="message.loading"
          absolute
          :height="3"
          bottom
          indeterminate
          :color="message.progressColor || 'white'"
        ></v-progress-linear>
        <SnackBarProgress
          v-else
          :color="message.progressColor || 'white'"
          :timeout="message.timeout"
        />
      </template>
      <template v-if="!$vuetify.breakpoint.xs" #action="{ close, message }">
        <v-progress-circular
          v-if="message.loading"
          width="2"
          size="25"
          class="mx-4"
          indeterminate
          :color="message.progressColor || 'white'"
        ></v-progress-circular>
        <v-btn
          v-if="!message.action && !message.loading"
          text
          class="text-capitalize"
          @click="close()"
          >Dismiss</v-btn
        >
        <v-btn
          v-if="message.action"
          class="text-capitalize"
          text
          @click="takeAction(message.action, close)"
          >{{ message.action.text }}</v-btn
        >
        <v-btn
          v-if="message.action || (message.loading && message.timeout == -1)"
          small
          icon
          color="white"
          @click="close()"
        >
          <v-icon small>mdi-window-close</v-icon></v-btn
        >
      </template>
      <template v-else #action="{ close, message }">
        <v-btn
          v-if="message.action || (message.loading && message.timeout == -1)"
          small
          icon
          color="white"
          @click="close()"
        >
          <v-icon small>mdi-window-close</v-icon></v-btn
        >
      </template>
    </VSnackbars>
  </div>
</template>

<script>
import VSnackbars from 'v-snackbars'
import SnackBarProgress from './SnackBarProgress.vue'
export default {
  components: {
    VSnackbars,
    SnackBarProgress,
  },
  computed: {
    messages: {
      get() {
        return this.$store.state.ui.messages
      },
      set(value) {
        this.$store.commit('ui/setMessages', value)
      },
    },
  },
  mounted() {
    console.log('snackbars mounted')
  },
  methods: {
    takeAction(action, close) {
      this.performAction(action)
      close()
    },
    async performAction(action) {
      switch (action.type) {
        case 'route':
          this.$router.push(action.route)
          break
        case 'url':
          window.open(action.url, '_blank')
          break
        case 'callback':
          action.callback()
          break
        case 'multiple':
          action.actions.forEach((action) => {
            this.performAction(action)
          })
          break
        case 'action': {
          await this.$store.dispatch(`${action.vuexAction}`, action.vuexData)
          break
        }
        default:
          break
      }
    },
  },
}
</script>

<style></style>
