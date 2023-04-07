<template>
  <v-dialog
    v-model="dialog"
    :content-class="
      $vuetify.breakpoint.width > 400 ? 'rounded-xl' : 'elevated-light'
    "
    persistent
    :fullscreen="$vuetify.breakpoint.width < 400"
    :scrollable="$vuetify.breakpoint.width < 400"
    max-width="500"
  >
    <!-- :min-width="
      $vuetify.breakpoint.width < 420 ? $vuetify.breakpoint.width : 420
    " -->
    <v-card
      :tile="$vuetify.breakpoint.width < 400"
      :class="{ 'rounded-xl': $vuetify.breakpoint.width > 400 }"
      class="elevated-light"
    >
      <v-card-title
        style="font-size: 20px"
        class="d-flex align-center py-2 px-4"
      >
        <v-avatar size="40">
          <v-img :src="profileImage"></v-img>
        </v-avatar>
        <v-spacer></v-spacer>
        Add A Comment
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="px-0">
            <div class="d-flex align-start pt-2">
              <v-menu
                v-model="userMenu"
                bottom
                offset-y
                content-class="rounded-xl elevated-light"
              >
                <template #activator="{ attrs }">
                  <v-textarea
                    ref="comment"
                    v-bind="attrs"
                    v-model="content"
                    rows="1"
                    class="mx-2"
                    label="Add a comment..."
                    prepend-inner-icon="mdi-comment"
                    filled
                    dense
                    hide-details
                    auto-grow
                    autofocus
                    rounded
                    single-line
                    placeholder="Add a comment..."
                    @keyup="showMenu"
                  >
                  </v-textarea>
                </template>
                <CaptionAutoSuggestCard
                  v-if="socketsReady"
                  :query="lastWord"
                  :active="userMenu"
                  :move-upwards="false"
                  :post-socket="postSocket"
                  :profile-socket="profileSocket"
                  @select="suggestionSelect"
                />
              </v-menu>
              <v-expand-x-transition>
                <v-progress-circular
                  v-show="content.length"
                  size="28"
                  class="mt-1"
                  :value="(content.length / 160) * 100"
                >
                  <span class="caption" style="font-size: 12px">{{
                    content.length
                  }}</span>
                </v-progress-circular>
              </v-expand-x-transition>
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
                    :dark="$vuetify.theme.dark"
                    class="mt-1 mx-1"
                    icon
                    color="warning"
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
            </div>
          </v-col>
          <v-col cols="12" class="pa-0">
            <v-expand-transition>
              <div>
                <v-alert
                  dismissible
                  close-icon="mdi-delete"
                  :color="colors['IMAGE']"
                  border="left"
                  elevation="2"
                  colored-border
                  :icon="icons['IMAGE']"
                >
                  You've got <strong>5</strong> new updates on your timeline!.
                </v-alert>
              </div>
            </v-expand-transition>
            <v-expand-transition>
              <v-layout v-show="!addImage">
                <v-flex xs6>
                  <v-hover v-slot="{ hover }">
                    <div
                      :style="{
                        backgroundColor:
                          hover && $vuetify.theme.dark
                            ? 'var(--primary-dark)'
                            : hover && !$vuetify.theme.dark
                            ? 'var(--primary-light)'
                            : '',
                      }"
                      role="button"
                      class="d-flex align-center justify-center rounded-lg ma-1 pa-1"
                      @click="addImage = !addImage"
                    >
                      <v-btn
                        icon
                        small
                        :class="
                          hover && $vuetify.theme.dark
                            ? 'bg-primary-dk'
                            : hover && !$vuetify.theme.dark
                            ? 'bg-primary-lt'
                            : ''
                        "
                        :color="hover ? 'primary' : ''"
                        @click.stop="addImage = !addImage"
                        ><v-icon>mdi-file-image-plus</v-icon></v-btn
                      >
                      <span
                        :class="{
                          'secondary--text': !$vuetify.theme.dark,
                          'white--text': $vuetify.theme.dark,
                        }"
                        >Add Image</span
                      >
                    </div>
                  </v-hover>
                </v-flex>
                <v-flex xs6>
                  <v-hover v-slot="{ hover }">
                    <div
                      :style="{
                        backgroundColor:
                          hover && $vuetify.theme.dark
                            ? 'var(--accent-dark)'
                            : hover && !$vuetify.theme.dark
                            ? 'var(--accent-light)'
                            : '',
                      }"
                      role="button"
                      class="d-flex align-center justify-center rounded-lg ma-1 pa-1"
                      @click="addGif = !addGif"
                    >
                      <v-btn
                        icon
                        small
                        :class="
                          hover && $vuetify.theme.dark
                            ? 'bg-accent-dk'
                            : hover && !$vuetify.theme.dark
                            ? 'bg-accent-lt'
                            : ''
                        "
                        :color="hover ? 'accent' : ''"
                        @click.stop="addGif = !addGif"
                        ><v-icon>mdi-file-gif-box</v-icon></v-btn
                      >
                      <span
                        :class="{
                          'secondary--text': !$vuetify.theme.dark,
                          'white--text': $vuetify.theme.dark,
                        }"
                        >Add Gif</span
                      >
                    </div>
                  </v-hover>
                </v-flex>
              </v-layout>
            </v-expand-transition>
          </v-col>
          <v-col cols="12" class="pa-0">
            <v-expand-transition>
              <div v-show="addImage">
                <CommentImageUpload @cancel="addImage = false" />
              </div>
            </v-expand-transition>
          </v-col>
        </v-row>
      </v-card-text>
      <v-expand-transition>
        <v-card-actions v-show="!addImage">
          <v-hover v-slot="{ hover }">
            <v-btn
              block
              rounded
              class="white--text my-0 text-capitalize"
              large
              :class="
                hover
                  ? 'bg-gradient-right-primary-error elevated'
                  : 'bg-gradient-right-primary-accent elevated-light'
              "
              ><span style="font-size: 16px">Comment</span
              ><v-icon right>mdi-send</v-icon></v-btn
            >
          </v-hover>
        </v-card-actions>
      </v-expand-transition>
      <CommentGifSelectModal
        :post-id="'123'"
        :show="addGif"
        @show="(e) => (addGif = e)"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import { Picker } from 'emoji-mart-vue'
