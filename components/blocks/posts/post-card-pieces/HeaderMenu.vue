<template>
  <v-menu
    v-if="post.createdBy"
    content-class="elevated-light rounded-lg"
    offset-y
    left
  >
    <template #activator="{ on, attrs }">
      <v-btn icon class="ma-2" v-bind="attrs" v-on="on">
        <v-icon size="32">mdi-dots-horizontal</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item-group color="primary">
        <v-list-item
          v-if="post.repostedByYou || post.authoredByYou"
          @click="pinPost"
        >
          <v-list-item-icon>
            <v-icon size="24">mdi-pin</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ml-n4"> Pin Post </v-list-item-content>
        </v-list-item>

        <v-list-item @click="reportPost">
          <v-list-item-icon>
            <v-icon size="24">mdi-flag</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ml-n4"> Report </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="!post.followedByYou && post.createdBy !== loggedInUserId"
          @click="follow"
        >
          <v-list-item-icon>
            <v-icon size="24">mdi-account-arrow-right-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ml-n4">
            Follow
            <span class="font-weight-bold"
              >@{{ post.createdByData.username }}</span
            ></v-list-item-content
          >
        </v-list-item>
        <v-list-item
          v-if="post.followedByYou && post.createdBy !== loggedInUserId"
        >
          <v-list-item-icon>
            <v-icon size="24">mdi-account-minus-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ml-n4">
            Unfollow
            <span class="font-weight-bold"
              >@{{ post.createdByData.username }}</span
            ></v-list-item-content
          >
        </v-list-item>
        <v-list-item v-if="post.createdBy !== loggedInUserId" @click="block">
          <v-list-item-icon>
            <v-icon size="24">mdi-account-cancel-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ml-n4">
            Block
            <span class="font-weight-bold"
              >@{{ post.createdByData.username }}</span
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="post.authoredByYou" @click="deletePost">
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
import { mapGetters } from 'vuex'
export default {
  props: {
    post: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters({
      loggedInUserId: 'auth/userId',
    }),
  },
  methods: {
    pinPost() {
      if (!this.loggedInUserId) {
        this.$store.dispatch(
          'ui/showLoginModal',
          { action: 'pin' },
          { root: true }
        )
        return
      }
      console.log('Pin comment')
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
    reportPost() {
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
    deletePost() {
      console.log('Delete post')
    },
  },
}
</script>

<style></style>
