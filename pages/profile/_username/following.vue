<template>
  <div class="profile-following">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="pa-0">
          <h1>User Is Following</h1>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ['profile', 'socket'],
  data: () => ({
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
        `${this.$store.getters.profilePath}/u/profile/${this.profile.username}/following`
      )
      console.log({ results })
    } catch (error) {
      console.log({ error })
    } finally {
      this.loading = false
    }
  },
}
</script>

<style></style>
