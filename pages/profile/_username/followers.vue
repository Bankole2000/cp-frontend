<template>
  <div class="profile-followers">
    <!-- TODO: If user not found -->
    <!-- TODO: If viewing user blocked -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            rounded
            filled
            single-line
            :style="{ fontSize: '1.4rem' }"
            :placeholder="`Search ${profile.username}'s followers`"
            append-icon="mdi-send"
          ></v-text-field>
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-container>
    <h1>User has Followers</h1>
  </div>
</template>

<script>
export default {
  props: ['profile'],
  data: () => ({
    tab: 0,
    items: ['Followers', 'Follow Requests'],
    loading: true,
    followers: [],
    total: 0,
    pages: 0,
    page: 0,
    limit: 20,
    fetchOnServer: false,
  }),
  async fetch() {
    try {
      this.loading = true
      const results = await this.$axios.$get(
        `${this.$store.getters.profilePath}/u/profile/${this.profile.username}/followers`
      )
      console.log({ results })
    } catch (error) {
      console.log({ error })
    } finally {
      this.loading = false
    }
  },
  async mounted() {
    await this.$fetch()
  },
}
</script>

<style></style>
