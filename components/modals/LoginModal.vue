<template>
  <v-dialog
    v-model="dialog"
    content-class="rounded-xl"
    persistent
    max-width="400"
  >
    <v-card class="rounded-xl">
      <v-card-title class="headline d-flex align-center px-2 pt-2 pb-0"
        ><v-spacer></v-spacer>
        <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>

      <v-card-text class="pt-0 mt-n2">
        <div
          class="text-center"
          :class="{
            'black--text': !$vuetify.theme.dark,
            'white--text': $vuetify.theme.dark,
          }"
        >
          <v-icon size="60" :color="colors[action]">{{ icons[action] }}</v-icon>
          <p class="headline font-weight-bold mt-2 mb-1">
            {{ headlines[action] }}
          </p>
          <p class="body-2 mb-6">{{ messages[action] }}</p>
        </div>
        <v-hover v-slot="{ hover }">
          <v-btn
            rounded
            large
            block
            to="/auth"
            ripple
            nuxt
            style="transition: all 0.3s ease-in-out"
            class="white--text my-4"
            :class="
              hover
                ? 'bg-gradient-right-primary-error elevated'
                : 'bg-gradient-right-primary-accent elevated-light'
            "
          >
            <v-icon left>mdi-login</v-icon>
            Login</v-btn
          >
        </v-hover>
        <v-hover v-slot="{ hover }">
          <v-btn
            rounded
            large
            block
            to="/auth/signup"
            ripple
            nuxt
            style="transition: all 0.3s ease-in-out"
            class="white--text my-4"
            :class="
              hover
                ? 'bg-gradient-right-info-accent elevated'
                : 'bg-gradient-right-info-primary elevated-light'
            "
          >
            <v-icon left>mdi-account-arrow-right</v-icon>
            Signup</v-btn
          >
        </v-hover>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      colors: {
        like: 'error',
        comment: 'primary',
        reply: 'info',
        follow: 'info',
        repost: 'success',
        quoteRepost: 'info',
        chat: 'info',
        notification: 'warning',
        send: 'accent',
        bookmark: 'warning',
        schedule: 'warning',
        buy: 'accent',
        pin: 'warning',
        block: 'error',
        report: 'error',
        review: 'info',
        addListing: 'primary',
        rate: 'warning',
        addPost: 'primary',
        addService: 'success',
        addPersonal: 'accent',
      },
      icons: {
        like: 'mdi-heart',
        comment: 'mdi-chat-outline',
        reply: 'mdi-reply',
        follow: 'mdi-account-arrow-right',
        repost: 'mdi-repeat-variant',
        quoteRepost: 'mdi-comment-quote-outline',
        chat: 'mdi-forum-outline',
        notification: 'mdi-bell-badge',
        send: 'mdi-send',
        bookmark: 'mdi-bookmark-outline',
        schedule: 'mdi-calendar',
        buy: 'mdi-gift-open-outline',
        pin: 'mdi-pin',
        report: 'mdi-flag',
        block: 'mdi-cancel',
        review: 'mdi-message-draw',
        addListing: 'mdi-home-account',
        rate: 'mdi-podium-gold',
        addPost: 'mdi-post-outline',
        addService: 'mdi-account-hard-hat-outline',
        addPersonal: 'mdi-bulletin-board',
      },
      headlines: {
        like: 'Like content to share the love.',
        comment: 'Start the conversation.',
        reply: 'Keep the conversation going.',
        follow: 'Follow to see what they share.',
        repost: 'Repost to spread the word.',
        quoteRepost: 'Have some thoughts? Quote it.',
        chat: 'Chat in the DMs.',
        notification: 'Get notified.',
        send: 'Share privately with contacts.',
        bookmark: 'Bookmark for later.',
        schedule: 'Schedule a booking.',
        buy: 'Buy to support their business.',
        pin: 'Pin it up!',
        block: 'Block out bad vibes.',
        report: 'Report red flags!',
        review: 'Leave a Review.',
        addListing: 'Host a Floor Space',
        rate: 'Rate it.',
        addPost: 'Share your thoughts',
        addService: 'Offer a product, service or trade.',
        addPersonal: 'Let your needs come to you.',
      },
      messages: {
        like: 'Join Relodger to let users know your like their content.',
        comment: 'Join Relodger to add comments on users content.',
        reply:
          'Join Relodger to reply comments and keep the conversation going.',
        follow: 'Sign up to follow so you never miss their content.',
        repost:
          'When you join Relodger, you can share content with your followers.',
        quoteRepost:
          'Join Relodger to quote content and share your thoughts about it.',
        chat: 'Join Relodger to grow your contacts list and send private messages.',
        notification: 'Sign up to get notifications on relevant updates.',
        send: 'Join Relodger to share content with your contacts privately',
        bookmark:
          'Join Relodger to save your favorites so you can always find them.',
        schedule: 'Sign up to book a stay, viewing, or a service on Relodger.',
        buy: 'mdi-gift-open-outline',
        report:
          'Relodger aims to be a welcoming place to everyone. Join to help keep the community safe.',
        pin: 'You decide what people see first on your content, or on your profile.',
        block:
          "Don't want to see it / them? Just block. Relodger let's you do that.",
        review: 'mdi-message-draw',
        addListing: 'mdi-home-account',
        rate: 'mdi-podium-gold',
        addPost: 'mdi-post-outline',
        addService: 'mdi-account-hard-hat-outline',
        addPersonal: 'mdi-bulletin-board',
      },
    }
  },
  computed: {
    dialog: {
      get() {
        return this.$store.getters['ui/showLoginModal']
      },
      set(val) {
        this.$store.commit('ui/showLoginModal', { show: val }, { root: true })
      },
    },
    action: {
      get() {
        return this.$store.getters['ui/loginModalAction']
      },
    },
  },
}
</script>

<style></style>
