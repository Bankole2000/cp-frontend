<template>
  <div>
    <v-text-field
      v-model="searchTerm"
      class="my-2"
      prepend-inner-icon="mdi-magnify"
      rounded
      :dense="!$vuetify.breakpoint.smAndUp"
      filled
      clearable
      hide-details
      single-line
      :style="{
        fontSize: $vuetify.breakpoint.smAndUp ? '1.4rem' : '1rem',
      }"
      :placeholder="`Search follow requests`"
      append-icon="mdi-send"
      @click:clear="clearSearch"
      @keypress.enter="$fetch"
      @change="() => (next ? (next = null) : null)"
    ></v-text-field>
    <v-expand-transition>
      <div v-show="!!searchTerm" class="caption text--secondary">
        <p class="mb-1">
          Searching <strong>"{{ searchTerm }}"</strong> among your follower
          requests
        </p>
      </div>
    </v-expand-transition>
    <v-divider></v-divider>
    <v-expand-transition>
      <v-progress-linear
        v-show="loading"
        indeterminate
        color="primary"
      ></v-progress-linear>
    </v-expand-transition>
    <v-list three-line class="pa-0">
      <v-list-item-group class="pa-0">
        <v-scroll-y-transition group>
          <div v-for="i in 20" :key="i">
            <v-list-item class="px-0" :class="i % 2 === 0 ? 'py-4' : 'py-0'">
              <div
                style="
                  display: flex;
                  align-items: start;
                  cursor: pointer;
                  width: 100%;
                "
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
                        src="https://cdn.vuetifyjs.com/images/john.png"
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
                            fontSize: $vuetify.breakpoint.smAndUp
                              ? '16px'
                              : '13px',
                          }"
                          class="font-weight-bold text-truncate"
                          >Andrew Diete-Koki</span
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
                            fontSize: $vuetify.breakpoint.smAndUp
                              ? '15px'
                              : '12px',
                          }"
                        >
                          @username
                        </span>

                        <v-chip label x-small class="bg-secondary-lt px-1 ml-2">
                          <span class="text--secondary">Follows you</span>
                        </v-chip>
                      </div>
                    </div>
                    <v-spacer></v-spacer>
                    <div class="d-flex align-center">
                      <v-btn
                        class="text-capitalize rounded-xl mr-2"
                        text
                        color="error"
                        small
                        :icon="!$vuetify.breakpoint.mdAndUp"
                      >
                        <v-icon v-if="!$vuetify.breakpoint.mdAndUp"
                          >mdi-window-close</v-icon
                        >
                        <span v-else>Decline</span>
                      </v-btn>
                      <v-btn
                        class="text-capitalize rounded-xl mr-2"
                        :color="
                          !$vuetify.breakpoint.mdAndUp ? 'white' : 'success'
                        "
                        :class="{ success: !$vuetify.breakpoint.mdAndUp }"
                        small
                        :icon="!$vuetify.breakpoint.mdAndUp"
                      >
                        <v-icon v-if="!$vuetify.breakpoint.mdAndUp"
                          >mdi-check</v-icon
                        >
                        <span v-else>Accept</span>
                      </v-btn>
                      <!-- <v-btn :small="!$vuetify.breakpoint.smAndUp" icon
                        ><v-icon>mdi-dots-horizontal</v-icon></v-btn
                      > -->
                    </div>
                  </div>
                  <div v-if="i % 2 === 0">
                    <p
                      class="mt-1 mb-0 pr-2"
                      :style="{
                        fontSize: $vuetify.breakpoint.smAndUp ? '15px' : '12px',
                      }"
                    >
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Repellat, dignissimos? Temporibus ab at nemo neque nisi
                      molestias aliquid, natus soluta illo accusantium magnam
                      repellat quo architecto placeat vero ipsam rerum.
                    </p>
                  </div>
                </div>
              </div>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-scroll-y-transition>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'ProfileFollowerRequestsList',
  props: ['profile', 'socket'],
  data: () => ({
    loading: false,
    followers: [],
    total: 0,
    pages: 0,
    page: 1,
    limit: 20,
    searchTerm: '',
    next: null,
  }),
  fetchOnServer: false,
  async fetch() {
    if (this.loading) return
    try {
      this.loading = true
      let url
      if (this.searchTerm) {
        url = new URL(
          `${
            this.$store.getters.profilePath
          }/me/follow-requests/received/search?q=${this.searchTerm}&page=${
            this.next ? this.next : this.page
          }&limit=${this.limit}`
        )
      } else {
        url = new URL(
          `${
            this.$store.getters.profilePath
          }/me/follow-requests/received?page=${
            this.next ? this.next : this.page
          }&limit=${this.limit}`
        )
      }
      console.log({ url })
      const results = await this.$axios.$get(url.href)
      console.log({ results })
    } catch (error) {
      console.log({ error })
    } finally {
      this.loading = false
    }
  },
  watch: {
    searchTerm: debounce(async function (value) {
      console.log({ value })
      await this.$fetch()
    }, 500),
  },
  methods: {
    async clearSearch(e) {
      console.log({ e, searchTerm: this.searchTerm })
      this.searchTerm = ''
      this.next = null
      await this.$fetch()
    },
  },
}
</script>

<style></style>
