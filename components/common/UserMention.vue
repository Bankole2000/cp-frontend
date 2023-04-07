<template>
  <v-menu
    v-model="menu"
    open-on-hover
    bottom
    left
    nudge-right="100px"
    content-class="elevated-light rounded-lg"
    offset-y
  >
    <template #activator="{ on, attrs }">
      <nuxt-link
        :to="{ name: 'profile-username', params: { username: `@${username}` } }"
      >
        <span
          role="button"
          nuxt
          v-bind="attrs"
          class="font-weight-bold"
          style="color: var(--primary)"
          v-on="on"
          >@{{ username }}
        </span>
      </nuxt-link>
    </template>
    <v-card class="rounded-lg elevated-light" width="250px">
      <div v-if="loading" class="text-center pt-12 pb-8">
        <v-progress-circular
          indeterminate
          size="32"
          color="primary"
        ></v-progress-circular>
      </div>
      <v-card-title v-if="!loading" class="d-flex align-center">
        <v-avatar>
          <v-img
            :src="`${$store.getters.profilePath}/u/image/${username}?thumb=200x200`"
          >
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  size="24"
                  indeterminate
                  color="primary lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-avatar>
        <v-spacer></v-spacer>
        <div v-if="$store.getters['auth/user'] && profile">
          <v-btn v-if="profile.isYou" outlined small rounded disabled>
            You
          </v-btn>
          <v-btn
            v-else-if="!profile.followedByYou && !profile.sentRequest"
            :loading="loading"
            :disabled="loading"
            outlined
            class="rounded-xl text-capitalize"
            small
            >Follow</v-btn
          >
          <v-hover v-else-if="profile.sentRequest" v-slot="{ hover }">
            <v-btn
              :loading="loading"
              :disabled="loading"
              outlined
              :color="hover ? 'error' : ''"
              class="rounded-xl text-capitalize"
              small
              >{{ hover ? 'Cancel Request' : 'Requested' }}</v-btn
            >
          </v-hover>
          <v-hover v-else-if="profile.followedByYou" v-slot="{ hover }">
            <v-btn
              :loading="loading"
              :disabled="loading"
              outlined
              :color="hover ? 'error' : ''"
              class="rounded-xl text-capitalize"
              small
              >{{ hover ? 'Unfollow' : 'Following' }}</v-btn
            >
          </v-hover>
        </div>
      </v-card-title>
      <v-card-text
        v-if="profile && !loading"
        class="pt-0"
        :class="{
          'secondary--text': !$vuetify.theme.dark,
          'white--text': $vuetify.theme.dark,
        }"
      >
        <p class="body-1 mb-0 font-weight-bold">{{ profile.displayname }}</p>
        <p class="caption text--secondary mb-2">@{{ profile.username }}</p>
        <p>{{ profile.bio ? profile.bio : "Hi, I'm new to Relodger 👋" }}</p>
        <v-row class="text--secondary px-3">
          <v-col cols="6" align-self="start" class="pa-0">
            <span
              class="font-weight-black"
              :class="{
                'secondary--text': !$vuetify.theme.dark,
                'white--text': $vuetify.theme.dark,
              }"
              >{{ profile._count.followers | count }}</span
            >
            <span>Followers</span>
          </v-col>
          <v-col cols="6" align-self="start" class="pa-0">
            <span
              class="font-weight-black"
              :class="{
                'secondary--text': !$vuetify.theme.dark,
                'white--text': $vuetify.theme.dark,
              }"
              >{{ profile._count.following | count }}</span
            >
            <span>Following</span>
          </v-col>
          <v-col cols="6" align-self="start" class="pa-0">
            <span
              class="font-weight-black"
              :class="{
                'secondary--text': !$vuetify.theme.dark,
                'white--text': $vuetify.theme.dark,
              }"
              >{{ profile.offersCount | count }}</span
            >
            <span>Personal Ads</span>
          </v-col>
          <v-col cols="6" align-self="start" class="pa-0">
            <span
              class="font-weight-black"
              :class="{
                'secondary--text': !$vuetify.theme.dark,
                'white--text': $vuetify.theme.dark,
              }"
              >{{ profile.serviceCount | count }}</span
            >
            <span>Services</span>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-else-if="!loading" class="pb-0">
        <p class="body-2 mb-0 font-weight-bold text-center">
          This profile doesn't exist
        </p>
      </v-card-text>
      <v-card-actions></v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { debounce } from 'lodash'
export default {
  props: {
    username: {
      type: String,
      required: true,
    },
    profileSocket: {
      type: Object,
      require: true,
      default: () => {},
    },
    socketsReady: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      profile: null,
      loading: false,
      menu: false,
      listenersActive: false,
    }
  },
  fetchOnServer: false,
  async fetch() {
    this.loading = true
    if (this.profile) {
      console.log('profile exists')
      if (this.profile.username === this.username) {
        this.loading = false
        return
      }
    }
    try {
      console.log({ profileSocket: this.profileSocket })
      if (this.profileSocket.connected) {
        console.log('emtting event GET_PROFILE_PREVIEW')
        const result = await this.profileSocket.emitP('GET_PROFILE_PREVIEW', {
          userId: this.$store.getters['auth/user']?.userId,
          username: this.username,
        })
        this.profile = result
        console.log({ result })
      }
    } catch (error) {
      console.log({ error })
    } finally {
      this.loading = false
    }
  },
  watch: {
    menu: debounce(async function (value) {
      if (value) {
        await this.$fetch()
      }
      if (!value) {
        this.loading = true
      }
    }, 100),
  },
  methods: {},
}
</script>

<style></style>
