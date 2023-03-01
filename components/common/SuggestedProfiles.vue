<template>
  <v-card class="elevated-light rounded-xl mb-4 pa-0">
    <!-- <v-card-title class="px-4 pt-3 pb-1">Suggested Profiles</v-card-title> -->
    <v-card-text class="pa-0">
      <v-card-text class="pb-1 pt-3"> Suggested Profiles </v-card-text>
      <v-list two-line class="py-0">
        <v-list-item-group>
          <div v-for="(profile, i) in suggestedProfiles" :key="i">
            <v-skeleton-loader
              :boilerplate="false"
              :loading="loading"
              type="list-item-avatar-two-line"
              :tile="false"
              class="mx-auto"
            >
              <v-list-item
                nuxt
                :to="{
                  name: 'profile-username',
                  params: { username: profile.username },
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
                      <span
                        class="body-2 text-truncate"
                        style="max-width: 160px"
                      >
                        {{ profile.displayname }}
                      </span>
                      <v-icon small color="primary" class="ml-2"
                        >mdi-checkbox-marked-circle</v-icon
                      >
                    </div>
                  </v-list-item-title>
                  <v-list-item-subtitle class="font-weight-light">
                    <div class="d-flex align-center">
                      <span
                        class="d-inline-block text-truncate"
                        style="max-width: 100px"
                      >
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
                    small
                    :class="
                      $vuetify.theme.dark ? 'white black--text' : 'secondary'
                    "
                  >
                    follow
                  </v-btn>
                  <v-hover v-else-if="profile.sentRequest" v-slot="{ hover }">
                    <!-- :class="
                        $vuetify.theme.dark ? 'black--text' : 'secondary--text'
                      " -->
                    <v-btn
                      class="text-capitalize rounded-xl"
                      outlined
                      small
                      :color="hover ? 'error' : ''"
                    >
                      {{ hover ? 'Cancel Request' : 'Request' }}
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
                      :color="hover ? 'error' : ''"
                    >
                      {{ hover ? 'Unfollow' : 'Following' }}
                    </v-btn>
                  </v-hover>
                </v-list-item-action>
              </v-list-item>
            </v-skeleton-loader>
          </div>
        </v-list-item-group>
      </v-list>
    </v-card-text>
    <v-card-actions class="px-4 pt-1 d-flex justify-center">
      <a href="" class="subtitle-2">Show more</a>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    suggestedProfiles: [
      {
        displayName: 'Jane Doe',
        username: 'janedoe',
        avatar: 'https://randomuser.me/api/portraits/women/80.jpg',
      },
      {
        displayName: 'Dude with a really long username that doesnt quite fit',
        username: 'johndoe',
        avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
      },
      {
        displayName: 'John Doe',
        username: 'personwithareallylongusername',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      },
    ],
  }),
  fetchOnServer: false,
  async fetch() {
    try {
      this.loading = true
      const { data } = await this.$axios.$get(
        `${this.$store.getters.profilePath}/u/suggested`
      )
      console.log({ data, context: this.$nuxt.context })
      this.suggestedProfiles = data
    } catch (error) {
      console.log({ error })
    } finally {
      this.loading = false
    }
  },
  async mounted() {
    await this.$fetch()
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
}
</script>

<style></style>
