<template>
  <div style="width: 100%" class="d-flex flex-column">
    <div
      class="d-flex align-start py-2"
      :class="{
        'px-4': $vuetify.breakpoint.smAndUp,
        'px-1': !$vuetify.breakpoint.smAndUp,
      }"
      style="width: 100%"
    >
      <v-avatar size="40">
        <v-img :src="profileImage"></v-img>
      </v-avatar>
      <v-menu
        v-model="userMenu"
        top
        :nudge-top="nudgeTop"
        content-class="rounded-xl elevated-light"
      >
        <template #activator="{ attrs }">
          <v-textarea
            ref="comment"
            v-bind="attrs"
            v-model="comment"
            class="mx-2"
            label="Add a comment..."
            prepend-inner-icon="mdi-comment"
            filled
            dense
            :readonly="loading"
            rows="1"
            hide-details
            auto-grow
            rounded
            single-line
            placeholder="Add a comment..."
            @keyup="showMenu"
            @keypress.enter="sendComment"
          >
          </v-textarea>
        </template>
        <CaptionAutoSuggestCard
          :query="lastWord"
          :active="userMenu"
          :move-upwards="true"
          :post-socket="postSocket"
          :profile-socket="profileSocket"
          @select="suggestionSelect"
          @nudge="nudge"
        />
      </v-menu>
      <v-expand-x-transition>
        <v-progress-circular
          v-show="comment.length"
          :size="comment.length <= maxLength - 20 ? 20 : 24"
          width="2"
          :rotate="-90"
          :class="comment.length <= maxLength - 20 ? 'mt-2' : 'mt-2'"
          :color="counterColor"
          :value="(comment.length / maxLength) * 100"
        >
          <span
            v-if="maxLength - comment.length < 20"
            class="caption"
            style="font-size: 12px"
            >{{ maxLength - comment.length }}</span
          >
        </v-progress-circular>
      </v-expand-x-transition>
      <v-menu
        v-if="!$vuetify.breakpoint.xs"
        v-model="emojiMenu"
        top
        left
        :close-on-content-click="false"
        offset-y
      >
        <template #activator="{ on, attrs2 }">
          <v-btn
            small
            :dark="$vuetify.theme.dark"
            class="mt-1 mx-1"
            :disabled="loading"
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
            backgroundColor: $vuetify.theme.dark ? '#1e1e1e' : '#f0efef',
          }"
          @select="addEmoji"
        />
      </v-menu>

      <v-btn
        v-if="!$vuetify.breakpoint.xs"
        icon
        :disabled="loading"
        @click="$emit('add-comment-intent')"
      >
        <v-icon>mdi-image-multiple-outline</v-icon>
      </v-btn>
      <v-btn
        v-if="!$vuetify.breakpoint.xs"
        :loading="loading"
        :disabled="loading"
        icon
        @click="sendComment"
      >
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </div>
    <div
      v-if="$vuetify.breakpoint.xs"
      class="d-flex align-start py-0"
      :class="{
        'px-4': $vuetify.breakpoint.smAndUp,
        'px-1': !$vuetify.breakpoint.smAndUp,
      }"
      style="width: 100%"
    >
      <v-spacer></v-spacer>
      <v-menu
        v-model="emojiMenu"
        top
        left
        :close-on-content-click="false"
        offset-y
      >
        <template #activator="{ on, attrs2 }">
          <v-btn
            small
            :disabled="loading"
            :dark="$vuetify.theme.dark"
            class="mt-1 mx-1"
            icon
            color="yellow accent-2"
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
            backgroundColor: $vuetify.theme.dark ? '#1e1e1e' : '#f0efef',
          }"
          @select="addEmoji"
        />
      </v-menu>
      <v-btn
        icon
        color="warning"
        :disabled="loading"
        @click="$emit('add-comment-intent')"
      >
        <v-icon>mdi-image-multiple-outline</v-icon>
      </v-btn>
      <v-btn
        icon
        color="primary"
        :loading="loading"
        :disabled="loading || comment.length > maxLength"
        @click="sendComment"
      >
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </div>
    <CreateCommentModal
      :sockets-ready="socketsReady"
      :post-socket="postSocket"
      :profile-socket="profileSocket"
      :show="showAddCommentModal"
      :comment="comment"
      @comment-changed="commentChanged"
      @close="$emit('close-modal')"
    />
  </div>
</template>

<script>
import { Picker } from 'emoji-mart-vue'
import { mapGetters, mapActions } from 'vuex'
import { errorMessage } from '~/utils/messaging'
import CaptionAutoSuggestCard from '~/components/blocks/posts/creation/CaptionAutoSuggestCard.vue'
import CreateCommentModal from '~/components/blocks/comments/CreateCommentModal.vue'
export default {
  components: {
    Picker,
    CaptionAutoSuggestCard,
    CreateCommentModal,
  },
  props: {
    socketsReady: {
      type: Boolean,
      required: true,
      default: false,
    },
    postSocket: {
      type: Object,
      required: true,
    },
    postId: {
      type: String,
      required: true,
      default: '',
    },
    profileSocket: {
      type: Object,
      required: true,
    },
    showAddCommentModal: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      comment: '',
      emojiMenu: false,
      userMenu: false,
      nudgeTop: 0,
      loading: false,
      maxLength: 140,
    }
  },
  computed: {
    ...mapGetters({
      profileImage: 'user/profileImage',
    }),
    lastWord() {
      if (this.comment) {
        const words = this.comment.split(' ')
        return words[words.length - 1]
      }
      return ''
    },
    counterColor() {
      const goodLength = this.maxLength - 20
      if (this.comment.length >= this.maxLength) return 'error'
      if (
        this.comment.length > goodLength &&
        this.comment.length < this.maxLength
      )
        return this.$vuetify.theme.dark ? 'yellow' : 'warning'
      return 'primary'
    },
  },
  beforeDestroy() {
    this.comment = ''
  },
  methods: {
    ...mapActions({
      publishComment: 'user/posts/publishComment',
      showMessage: 'ui/showMessage',
    }),
    nudge(e) {
      console.log({ e })
      this.nudgeTop = 61 * e
    },
    commentChanged(e) {
      console.log({ e })
      this.comment = e
    },
    addEmoji(e) {
      console.log({ e })
      this.comment += e.native
      this.emojiMenu = false
      this.$refs.comment.focus()
    },
    showMenu() {
      const char = this.lastWord ? this.lastWord.charAt(0) : null
      switch (char) {
        case '@': {
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
      const words = this.comment.split(' ')
      words.pop()
      words.push(e)
      this.comment = words.join(' ')
      this.$refs.comment.focus()
      console.log({ comment: this.comment })
    },
    async sendComment(e) {
      console.log({ e })
      e.preventDefault()
      this.loading = true
      if (this.comment.trim().length < 1) {
        const message = errorMessage({ text: `Comment can't be empty` })
        this.showMessage(message)
        this.loading = false
        return
      }
      if (this.comment.trim().length > this.maxLength) {
        const message = errorMessage({ text: `Comment is too long` })
        this.showMessage(message)
        this.loading = false
        return
      }
      console.log({
        comment: this.comment,
        postId: this.postId,
      })
      try {
        const result = await this.publishComment({
          postId: this.postId,
          content: this.comment,
        })
        console.log({ result })
        if (result.success) {
          this.comment = ''
        }
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
