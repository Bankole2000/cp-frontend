<template>
  <div class="ml-4 mr-8">
    <v-menu
      v-model="menu"
      offset-y
      content-class="rounded-xl elevated-light"
      transition="scroll-y-reverse-transition"
      top
    >
      <template #activator="{ on, attrs }">
        <v-hover v-slot="{ hover }">
          <v-card
            flat
            class="py-2 mb-4 d-flex px-3 rounded-xl"
            :class="
              menu || hover
                ? 'elevated-light bg-gradient-right-primary-accent white--text'
                : ''
            "
            style="cursor: pointer; transition: all 0.3s ease"
            :style="{
              backgroundColor: $vuetify.theme.dark ? '#121212' : '#f0efef',
            }"
            v-bind="attrs"
            v-on="on"
          >
            <div class="d-flex align-center">
              <v-avatar size="30" class="mb-0 mr-2">
                <img
                  :src="profileImage"
                  :alt="profile ? profile.username : ''"
                />
              </v-avatar>
              <div>
                <p class="mb-0 subtitle-2">
                  {{ profile ? profile.displayname : 'Settings' }}
                </p>
                <p v-if="Boolean(profile)" class="mb-0 caption mt-n1">
                  @{{ profile.username }}
                </p>
                <!-- <v-chip v-else label x-small class="bg-secondary-lt px-1">
                  <span class="error--text">Not Logged In</span>
                </v-chip> -->
              </div>
            </div>
            <v-spacer></v-spacer>
            <v-icon :color="hover || menu ? 'white' : ''"
              >mdi-cog-outline</v-icon
            >
          </v-card>
        </v-hover>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in links" :key="index">
          <v-hover v-slot="{ hover }">
            <nuxt-link :to="{ name: item.route }">
              <v-card
                block
                flat
                class="px-4 py-2 my-2 rounded-xl d-flex align-center"
                :class="{
                  'elevated-light': hover,
                  'bg-primary-lt': true,
                }"
                width="180"
                style="text-align: left; transition: all 0.3s ease-in-out"
                :style="{
                  backgroundColor: $vuetify.theme.dark ? '#121212' : '#f0efef',
                }"
              >
                <v-icon left>{{ item.icon }}</v-icon>
                <p class="mb-0">{{ item.name }}</p>
              </v-card>
            </nuxt-link>
          </v-hover>
        </v-list-item>
        <v-list-item v-if="Boolean(profile)">
          <v-hover v-slot="{ hover }">
            <v-card
              block
              flat
              class="px-4 py-2 my-2 rounded-xl d-flex align-center"
              :class="{
                'elevated-light': hover,
                'bg-primary-lt': true,
              }"
              width="180"
              style="text-align: left; transition: all 0.3s ease-in-out"
              :style="{
                backgroundColor: $vuetify.theme.dark ? '#121212' : '#f0efef',
              }"
              @click="logout"
            >
              <v-icon left>mdi-logout</v-icon>
              <p class="mb-0">Logout</p>
            </v-card>
          </v-hover>
        </v-list-item>
        <v-list-item v-else>
          <v-hover v-slot="{ hover }">
            <v-card
              block
              flat
              class="px-4 py-2 my-2 rounded-xl d-flex align-center"
              :class="{
                'elevated-light': hover,
                'bg-primary-lt': true,
              }"
              width="180"
              style="text-align: left; transition: all 0.3s ease-in-out"
              :style="{
                backgroundColor: $vuetify.theme.dark ? '#121212' : '#f0efef',
              }"
              @click="login"
            >
              <v-icon left>mdi-login</v-icon>
              <p class="mb-0">Login</p>
            </v-card>
          </v-hover>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CreateButton',
  // // eslint-disable-next-line vue/require-prop-types
  // props: ['profile'],
  data() {
    return {
      menu: false,
      links: [
        {
          name: 'Settings',
          icon: 'mdi-cog-outline',
          route: 'settings',
        },
        {
          name: 'Help and FAQs',
          icon: 'mdi-help-circle-outline',
          route: 'help',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      profile: 'user/profile',
      profileImage: 'user/profileImage',
    }),
  },
  methods: {
    async logout() {
      const result = await this.$store.dispatch('auth/logout', null, {
        root: true,
      })
      if (result.success) {
        this.$router.push({ name: 'index' })
        this.$store.commit('user/setUserProfile', null)
      }
    },
    login() {
      this.$router.push({ name: 'auth' })
    },
  },
}
</script>

<style>
</style>