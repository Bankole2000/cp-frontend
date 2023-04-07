<template>
  <p
    class="ml-n4 mt-n3 mb-2 pr-2"
    :class="{
      'secondary--text': !$vuetify.theme.dark,
      'white--text': $vuetify.theme.dark,
    }"
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
      <URLMention v-else-if="urls.includes(token)" :key="i" :url="token" />
      <template v-else>
        <span :key="i" style="word-break: break-word">
          {{ token }}
        </span>
      </template>
    </template>
  </p>
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
    urls() {
      const urls = this.caption.match(
        /(https?:\/\/(?:www\.|(?!www))[^\s\\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi
      )
      return urls ? [...new Set(urls)] : []
    },
  },
}
</script>

<style></style>
