<template>
  <v-card :loading="loading">
    <v-list>
      <v-skeleton-loader
        :loading="loading"
        :boilerplate="false"
        type="list-item-avatar-two-line"
      >
        <div>
          <div v-if="key === '@'">
            <v-scroll-y-reverse-transition v-if="profiles.length" group>
              <v-list-item
                v-for="(
                  {
                    displayname,
                    username,
                    imageUrl,
                    createdAt,
                    followsYou,
                    followedByYou,
                    isYou,
                  },
                  i
                ) in profiles"
                :key="i"
                @click="selectProfile(username)"
              >
                <v-list-item-avatar>
                  <v-img
                    :src="
                      imageUrl
                        ? imageUrl
                        : `${$store.getters.profilePath}/u/image/${username}`
                    "
                  ></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle>
                    <span
                      class="font-weight-bold"
                      :class="{
                        'secondary--text': !$vuetify.theme.dark,
                        'white--text': $vuetify.theme.dark,
                      }"
                      >{{ displayname }}</span
                    >
                    <span class="text--secondary font-weight-regular">
                      &bull; Joined {{ $moment(createdAt).fromNow() }}</span
                    >
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="font-weight-regular">
                    <span
                      :class="{
                        'secondary--text': !$vuetify.theme.dark,
                        'white--text': $vuetify.theme.dark,
                      }"
                      >@{{ username }}</span
                    >
                    <span v-if="followsYou && followedByYou" class="caption"
                      >&bull; You Follow each other</span
                    >
                    <span v-else-if="followsYou" class="caption"
                      >&bull; Follows you</span
                    >
                    <span v-else-if="followedByYou" class="caption"
                      >&bull; You Follow</span
                    >
                    <span v-else-if="isYou" class="caption">&bull; You</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-scroll-y-reverse-transition>
            <v-alert
              v-else
              text
              type="error"
              border="left"
              icon="mdi-account-search"
              class="mb-0 mx-2"
            >
              Couldn't find any profiles 🤷‍♂️
            </v-alert>
          </div>
          <div v-if="key === '#'">
            <v-scroll-y-reverse-transition v-if="tags.length" group>
              <v-list-item
                v-for="tag in tags"
                :key="tag.id"
                @click="selectTag(tag.name)"
              >
                <v-list-item-avatar
                  tile
                  :color="`grey ${
                    $vuetify.theme.dark ? 'darken-4' : 'lighten-4'
                  }`"
                >
                  <v-icon>mdi-pound</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle>
                    <span
                      class="font-weight-bold"
                      :class="{
                        'secondary--text': !$vuetify.theme.dark,
                        'white--text': $vuetify.theme.dark,
                      }"
                      >#{{ tag.name }}</span
                    >
                    <span class="text--secondary font-weight-regular">
                      &bull; created
                      {{ $moment(tag.createdAt).fromNow() }}</span
                    >
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="font-weight-regular">
                    <span
                      :class="{
                        'secondary--text': !$vuetify.theme.dark,
                        'white--text': $vuetify.theme.dark,
                      }"
                      >{{ tag._count.posts | count }} Post{{
                        tag._count.posts > 1 ? 's' : ''
                      }}</span
                    >
                    <span class="caption">&bull; Sponsored</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-scroll-y-reverse-transition>
            <v-alert
              v-else
              text
              border="left"
              color="accent"
              icon="mdi-rocket"
              class="mb-0 mx-2"
            >
              Oh cool! A new hashtag 🥳🎉
            </v-alert>
          </div>
        </div>
      </v-skeleton-loader>
    </v-list>
  </v-card>
</template>

<script>
import { debounce } from 'lodash'
export default {
  props: {
    query: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
    },
    profileSocket: {
      type: Object,
      default: () => {},
    },
    postSocket: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: true,
      profiles: [],
      tags: [],
      limit: 6,
    }
  },
  async fetch() {
    if (!this.query) return
    if (!this.active) return
    if (this.loading) return
    const key = this.query.charAt(0)
    if (key !== '@' && key !== '#') return
    try {
      this.loading = true
      const q = this.query.substring(1)
      const url =
        key === '@'
          ? new URL(
              `${this.$store.getters.profilePath}/me/taggable?q=${q}&limit=${this.limit}`
            )
          : new URL(
              `${this.$store.getters.postPath}/tags?q=${q}&limit=${this.limit}`
            )
      const {
        data: { data },
      } = await this.$axios.$get(url.href)
      console.log({ data })
      if (key === '@') {
        this.profiles = data
      } else if (key === '#') {
        this.tags = data
      }
    } catch (error) {
      console.log({ error })
    } finally {
      this.loading = false
    }
  },
  computed: {
    key() {
      if (this.query) {
        return this.query.charAt(0)
      }
      return null
    },
  },
  watch: {
    query: debounce(async function () {
      await this.getData()
    }, 100),
  },
  async mounted() {
    if (this.postSocket && this.profileSocket) {
      this.profileSocket.on('TAGGABLE_PROFILES', (data) => {
        console.log({ data })
        this.profiles = data.data.data
        this.loading = false
      })
      this.postSocket.on('SEARCH_TAGS', (data) => {
        console.log({ data })
        this.tags = data.data.data
        this.loading = false
      })
      await this.getData()
    }
  },
  methods: {
    async getData() {
      if (this.key === '@') {
        this.loading = true
        await this.profileSocket.emit('TAGGABLE_PROFILES', {
          userId: this.$store.getters['auth/user'].userId,
          q: this.query ? this.query.substring(1) : null,
          page: this.page,
          limit: this.limit,
        })
      } else if (this.key === '#') {
        this.loading = true
        await this.postSocket.emit('SEARCH_TAGS', {
          q: this.query ? this.query.substring(1) : null,
          page: this.page,
          limit: this.limit,
        })
      }
    },
    selectTag(tag) {
      this.$emit('select', `#${tag}`)
    },
    selectProfile(username) {
      this.$emit('select', `@${username}`)
    },
  },
}
</script>

<style></style>
