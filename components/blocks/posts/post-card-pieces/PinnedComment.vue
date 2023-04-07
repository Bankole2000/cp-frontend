<template>
  <div v-if="comment.id">
    <v-divider></v-divider>
    <v-timeline align-top dense class="ml-n2">
      <v-timeline-item small class="pb-2">
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
            <CommentHeaderMenu
              :comment="comment"
              :post-author-id="postAuthorId"
            />
          </v-list-item-action>
        </v-list-item>
        <p
          v-if="comment.content"
          class="ml-n4 mt-n3 mb-2 pr-4"
          style="font-size: 13px"
          :class="{
            'secondary--text': !$vuetify.theme.dark,
            'white--text': $vuetify.theme.dark,
          }"
        >
          {{ comment.content }}
        </p>
        <!-- <v-card outlined class="ml-n4 elevated-light">
              <v-img
                cover
                :src="'https://media0.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy.gif?cid=4bdb0b04h7pjnom412165gs2z2wn5ombfxidbcg26zrthuq8&rid=giphy.gif&ct=g'"
              ></v-img>
            </v-card> -->
        <!-- <v-divider class="ml-n4"></v-divider>
            <ReplyList /> -->
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
import CommentHeaderMenu from '../../comments/comment-pieces/CommentHeaderMenu.vue'

export default {
  components: { CommentHeaderMenu },
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
}
</script>

<style></style>
