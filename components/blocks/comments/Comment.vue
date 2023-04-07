<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-timeline-item v-if="comment" small>
    <template #icon>
      <v-avatar v-if="comment.author" size="40">
        <img
          :src="`${$store.getters.profilePath}/u/image/${comment.author.username}?thumb=200x200`"
        />
      </v-avatar>
    </template>
    <v-list-item v-if="comment.author" class="pl-0 ml-n4 mb-n2">
      <v-list-item-content class="py-0 mt-n6">
        <v-list-item-subtitle>
          <span
            class="font-weight-bold"
            :class="{
              'secondary--text': !$vuetify.theme.dark,
              'white--text': $vuetify.theme.dark,
            }"
            >{{ comment.author.displayname }}</span
          >
          <span class="text--secondary font-weight-regular">
            &bull; {{ $moment(comment.createdAt).fromNow() }}</span
          >
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <nuxt-link
            :to="{
              name: 'profile-username',
              params: { username: `@${comment.author.username}` },
            }"
            target="_blank"
          >
            <span
              style="cursor: pointer"
              :class="{
                'secondary--text': !$vuetify.theme.dark,
                'white--text': $vuetify.theme.dark,
              }"
              >@{{ comment.author.username }}</span
            >
          </nuxt-link>
          <!-- <span class="caption">&bull; Sponsored</span>
          <span class="caption">&bull; Location</span> -->
          <span v-if="comment.pinned" class="caption">&bull; Pinned</span>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action class="mx-0 mb-0 py-0 mt-n6">
        <CommentHeaderMenu :comment="comment" :post-author-id="postAuthorId" />
      </v-list-item-action>
    </v-list-item>
    <CommentCaption
      :profile-socket="profileSocket"
      :sockets-ready="socketsReady"
      :caption="comment.content ? comment.content : null"
    />
    <!-- <v-card outlined class="ml-n4 elevated-light">
      <v-img
        cover
        :src="'https://media0.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy.gif?cid=4bdb0b04h7pjnom412165gs2z2wn5ombfxidbcg26zrthuq8&rid=giphy.gif&ct=g'"
      ></v-img>
    </v-card> -->
    <div class="ml-n4 pr-4">
      <v-layout>
        <v-flex xs6>
          <ModalToggleRepliesButton
            v-if="comment?._count?.childComments"
            :show="showReplies"
            :reply-count="comment?._count?.childComments"
            :comment-id="comment?.id"
            @toggle-replies="toggleReplies"
          />
        </v-flex>
        <v-flex xs2>
          <ModalReplyCommentButton
            :comment-id="comment?.id"
            :reply-count="comment?._count?.childComments"
          />
        </v-flex>
        <v-flex xs4>
          <ModalLikeCommentButton
            :liked-by-user="comment?.likedByYou"
            :comment-id="comment?.id"
            :post-id="comment?.postId"
            :like-count="comment?._count?.likedBy"
          />
        </v-flex>
      </v-layout>
    </div>
    <v-divider class="ml-n4"></v-divider>
    <v-scroll-y-transition>
      <div v-show="showReplies">
        <ReplyList
          :show="showReplies"
          :reply-count="0"
          @toggle-replies="toggleReplies"
        />
      </div>
    </v-scroll-y-transition>
  </v-timeline-item>
</template>

<script>
import ModalLikeCommentButton from '../posts/post-card-pieces/post-modal-pieces/ModalLikeCommentButton.vue'
import ModalReplyCommentButton from '../posts/post-card-pieces/post-modal-pieces/ModalReplyCommentButton.vue'
import ModalToggleRepliesButton from '../posts/post-card-pieces/post-modal-pieces/ModalToggleRepliesButton.vue'
import CommentCaption from './comment-pieces/CommentCaption.vue'
import CommentHeaderMenu from './comment-pieces/CommentHeaderMenu.vue'
import ReplyList from './ReplyList.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Comment',
  components: {
    ReplyList,
    ModalLikeCommentButton,
    ModalReplyCommentButton,
    ModalToggleRepliesButton,
    CommentCaption,
    CommentHeaderMenu,
  },
  props: {
    comment: {
      type: Object,
      required: true,
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
    index: {
      type: Number,
      required: true,
      default: 0,
    },
    id: {
      type: String,
      required: true,
      default: '',
    },
    postAuthorId: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      showReplies: false,
    }
  },
  methods: {
    toggleReplies() {
      this.showReplies = !this.showReplies
    },
  },
}
</script>

<style></style>
