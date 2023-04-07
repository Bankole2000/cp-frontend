<template>
  <v-menu content-class="elevated-light rounded-lg" left offset-y>
    <template #activator="{ on: menu, attrs }">
      <v-hover v-slot="{ hover }">
        <div
          v-bind="attrs"
          class="d-flex align-center justify-start"
          style="cursor: pointer"
          v-on="{ ...menu }"
        >
          <v-btn
            icon
            :disabled="loading"
            :loading="loading"
            class="mr-1"
            small
            :class="
              hover && $vuetify.theme.dark
                ? 'bg-success-dk'
                : hover && !$vuetify.theme.dark
                ? 'bg-success-lt'
                : ''
            "
            :color="hover || repostedByUser ? 'success' : ''"
          >
            <v-icon size="24">mdi-repeat-variant</v-icon>
          </v-btn>
          <span
            v-if="!!repostCount"
            class="font-weight-regular"
            :class="hover || repostedByUser ? 'success--text' : ''"
            >{{ repostCount | count }}</span
          >
        </div>
      </v-hover>
    </template>

    <v-list dense class="py-0">
      <v-list-item-group>
        <!-- :disabled="!socketsReady" -->
        <v-list-item @click="repostPost">
          <v-list-item-icon>
            <v-icon size="24" :color="repostedByUser ? 'error' : 'info'"
              >mdi-repeat-variant</v-icon
            >
          </v-list-item-icon>
          <v-list-item-content
            class="ml-n4"
            :class="{ 'error--text': repostedByUser }"
            >{{
              repostedByUser ? 'Undo Repost' : 'Repost'
            }}</v-list-item-content
          >
        </v-list-item>
        <v-list-item @click="quotePost">
          <v-list-item-icon>
            <v-icon size="24">mdi-comment-quote-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ml-n4">Quote Post</v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    postId: {
      type: String,
      required: true,
      default: '',
    },
    // socketsReady: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
    // postSocket: {
    //   type: Object,
    //   required: true,
    //   default: () => {},
    // },
    repostedByUser: {
      type: Boolean,
      required: false,
      default: false,
    },
    repostCount: {
      type: Number,
      required: false,
      default: 0,
    },
    isRepostOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      // repostCount: 0,
      listenersActive: false,
      loading: false,
    }
  },
  // watch: {
  //   async socketsReady(newVal) {
  //     if (newVal) {
  //       await this.getRepostCount()
  //       // await this.startSocketListeners()
  //     }
  //   },
  // },
  beforeDestroy() {
    console.log('beforeDestroy')
    // this.postSocket.removeAllListeners('GET_REPOST_COUNT', (data) => {
    //   console.log('Event off', data)
    // })
  },
  // beforeUnmount() {
  //   console.log('Unmounting')
  // },
  // async mounted() {
  //   if (this.socketsReady) {
  //     await this.getRepostCount()
  //     await this.startSocketListeners()
  //   }
  // },
  methods: {
    ...mapActions({
      showLoginModal: 'ui/showLoginModal',
    }),
    startSocketListeners() {
      console.log({ listenersActive: this.listenersActive })
      if (this.listenersActive) return
      // this.postSocket.on('POST_REPOSTED', (data) => {
      //   console.log('POST_REPOSTED')
      //   console.log({ data })
      // })
      // this.postSocket.on('GET_REPOST_COUNT', (data) => {
      //   if (this.postId === data.postId) {
      //     console.log(
      //       'Got repost count',
      //       data.postId,
      //       `is repost ${this.isRepostOnly}`
      //     )
      //     this.repostCount = data.count
      //   }
      // })
      this.listenersActive = true
    },
    // async getRepostCount() {
    //   await this.postSocket.emit('GET_REPOST_COUNT', {
    //     postId: this.postId,
    //   })
    // },
    async repostPost() {
      if (!this.$store.getters['auth/user']) {
        this.showLoginModal({ action: 'repost' })
        return
      }
      if (this.loading) return
      this.loading = true
      try {
        const url = new URL(
          `${this.$store.getters.postPath}/posts/${this.postId}/reposts`
        )
        let result
        if (this.repostedByUser) {
          result = await this.$axios.$delete(url.href)
        } else {
          result = await this.$axios.$post(url.href)
        }
        console.log({ result })
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
      console.log('repost')
    },
    quotePost() {
      if (!this.$store.getters['auth/user']) {
        this.showLoginModal({ action: 'quoteRepost' })
        return
      }
      console.log('Quote Repost')
      this.$emit('show-quote-post-modal')
    },
  },
}
</script>

<style></style>
