<template>
  <v-list-item
    nuxt
    :to="{
      name: 'profile-username',
      params: { username: `@${profile.username}` },
    }"
    dense
  >
    <v-list-item-avatar
      size="40"
      class="mr-2"
      :class="{ 'mt-0': profile.promoted }"
    >
      <v-img
        :src="
          profile.imageUrl
            ? profile.imageUrl
            : `${$store.getters.profilePath}/u/image/${profile.username}`
        "
      ></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        <div class="d-flex align-center">
          <span class="body-2 text-truncate" style="max-width: 160px">
            {{ profile.displayname }}
          </span>
          <v-icon small color="primary" class="ml-2"
            >mdi-checkbox-marked-circle</v-icon
          >
        </div>
      </v-list-item-title>
      <v-list-item-subtitle class="font-weight-light">
        <div class="d-flex align-center">
          <span class="d-inline-block text-truncate" style="max-width: 100px">
            @{{ profile.username }}
          </span>
          <v-chip
            v-if="profile.followsYou"
            label
            x-small
            class="bg-secondary-lt px-1 ml-2"
          >
            <span class="text--secondary">Follows you</span>
          </v-chip>
        </div>
      </v-list-item-subtitle>
      <v-list-item-subtitle v-if="profile.promoted">
        <div class="d-flex align-center mt-0">
          <v-icon x-small class="mr-1">mdi-finance</v-icon>
          <span class="text--disabled caption">Promoted</span>
        </div>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action :class="{ 'mt-n1': profile.promoted }">
      <v-btn
        v-if="!profile.followedByYou && !profile.sentRequest"
        class="text-capitalize rounded-xl"
        depressed
        :loading="loading"
        :disabled="loading"
        small
        :class="$vuetify.theme.dark ? 'white black--text' : 'secondary'"
        @click.prevent="follow(profile)"
      >
        follow
      </v-btn>
      <v-hover v-else-if="profile.sentRequest" v-slot="{ hover }">
        <v-btn
          class="text-capitalize rounded-xl"
          outlined
          small
          :loading="loading"
          :disabled="loading"
          :color="hover ? 'error' : ''"
          @click.prevent="cancelFollowRequest(profile)"
        >
          {{ hover ? 'Cancel Request' : 'Requested' }}
        </v-btn>
      </v-hover>
      <v-hover v-else-if="profile.followedByYou" v-slot="{ hover }">
        <!-- :class="
                        $vuetify.theme.dark ? 'black--text' : 'secondary--text'
                      " -->
        <v-btn
          class="text-capitalize rounded-xl"
          outlined
          small
          :loading="loading"
          :disabled="loading"
          :color="hover ? 'error' : ''"
          @click.prevent="unfollow(profile)"
        >
          {{ hover ? 'Unfollow' : 'Following' }}
        </v-btn>
      </v-hover>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['profile'],
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      profilePath: 'profilePath',
    }),
  },
  methods: {
    async follow(profile) {
      if (this.loading) return
      this.loading = true
      try {
        const res = await this.$axios.$post(
          `${this.profilePath}/me/follow/${profile.username}`
        )
        console.log({ res })
        console.log(`follow user @${profile.username}`)
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
    },
    async unfollow(profile) {
      if (this.loading) return
      this.loading = true
      try {
        const res = await this.$axios.$post(
          `${this.profilePath}/me/unfollow/${profile.username}`
        )
        console.log({ res })
        console.log(`unfollow user @${profile.username}`)
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
    },
    async cancelFollowRequest(profile) {
      if (this.loading) return
      this.loading = true
      try {
        const res = await this.$axios.$delete(
          `${this.profilePath}/me/follow-request/sent/${profile.username}`
        )
        console.log({ res })
        console.log(`Cancel follow request sent to user @${profile.username}`)
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
