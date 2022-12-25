<template>
  <v-app>
    <div>
      <v-main>
        <v-btn dark color="red" class="mt-6" @click="showMessage"
          >Click Me</v-btn
        >
        <v-btn
          :dark="interactivities.length === 0"
          color="blue"
          class="mt-6 ml-3"
          :disabled="interactivities.length > 0"
          @click="showInteractivity"
          >Show Interactivity</v-btn
        >
        <v-btn dark color="green" class="mt-6 ml-3" @click="addObject()"
          >Random Toast</v-btn
        >
        <v-btn @click="testToast">Test Custom Vuex Toast</v-btn>
        <v-switch v-model="$vuetify.theme.dark"></v-switch>
        <div class="d-flex align-center my-4">
          <v-btn text @click="testMessage('loading')">Loading Toast</v-btn>
          <v-btn text class="mx-2 success" @click="testMessage('success')"
            >Success Toast</v-btn
          >
          <v-btn text class="mx-2 error" @click="testMessage('error')"
            >Error Toast</v-btn
          >
          <v-btn text class="mx-2 info" @click="testMessage('info')"
            >Info Toast</v-btn
          >
          <v-btn text class="mx-2 warning" @click="testMessage('warning')"
            >Warning Toast</v-btn
          >
          <v-btn text class="mx-2 primary" @click="testMessage('primary')"
            >Primary Toast</v-btn
          >
          <v-btn text class="mx-2 secondary" @click="testMessage('secondary')"
            >Secondary Toast</v-btn
          >
          <v-btn text class="mx-2 accent" @click="testMessage('accent')"
            >Accent Toast</v-btn
          >
          <v-btn text class="mx-2" @click="testMessage('withAction')"
            >Action Toast</v-btn
          >
        </div>
        <v-card>
          <div class="d-flex align-center my-4">
            <v-btn text @click="testMessage('loading')">Loading Toast</v-btn>
            <v-btn
              text
              class="mx-2"
              color="success"
              @click="testMessage('success')"
              >Success Toast</v-btn
            >
            <v-btn text class="mx-2" color="error" @click="testMessage('error')"
              >Error Toast</v-btn
            >
            <v-btn text class="mx-2" color="info" @click="testMessage('info')"
              >Info Toast</v-btn
            >
            <v-btn
              text
              class="mx-2"
              color="warning"
              @click="testMessage('warning')"
              >Warning Toast</v-btn
            >
            <v-btn
              text
              class="mx-2"
              color="primary"
              @click="testMessage('primary')"
              >Primary Toast</v-btn
            >
            <v-btn
              text
              class="mx-2"
              color="secondary"
              @click="testMessage('secondary')"
              >Secondary Toast</v-btn
            >
            <v-btn
              text
              class="mx-2"
              color="accent"
              @click="testMessage('accent')"
              >Accent Toast</v-btn
            >
            <v-btn text class="mx-2" @click="testMessage('withAction')"
              >Action Toast</v-btn
            >
          </div>
        </v-card>
        <v-card>
          <HoverButton color="primary" :disabled="true" />
          <HoverButton color="primary" class="mx-4" icon="mdi-phone" />
          <v-btn icon color="primary"><v-icon>mdi-phone</v-icon></v-btn>
          <HoverButton color="secondary" />
          <HoverButton color="error" />
          <HoverButton color="success" />
          <HoverButton color="warning" />
          <HoverButton color="info" />
          <HoverButton color="accent" />
        </v-card>
        <v-container>
          <v-row>
            <v-col cols="6" offset="3">
              <offer-card-item />
            </v-col>
            <v-col cols="6" offset="3">
              <listing-card-item />
            </v-col>
          </v-row>
        </v-container>
        <div>
          <v-text-field v-model="text"> </v-text-field>
          <v-text-field
            v-model.number="timeoutValue"
            type="number"
            :min="-1"
            :step="1000"
            :max="10000"
          ></v-text-field>
        </div>
        <!-- color="red" -->
        <v-snackbars :messages.sync="messages" bottom left></v-snackbars>
        <v-snackbars
          :messages.sync="interactivities"
          color="blue"
          :timeout="-1"
          bottom
          right
        >
          <template #action="{ close, message }">
            <div
              v-if="message.startsWith('Sending')"
              style="width: 76px"
              class="text-center"
            >
              <v-progress-circular
                indeterminate
                :width="2"
                :size="25"
              ></v-progress-circular>
            </div>
            <v-btn v-else text @click="close()">Close</v-btn>
          </template>
        </v-snackbars>
        <v-snackbars :objects.sync="objects"></v-snackbars>
        <transition name="router-anim">
          <nuxt />
        </transition>
        <SnackBars />
        <MultiSnackBars />
      </v-main>
    </div>
  </v-app>
</template>
<script>
import VSnackbars from 'v-snackbars'
import { mapActions } from 'vuex'
import SnackBars from '~/components/shared/CustomSnackBars.vue'
import MultiSnackBars from '~/components/shared/SnackBars.vue'
import {
  loadingMessage,
  successMessage,
  errorMessage,
  warningMessage,
  infoMessage,
  primaryMessage,
  secondaryMessage,
  accentMessage,
} from '~/utils/messaging'
import OfferCardItem from '~/components/blocks/OfferCardItem.vue'
import ListingCardItem from '~/components/blocks/ListingCardItem.vue'

