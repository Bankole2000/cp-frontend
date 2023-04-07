<template>
  <v-card-text class="pb-3 pt-0">
    <p
      class="mb-0"
      style="font-size: 16px"
      :class="{
        'secondary--text': !$vuetify.theme.dark,
        'white--text': $vuetify.theme.dark,
      }"
      @click.self="$emit('handle-click')"
    >
      <template v-for="(token, i) in captionParsed">
        <UserMention
          v-if="token.startsWith('@')"
          :key="i"
          :profile-socket="profileSocket"
          :sockets-ready="socketsReady"
          :username="token.slice(1)"
        />
        <TagMention
          v-else-if="token.startsWith('#')"
          :key="i"
          :tag="token.slice(1)"
        />
        <URLMention
          v-else-if="postData.urls.includes(token)"
          :key="i"
          :url="token"
        />
        <template v-else>
          <span
            :key="i"
            style="word-break: break-word"
            @click.stop="$emit('handle-click')"
          >
            {{ token }}
          </span>
        </template>
      </template>
    </p>
  </v-card-text>
</template>

<script>
import TagMention from '~/components/common/TagMention.vue'
import URLMention from '~/components/common/URLMention.vue'
import UserMention from '~/components/common/UserMention.vue'
export default {
  components: { UserMention, TagMention, URLMention },
  props: {
    caption: {
      type: String,
      required: false,
      default: '',
    },
    postData: {
      type: Object,
      required: false,
      default: () => {},
    },
    postSocket: {
      type: Object,
      required: false,
      default: () => {},
    },
    profileSocket: {
      type: Object,
      required: false,
      default: () => {},
    },
    socketsReady: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    captionParsed() {
      if (this.caption) {
        return this.caption.split(' ')
      }
      return []
    },
  },
}
</script>

<style></style>