import { mapGetters } from 'vuex'
import CommentImageUpload from './comment-pieces/CommentImageUpload.vue'
import CaptionAutoSuggestCard from '~/components/blocks/posts/creation/CaptionAutoSuggestCard.vue'
import CommentGifSelectModal from '~/components/common/CommentGifSelectModal.vue'
export default {
  components: {
    Picker,
    CaptionAutoSuggestCard,
    CommentImageUpload,
    CommentGifSelectModal,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
    comment: {
      type: String,
      required: true,
      default: '',
    },
    socketsReady: {
      type: Boolean,
      required: true,
      default: false,
    },
    postSocket: {
      type: Object,
      required: true,
    },
    profileSocket: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      emojiMenu: false,
      userMenu: false,
      addImage: false,
      addGif: false,
      icons: {
        GIF: 'mdi-file-gif-box',
        IMAGE: 'mdi-image',
        POST: 'mdi-post',
        LISTING: 'mdi-home-export-outline',
        SERVICE: 'mdi-account-hard-hat-outline',
        PERSONAL: 'mdi-bullhorn-outline',
      },
      colors: {
        GIF: 'accent',
        IMAGE: 'primary',
        POST: 'info',
        LISTING: 'warning',
        SERVICE: 'success',
        PERSONAL: 'error',
      },
    }
  },
  computed: {
    ...mapGetters({
      profileImage: 'user/profileImage',
    }),
    dialog: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('close')
      },
    },
    lastWord() {
      if (this.content) {
        const words = this.content.split(' ')
        return words[words.length - 1]
      }
      return ''
    },
    content: {
      get() {
        return this.comment
      },
      set(val) {
        console.log({ val })
        this.$emit('comment-changed', val)
      },
    },
  },
  // watch: {
  //   dialog(val) {
  //     if (val) {
  //       this.content = this.comment
  //     }
  //   },
  // },
  methods: {
    addEmoji(e) {
      console.log({ e })
      this.content += e.native
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
      this.content = words.join(' ')
      this.$refs.comment.focus()
      console.log({ comment: this.content })
    },
  },
}
</script>

<style></style>
