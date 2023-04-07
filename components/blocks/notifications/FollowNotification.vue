<template>
  <v-list-item class="pr-0 pl-2" @click="handleClick">
    <div
      style="display: flex; align-items: start; cursor: pointer; width: 100%"
      class="my-2"
    >
      <div style="flex: 4">
        <v-badge
          overlap
          bordered
          bottom
          icon="mdi-account-plus"
          offset-x="15"
          offset-y="15"
          color="blue"
        >
          <v-avatar size="48">
            <v-img
              :src="
                follower.imageUrl
                  ? follower.imageUrl
                  : `${$store.getters.profilePath}/u/image/${follower.username}`
              "
            ></v-img>
          </v-avatar>
        </v-badge>
      </div>
      <div style="flex: 18" class="pl-2">
        <p
          class="mb-0"
          :class="{ 'text--secondary': read, 'font-weight-bold': !seen }"
        >
          <template v-for="(token, i) in messageParsed">
            <UserMention
              v-if="token.startsWith('@')"
              :key="i"
              :username="token.slice(1)"
            />
            <template v-else>
              <span :key="i" style="word-break: break-word">
                {{ token }}
              </span>
            </template>
          </template>
        </p>
        <p
          class="mb-0"
          :class="{
            'font-weight-bold': !seen,
            'accent--text': !read,
            'text--secondary': read,
          }"
        >
          {{ $moment(notification.createdAt).fromNow() }}
        </p>
      </div>
      <div v-if="!read" style="flex: 2; display: flex; justify-content: center">
        <v-icon size="12" class="mt-4" color="accent">mdi-circle</v-icon>
      </div>
    </div>
  </v-list-item>
</template>

<script>
import UserMention from '~/components/common/UserMention.vue'

export default {
  components: { UserMention },
  props: ['notification', 'seen', 'read'],
  computed: {
    follower() {
      if (this.notification) {
        return this.notification.resourceData.follower
      }
      return {}
    },
    messageParsed() {
      if (this.notification) {
        return this.notification.message.split(' ')
      }
      return []
    },
  },
  methods: {
    handleClick() {
      console.log('clicked')
      this.$emit('click')
    },
  },
}
</script>

<style></style>
