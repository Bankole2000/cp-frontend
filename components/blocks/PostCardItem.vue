<template>
  <v-card class="rounded-xl elevated-light pa-0">
    <v-card-title class="pt-2 px-2 pb-0">
      <v-list-item class="px-0">
        <v-menu
          v-model="profileMenu"
          bottom
          right
          transition="scale-transition"
          :close-on-content-click="false"
          :close-on-click="false"
          origin="top left"
        >
          <template #activator="{ on }">
            <v-list-item-avatar class="mx-2" size="40" color="grey" v-on="on">
              <v-img src="https://cdn.vuetifyjs.com/images/lists/3.jpg"></v-img
            ></v-list-item-avatar>
            <v-list-item-content v-on="on">
              <v-list-item-title class="font-weight-medium"
                >@usernameball</v-list-item-title
              >
              <v-list-item-subtitle>
                {{
                  new Date().toLocaleString(['en-US'], {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
          <v-card width="300" class="rounded-xl">
            <v-list dark>
              <v-list-item>
                <v-list-item-avatar size="48">
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/lists/3.jpg"
                  ></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Userfirstname</v-list-item-title>
                  <v-list-item-subtitle>@usernameball</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="profileMenu = false">
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>

            <v-list dense>
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-calendar</v-icon>
                </v-list-item-action>
                <v-list-item-subtitle>
                  Joined
                  {{
                    new Date().toLocaleString(['en-US'], {
                      weekday: 'short',
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  }}
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item @click="() => {}">
                <v-list-item-action>
                  <v-icon>mdi-shield-account</v-icon>
                </v-list-item-action>
                <v-list-item-subtitle>Verified Identity</v-list-item-subtitle>
              </v-list-item>
              <v-list-item @click="() => {}">
                <v-list-item-action>
                  <v-icon>mdi-shield-home-outline</v-icon>
                </v-list-item-action>
                <v-list-item-subtitle
                  >Verified Real Estate Agent</v-list-item-subtitle
                >
              </v-list-item>
            </v-list>
            <v-card-actions class="d-flex justify-space-around">
              <v-btn text color="primary" class="px-4" @click="sendInvite"
                ><v-icon left>mdi-send</v-icon> Invite</v-btn
              >
              <v-btn color="accent" class="px-4" @click="startChat"
                ><v-icon left>mdi-forum</v-icon> Chat</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-menu>
        <!-- <v-list-item-avatar class="mx-2" size="48" color="grey">
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
                  ></v-img
                ></v-list-item-avatar> -->

        <v-list-item-action class="ma-0" @click="goToListing">
          <v-btn icon class="ma-2">
            <v-icon size="32">mdi-dots-horizontal</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <div style="position: relative">
        <div
          class="d-flex"
          style="position: absolute; top: 0; z-index: 1; width: 100%"
        >
          <v-btn class="ma-4" depressed>Sponsored</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" class="my-4" @click.stop="share">
            <v-icon size="32"> mdi-share-variant </v-icon>
          </v-btn>
          <v-btn icon dark color="primary" class="ma-4" @click.stop="like">
            <v-icon size="32"> mdi-heart-outline </v-icon>
          </v-btn>
        </div>
        <v-carousel
          :continuous="false"
          :cycle="false"
          :show-arrows="true"
          hide-delimiter-background
          height="auto"
        >
          <!-- height="400" -->
          <!-- :aspect-ratio="1.2" -->
          <!-- height="400" -->
          <v-carousel-item v-for="i in 3" :key="i">
            <v-img
              src="https://picsum.photos/720/600?random"
              :aspect-ratio="1.2"
              cover
              @click="goToListing"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    size="64"
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-carousel-item>
        </v-carousel>
      </div>

      <div class="d-flex align-center px-4 py-2">
        <div style="flex: 1">
          <v-hover v-slot="{ hover }">
            <div
              class="d-flex align-center justify-start"
              style="cursor: pointer"
              @click="commentOnPost"
            >
              <v-btn
                icon
                class="mr-1"
                small
                :class="
                  hover && $vuetify.theme.dark
                    ? 'bg-primary-dk'
                    : hover && !$vuetify.theme.dark
                    ? 'bg-primary-lt'
                    : ''
                "
                :color="hover ? 'primary' : ''"
              >
                <v-icon size="24">mdi-chat-outline</v-icon>
              </v-btn>
              <span
                v-if="commentCount > 0"
                class="font-weight-regular"
                :class="hover ? 'primary--text' : ''"
                >{{ commentCount | count }}</span
              >
            </div>
          </v-hover>
        </div>
        <div style="flex: 1">
          <v-hover v-slot="{ hover }">
            <div
              class="d-flex align-center justify-start"
              style="cursor: pointer"
              @click="repostPost"
            >
              <v-btn
                icon
                class="mr-1"
                small
                :class="
                  hover && $vuetify.theme.dark
                    ? 'bg-success-dk'
                    : hover && !$vuetify.theme.dark
                    ? 'bg-success-lt'
                    : ''
                "
                :color="hover || repostedByUser ? 'success' : ''"
              >
                <v-icon size="24">mdi-repeat-variant</v-icon>
              </v-btn>
              <span
                v-if="repostCount > 0"
                class="font-weight-regular"
                :class="hover || repostedByUser ? 'success--text' : ''"
                >{{ repostCount | count }}</span
              >
            </div>
          </v-hover>
        </div>
        <div style="flex: 1">
          <v-hover v-slot="{ hover }">
            <div
              class="d-flex align-center justify-start"
              style="cursor: pointer"
              @click="likePost"
            >
              <v-btn
                icon
                :class="
                  hover && $vuetify.theme.dark
                    ? 'bg-error-dk'
                    : hover && !$vuetify.theme.dark
                    ? 'bg-error-lt'
                    : ''
                "
                class="mr-1"
                small
                :color="hover || likedByUser ? 'error' : ''"
              >
                <v-icon v-if="likedByUser" size="24">mdi-heart</v-icon>
                <v-icon v-else size="24">mdi-heart-outline</v-icon>
              </v-btn>
              <span
                v-if="likeCount > 0"
                class="font-weight-regular"
                :class="hover || likedByUser ? 'error--text' : ''"
                >{{ likeCount | count }}</span
              >
            </div>
          </v-hover>
        </div>
        <v-spacer></v-spacer>
        <div>
          <v-hover v-slot="{ hover }">
            <v-btn small icon class="mx-1" :color="hover ? 'info' : ''">
              <v-icon size="24">mdi-share-variant-outline</v-icon>
            </v-btn>
          </v-hover>
        </div>
      </div>
      <div class="px-4">
        <div>
          <p
            ref="caption"
            class="mb-0 secondary--text"
            :class="$vuetify.theme.dark ? 'white--text' : 'secondary--text'"
            style="
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            "
          >
            <span class="font-weight-bold">{username}</span>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            <a href="">@username</a> Sequi esse blanditiis nobis ea nulla
            debitis reiciendis similique dignissimos commodi. Quisquam.
          </p>
          <v-hover v-slot="{ hover }">
            <span
              v-show="isSummarized()"
              style="cursor: pointer"
              :class="hover ? 'primary--text' : 'text--secondary'"
              @click="toggleSummary"
              >more</span
            >
          </v-hover>
        </div>
      </div>
    </v-card-text>
    <div class="px-4 py-2">
      <v-hover v-slot="{ hover }">
        <div
          :class="hover ? 'primary--text' : 'text--secondary'"
          @click="viewComments"
        >
          <p class="body-2 mb-0" style="cursor: pointer">
            View all {{ commentCount | count }} comments
          </p>
        </div>
      </v-hover>
    </div>
    <v-card-actions class="d-flex align-center px-4 pb-4">
      <v-avatar size="36" class="mr-2">
        <img
          src="https://randomuser.me/api/portraits/women/85.jpg"
          alt="John"
        />
      </v-avatar>
      <v-textarea
        placeholder="Add a comment..."
        rows="1"
        prepend-inner-icon="mdi-magnify"
        auto-grow
        hide-details
        filled
        dense
        rounded
        single-line
      ></v-textarea>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    // likedByUser: {
    //   type: Boolean,
    //   default: false,
    // },
    // likeCount: {
    //   type: Number,
    //   default: 0,
    // },
    // repostedByUser: {
    //   type: Boolean,
    //   default: false,
    // },
    // repostCount: {
    //   type: Number,
    //   default: 0,
    // },
    // commentCount: {
    //   type: Number,
    //   default: 0,
    // },
  },
  data() {
    return {
      profileMenu: false,
      likeCount: Math.floor(Math.random() * 10000000),
      likedByUser: false,
      repostCount: Math.floor(Math.random() * 1000000),
      repostedByUser: false,
      commentCount: Math.floor(Math.random() * 100000),
    }
  },
  computed: {
    // isSummarized() {
    //   if (this.$refs.caption) {
    //     return this.$refs.caption.offsetHeight < this.$refs.caption.scrollHeight
    //   }
    //   return false
    // },
  },
  methods: {
    goToListing() {
      console.log('Go to listing details')
    },
    share() {
      console.log('Share listing')
      const url = 'https://google.com'
      if (navigator.share) {
        navigator
          .share({
            title: 'Sharing Something',
            url,
          })
          .then(() => console.log('Thanks for sharing'))
      }
    },
    startChat() {
      console.log('Start chat')
    },
    sendInvite() {
      console.log('Send Invite')
    },
    like() {
      console.log('Like listing - Add listing to favorites')
      this.$socket.emit('like', { message: 'like' })
    },
    likePost() {
      if (this.likedByUser) {
        this.likeCount--
      } else {
        this.likeCount++
      }
      this.likedByUser = !this.likedByUser
      console.log({ likeCount: this.likeCount, likedByUser: this.likedByUser })
    },
    repostPost() {
      if (this.repostdByUser) {
        this.repostCount--
      } else {
        this.repostCount++
      }
      if (!this.repostedByUser) {
        this.repostedByUser = true
      }
      console.log({
        repostCount: this.repostCount,
        repostedByUser: this.repostedByUser,
      })
    },
    commentOnPost() {
      this.commentCount++
      console.log({ commentCount: this.commentCount })
    },
    viewComments() {
      console.log('View Comments')
      console.log({ isSummarized: this.isSummarized() })
      console.log({
        caption: this.$refs.caption,
        isSummarized: this.isSummarized(),
        offsetHeight: this.$refs.caption.offsetHeight,
        scrollHeight: this.$refs.caption.scrollHeight,
      })
    },
    isSummarized() {
      if (this.$refs.caption) {
        return this.$refs.caption.offsetHeight < this.$refs.caption.scrollHeight
      }
      return false
    },
    toggleSummary() {
      console.log('toggle summary')
      console.log({
        caption: this.$refs.caption,
        isSummarized: this.isSummarized(),
        offsetHeight: this.$refs.caption.offsetHeight,
        scrollHeight: this.$refs.caption.scrollHeight,
      })
      this.$refs.caption.style.webkitLineClamp =
        this.$refs.caption.style.webkitLineClamp === '2' ? '100' : '2'
    },
  },
}
</script>

<style></style>
