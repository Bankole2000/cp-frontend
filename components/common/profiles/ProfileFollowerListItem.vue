<template>
  <div ref="followerListItem">
    <v-list-item
      nuxt
      :to="{
        name: 'profile-username',
        params: { username: `@${profile.username}` },
      }"
      class="px-0"
      :class="profile.bio ? 'py-4' : 'py-0'"
    >
      <div
        style="display: flex; align-items: start; cursor: pointer; width: 100%"
        :class="$vuetify.breakpoint.smAndUp ? 'px-4' : 'px-2'"
      >
        <div :class="$vuetify.breakpoint.smAndUp ? 'pr-4' : 'pr-2'">
          <v-badge
            overlap
            bordered
            bottom
            icon="mdi-account-plus"
            offset-x="15"
            offset-y="15"
            color="blue"
          >
            <v-avatar :size="$vuetify.breakpoint.smAndUp ? 48 : 36">
              <v-img
                :src="
                  profile.imageUrl
                    ? profile.imageUrl
                    : `${$store.getters.profilePath}/u/image/${profile.username}`
                "
              ></v-img>
            </v-avatar>
          </v-badge>
        </div>
        <div style="flex-grow: 1">
          <div style="display: flex; align-items: center">
            <div>
              <div class="d-flex align-center">
                <span
                  :style="{
                    fontSize: $vuetify.breakpoint.smAndUp ? '16px' : '13px',
                  }"
                  class="font-weight-bold text-truncate"
                  >{{ profile.displayname }}</span
                >

                <v-icon small color="primary" class="ml-2"
                  >mdi-checkbox-marked-circle</v-icon
                >
              </div>
              <div class="d-flex align-center">
                <span
                  class="d-inline-block text-truncate text--secondary"
                  style="max-width: 100px"
                  :style="{
                    fontSize: $vuetify.breakpoint.smAndUp ? '15px' : '12px',
                  }"
                >
                  @{{ profile.username }}
                </span>
                <!-- v-if="profile.followsYou" -->
                <v-chip
                  v-if="follower.followsYou"
                  label
                  x-small
                  class="bg-secondary-lt px-1 ml-2"
                >
                  <span class="text--secondary">Follows you</span>
                </v-chip>
              </div>
            </div>
            <v-spacer></v-spacer>
            <div class="d-flex align-center">
              <v-btn
                v-if="!follower.followedByYou && !follower.sentRequest"
                class="text-capitalize rounded-xl"
                depressed
                small
                :class="$vuetify.theme.dark ? 'white black--text' : 'secondary'"
                :loading="loading"
                :disabled="loading"
              >
                Follow
              </v-btn>
              <v-hover v-else-if="follower.followedByYou" v-slot="{ hover }">
                <v-btn
                  class="text-capitalize rounded-xl mr-2"
                  outlined
                  :loading="loading"
                  :disabled="loading"
                  :color="hover ? 'error' : ''"
                  :small="$vuetify.breakpoint.smAndUp"
                  :x-small="!$vuetify.breakpoint.smAndUp"
                  @click.prevent="() => {}"
                  >{{ hover ? 'Unfollow' : 'Following' }}</v-btn
                >
              </v-hover>
              <v-hover v-else-if="follower.sentRequest" v-slot="{ hover }">
                <v-btn
                  class="text-capitalize rounded-xl"
                  outlined
                  small
                  :loading="loading"
                  :disabled="loading"
                  :color="hover ? 'error' : ''"
                  @click.prevent="() => {}"
                >
                  <!-- @click.prevent="cancelFollowRequest(profile)" -->
                  {{ hover ? 'Cancel Request' : 'Request' }}
                </v-btn>
              </v-hover>

              <v-btn
                :small="!$vuetify.breakpoint.smAndUp"
                icon
                @click.prevent="() => {}"
                ><v-icon>mdi-dots-horizontal</v-icon></v-btn
              >
            </div>
          </div>
          <div v-if="profile.bio">
            <p
              class="mt-1 mb-0 pr-2"
              :style="{
                fontSize: $vuetify.breakpoint.smAndUp ? '15px' : '12px',
              }"
            >
              {{ profile.bio }}
            </p>
          </div>
        </div>
      </div>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: ['follower', 'index', 'total'],
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    profile() {
      if (this.follower) {
        return this.follower.follower
      }
      return {}
    },
  },
  mounted() {
    this.onElementObserved()
  },
  methods: {
    onElementObserved() {
      const observer = new IntersectionObserver(
        (entries) => {
          console.log({ entries })
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
              // this.player.play();
              console.log(
                `Is Intersecting ${this.index} - ${this.follower.followerId}`
              )
              if (this.index + 1 === this.total) {
                console.log('Last Profile')
                // check if any more ads to fetch
                this.$emit('fetch-more')
              }
              // this.visible = true
            } else {
              // this.player.pause();
              console.log(
                `Is NOT Intersecting ${this.index} - ${this.follower.followerId}`
              )
              // this.visible = false
            }
          })
        },
        { threshold: 1 }
      )
      observer.observe(this.$refs.followerListItem)
    },
  },
}
</script>

<style></style>
