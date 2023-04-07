<template>
  <div class="reply-list">
    <v-expand-transition>
      <div v-show="showReplies">
        <v-timeline align-top dense class="ml-n10">
          <v-slide-x-transition group>
            <Reply v-for="n in 4" :key="n" />
          </v-slide-x-transition>
        </v-timeline>
        <div class="ml-n8">
          <CommentLoader />
        </div>
      </div>
    </v-expand-transition>
    <div class="d-flex align-center pr-4 ml-n4">
      <v-btn text class="text-capitalize" small
        >Show more replies ({{ replyCount | count }})</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn
        text
        class="text-capitalize"
        small
        @click="showReplies = !showReplies"
        >Hide <v-icon right>mdi-chevron-double-up</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
import CommentLoader from './CommentLoader.vue'
import Reply from './Reply.vue'
export default {
  components: { Reply, CommentLoader },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    replyCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    showReplies: {
      get() {
        return this.show
      },
      set() {
        this.$emit('toggle-replies')
      },
    },
  },
}
</script>

<style></style>
