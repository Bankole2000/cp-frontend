<template>
  <div>
    <v-menu
      v-model="userMenu"
      offset-y
      content-class="rounded-xl elevated-light"
    >
      <template #activator="{ attrs }">
        <v-textarea
          ref="caption"
          v-model="caption"
          counter
          auto-grow
          filled
          dense
          :rules="[rules.counter]"
          rows="1"
          rounded
          single-line
          autofocus
          label="caption"
          prepend-inner-icon="mdi-comment"
          placeholder="What's on your mind?"
          :maxlength="maxlength"
          v-bind="attrs"
          @keyup="showMenu"
        >
          <template #append>
            <v-fade-transition leave-absolute>
              <v-progress-circular
                v-if="loading"
                size="24"
                color="info"
                indeterminate
              ></v-progress-circular>
              <v-menu
                v-model="emojiMenu"
                bottom
                left
                :close-on-content-click="false"
                offset-y
              >
                <template #activator="{ on, attrs2 }">
                  <v-btn
                    small
                    :dark="$vuetify.theme.dark"
                    icon
                    v-bind="attrs2"
                    v-on="on"
                  >
                    <v-icon size="24">mdi-emoticon-outline</v-icon>
                  </v-btn>
                </template>
                <Picker
                  set="twitter"
                  :exclude="['flags']"
                  emoji="grinning"
                  title="Add an emoji"
                  :style="{
                    backgroundColor: $vuetify.theme.dark
                      ? '#1e1e1e'
                      : '#f0efef',
                  }"
                  @select="addEmoji"
                />
              </v-menu>
            </v-fade-transition>
          </template>
        </v-textarea>
      </template>
      <CaptionAutoSuggestCard
        :profile-socket="profileSocket"
        :post-socket="postSocket"
        :query="lastWord"
        :active="userMenu"
        @select="suggestionSelect"
      />
    </v-menu>
  </div>
</template>

<script>
import { Picker } from 'emoji-mart-vue'
import CaptionAutoSuggestCard from '~/components/blocks/posts/creation/CaptionAutoSuggestCard.vue'
export default {
  components: {
    CaptionAutoSuggestCard,
    Picker,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    // caption: '',
    userMenu: false,
    emojiMenu: false,
    maxlength: 140,
    loading: false,
    profileSocket: {},
    postSocket: {},
  }),
  computed: {
    caption: {
      get() {
        return this.value
      },
      set(val) {
        console.log({ val })
        this.$emit('caption-changed', val)
      },
    },
    lastWord() {
      if (this.caption) {
        const words = this.caption.split(' ')
        return words[words.length - 1]
      }
      return ''
    },
    rules() {
      const maxlength = this.maxlength
      return {
        required: function (value) {
          return !!value || 'Required.'
        },
        counter: function (value) {
          return value.length <= maxlength || `Max ${maxlength} characters`
        },
      }
    },
  },
  watch: {
    // caption() {
    //   this.$emit('changed', this.caption)
    // },
  },
  async mounted() {
    this.profileSocket = await this.$nuxtSocket({
      name: 'profile',
      reconnection: true,
      autoconnect: true,
      path: '/api/v1/profile/socket',
    })
    this.postSocket = await this.$nuxtSocket({
      name: 'post',
      reconnection: true,
      autoconnect: true,
      path: '/api/v1/post/socket',
    })
  },
  methods: {
    view(...args) {
      console.log({ args })
    },
    showMenu() {
      const char = this.lastWord ? this.lastWord.charAt(0) : null
      switch (char) {
        case '@': {
          if (!this.userMenu) this.userMenu = true
          break
        }
        case '#': {
          if (!this.userMenu) this.userMenu = true
          break
        }
        default:
          if (this.userMenu) this.userMenu = false
          break
      }
    },
    suggestionSelect(e) {
      console.log({ e })
      const words = this.caption.split(' ')
      words.pop()
      words.push(`${e} `)
      this.caption = words.join(' ')
      this.$refs.caption.focus()
      console.log({ caption: this.caption })
    },
    addEmoji(e) {
      console.log({ e })
      this.caption += e.native
      this.emojiMenu = false
      this.$refs.caption.focus()
    },
  },
}
</script>

<style></style>