export default {
  components: {
    VSnackbars,
    SnackBars,
    MultiSnackBars,
    OfferCardItem,
    ListingCardItem,
  },
  data: () => ({
    text: '',
    timeoutValue: -1,
    messages: [],
    interactivities: [],
    indexText: 0,
    randomText: [
      '📞 Lorem ipsum dolor sit amet',
      '📢 this is a very long text to show how the toast will handle this special case when the content is very long and shows on more than 1 line',
      '📲 consectetur adipiscing elit',
      '📩 sed do eiusmod tempor',
      '🎉 incididunt ut labore et dolore',
      '💳 magna aliqua',
      '🥳 Turpis massa tincidunt',
      '🔐 dui ut ornare',
      '💬 Tempor nec feugiat nisl',
      '🐇 pretium fusce id velit',
      '🔥 At imperdiet dui accumsan sit',
      '🏠 Id volutpat lacus',
    ],
    objects: [],
    colors: [
      'red',
      'blue',
      'green',
      'purple',
      'pink',
      'brown',
      'blue-grey',
      'orange',
      'lime',
      'cyan',
    ],
    transitions: ['fab-transition', 'scale-transition', 'fade-transition'],
  }),
  mounted() {
    this.$vuetify.theme.dark = false
  },
  methods: {
    ...mapActions({
      showToast: 'ui/showMessage',
      updateToast: 'ui/updateMessage',
    }),
    async testToast() {
      const messageId = await this.showToast({
        message: {
          text: 'Publishing Listing',
          // title: 'Original Title',

          icon: 'mdi-information',
          loading: true,
          dismissible: true,
        },
        color: 'grey darken-4',
      })
      setTimeout(() => {
        this.updateToast({
          uuid: messageId,
          message: {
            text: "Here's a really long message to test something - Listing Published",
            // title: 'Changed',
            icon: 'mdi-check',
            loading: false,
            timeout: 5000,
            type: 'success',
            dismissible: true,
          },
          color: 'success',
          timeout: 5000,
        })
      }, 5000)
    },
    showMessage() {
      if (this.indexText >= this.randomText.length) this.indexText = 0
      this.messages.push(this.randomText[this.indexText++])
    },
    async showInteractivity() {
      this.interactivities.push('Sending email to Alice…')
      await this.timeout(1)
      this.interactivities.push('Sending email to Bob…')
      await this.timeout(2)
      this.$set(this.interactivities, 0, 'Email sent to Alice!')
      // remove notification:
      setTimeout(() => this.interactivities.splice(0, 1), 3000)
      await this.timeout(5)
      this.$set(this.interactivities, 0, 'Email sent to Bob!')
      // remove notification:
      setTimeout(() => this.interactivities.splice(0, 1), 2000)
    },
    addObject() {
      if (this.indexText >= this.randomText.length) this.indexText = 0
      const randomColor = Math.floor(Math.random() * 11)
      const randomTransition = Math.floor(Math.random() * 3)
      const randomTop = Math.random() * 100
      const randomLeft = Math.random() * 100
      this.objects.push({
        message: this.randomText[this.indexText++],
        top: randomTop > 50,
        bottom: randomTop <= 50,
        left: randomLeft > 50,
        right: randomLeft <= 50,
        color: this.colors[randomColor],
        transition: this.transitions[randomTransition],
        timeout: Math.random() * 10000,
      })
    },
    timeout(delay) {
      return new Promise((_resolve, _reject) => {
        setTimeout(_resolve, delay * 1000)
      })
    },
    async testMessage(type) {
      let newMessage
      switch (type) {
        case 'loading':
          newMessage = loadingMessage({
            text: this.text || undefined,
            timeout: this.timeoutValue || undefined,
          })
          break
        case 'success':
          newMessage = successMessage({
            text: this.text || undefined,
            timeout: this.timeoutValue || undefined,
          })
          break
        case 'error':
          newMessage = errorMessage({ text: this.text || undefined })
          break
        case 'info':
          newMessage = infoMessage({ text: this.text || undefined })
          break
        case 'warning':
          newMessage = warningMessage({ text: this.text || undefined })
          break
        case 'primary':
          newMessage = primaryMessage({ text: this.text || undefined })
          break
        case 'secondary':
          newMessage = secondaryMessage({ text: this.text || undefined })
          break
        case 'accent':
          newMessage = accentMessage({ text: this.text || undefined })
          break
        case 'withAction':
          newMessage = errorMessage({
            text: "<a href='https://google.com' class='white--text text-decoration-none' target='_blank'>We've made some changes to the way you can manage your listings. <strong>Click here to learn more.</strong></a>",
            timeout: -1,
            icon: false,
            title: 'Policy Update',
            color: null,
            action: {
              type: 'callback',
              text: 'Learn More',
              callback: () => {
                console.log('Learn More')
              },
            },
          })
          break

        default:
          break
      }
      await this.showToast(newMessage)
    },
  },
}
</script>
<style>
.router-anim-enter-active {
  animation: coming 0.5s;
  animation-delay: 0.3s;
  opacity: 0;
}

.router-anim-leave-active {
  animation: going 0.3s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
  }
}

@keyframes coming {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>