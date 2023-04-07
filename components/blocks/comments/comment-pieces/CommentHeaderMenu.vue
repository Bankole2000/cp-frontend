<template>
  <v-menu
    v-model="menu"
    content-class="elevated-light rounded-lg"
    :close-on-content-click="false"
    offset-y
    left
  >
    <template #activator="{ on, attrs }">
      <v-btn small icon class="mx-2 mb-2 mt-0" v-bind="attrs" v-on="on">
        <v-icon size="24">mdi-dots-horizontal</v-icon>
      </v-btn>
    </template>
    <v-list v-if="comment.author" dense>
      <v-list-item-group color="primary">
        <v-list-item v-if="!loggedInUserId" @click="pinComment">
          <v-list-item-icon>
            <v-icon size="24">mdi-pin</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ml-n4"> Pin Comment </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-else-if="loggedInUserId === postAuthorId"
          @click="pinComment"
        >
          <v-list-item-icon>
            <v-icon
              v-if="!pinning"
              size="24"
              :color="comment.pinned ? 'error' : ''"
              >mdi-pin{{ comment.pinned ? '-off' : '' }}</v-icon
            >
            <v-progress-circular
              v-else
              size="20"
              width="2"
              indeterminate
            ></v-progress-circular>
          </v-list-item-icon>
          <v-list-item-content
            class="ml-n4"
            :class="{ 'error--text': comment.pinned }"
            >{{ comment.pinned ? 'Unpin' : 'Pin'
            }}{{ pinning ? 'ning...' : ' Comment' }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="reportComment">
          <v-list-item-icon>
            <v-icon size="24">mdi-flag</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ml-n4"> Report </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="comment.authorId !== loggedInUserId" @click="follow">
          <v-list-item-icon>
            <v-icon size="24">mdi-account-arrow-right-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ml-n4">
            Follow
            <span class="font-weight-bold"
              >@{{ comment.author.username }}</span
            ></v-list-item-content
          >
        </v-list-item>
        <v-list-item v-if="comment.authorId !== loggedInUserId">
          <v-list-item-icon>
            <v-icon size="24">mdi-account-minus-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ml-n4">
            Unfollow
            <span class="font-weight-bold"
              >@{{ comment.author.username }}</span
            ></v-list-item-content
          >
        </v-list-item>
        <v-list-item v-if="comment.authorId !== loggedInUserId" @click="block">
          <v-list-item-icon>
            <v-icon size="24">mdi-account-cancel-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ml-n4">
            Block
            <span class="font-weight-bold">@{{ comment.author.username }}</span>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="comment.authorId === loggedInUserId"
          @click="deleteComment"
        >
          <v-list-item-icon>
            <v-icon size="24" color="error">mdi-trash-can</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ml-n4 error--text">
            Delete
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
// import { debounce } from 'lodash'
import { mapGetters } from 'vuex'
export default {
  props: {
    comment: {
      type: Object,
      required: true,
      default: () => {},
    },
    postAuthorId: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      menu: false,
      loading: false,
      pinning: false,
    }
  },
  computed: {
    ...mapGetters({
      loggedInUserId: 'auth/userId',
    }),
  },
  methods: {
    async pinComment() {
      if (!this.loggedInUserId) {
        this.$store.dispatch(
          'ui/showLoginModal',
          { action: 'pin' },
          { root: true }
        )
        return
      }

      if (this.postAuthorId === this.loggedInUserId) {
        if (this.pinning) {
          return
        }
        this.pinning = true
        try {
          console.log('Pinning comment')
          const url = new URL(
            `${this.$store.getters.postPath}/posts/${this.comment?.postId}/comments/${this.comment.id}/pin`
          )
          let result
          if (!this.comment.pinned) {
            result = await this.$axios.$post(url.href)
          } else {
            result = await this.$axios.$delete(url.href)
          }
          console.log({ result })
        } catch (error) {
          console.log({ error })
        } finally {
          this.pinning = false
        }
      } else {
        console.log('cannot pin comment, not the author')
      }
    },
    follow() {
      if (!this.loggedInUserId) {
        this.$store.dispatch(
          'ui/showLoginModal',
          { action: 'follow' },
          { root: true }
        )
        return
      }
      console.log('Follow user')
    },
    block() {
      if (!this.loggedInUserId) {
        this.$store.dispatch(
          'ui/showLoginModal',
          { action: 'block' },
          { root: true }
        )
        return
      }
      console.log('Block user')
    },
    reportComment() {
      if (!this.loggedInUserId) {
        this.$store.dispatch(
          'ui/showLoginModal',
          { action: 'report' },
          { root: true }
        )
        return
      }
      console.log('Block user')
    },
    deleteComment() {
      console.log('Block user')
    },
  },
}
</script>

<style></style>
