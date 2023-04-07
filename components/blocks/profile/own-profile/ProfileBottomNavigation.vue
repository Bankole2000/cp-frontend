<template>
  <v-bottom-navigation
    v-if="$vuetify.breakpoint.smAndDown"
    :height="!visible ? '115px' : '49px'"
    style="z-index: 6"
    app
  >
    <template #default>
      <div style="width: 100vw">
        <div
          :style="{
            width: '100vw',
            transition: 'all 0.2s ease-in-out',
          }"
        ></div>
        <div>
          <v-tabs
            optional
            grow
            :background-color="'deep-purple accent-4'"
            slider-color="white"
            dark
            center-active
            show-arrows
          >
            <v-tab
              v-for="(route, i) in routes"
              :key="i"
              nuxt
              exact
              :exact-active-class="'white--text font-weight-black'"
              :class="'white--text'"
              :active-class="'white--text font-weight-black'"
              :value="route.route"
              :to="route.route"
            >
              {{ route.title }}
            </v-tab>
          </v-tabs>
        </div>

        <v-scroll-y-transition>
          <div v-show="!visible">
            <v-hover v-slot="{ hover }">
              <div
                class="mb-0 bg-gradient-right-primary-accent elevated-light"
                style="transition: all 0.2s ease-in-out"
                :class="{
                  grey: !hover,
                  'lighten-3': !$vuetify.theme.dark,
                  'darken-3': $vuetify.theme.dark,
                }"
              >
                <v-list-item
                  dense
                  :class="{
                    'white--text': !$vuetify.theme.dark,
                  }"
                >
                  <v-list-item-avatar size="40" class="mr-2">
                    <v-img :src="profileImage"></v-img>
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
                        <v-icon small color="primary" class="ml-2">
                          >mdi-checkbox-marked-circle</v-icon
                        >
                      </div>
                    </v-list-item-title>
                    <v-list-item-subtitle class="font-weight-light">
                      <div class="d-flex align-center">
                        <span
                          class="d-inline-block text-truncate"
                          :class="{
                            'white--text': !$vuetify.theme.dark,
                          }"
                          style="max-width: 100px"
                        >
                          @{{ profile.username }}
                        </span>
                        <v-chip label x-small class="bg-secondary-lt px-1 ml-2">
                          <span class="text--secondary">Follows you</span>
                        </v-chip>
                      </div>
                    </v-list-item-subtitle>
                    <!-- <v-list-item-subtitle>
                            <div class="d-flex align-center mt-0">
                              <v-icon x-small class="mr-1">mdi-finance</v-icon>
                              <span class="text--disabled caption"
                                >Promoted</span
                              >
                            </div>
                          </v-list-item-subtitle> -->
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-card
                      class="text-capitalize elevated-light rounded-xl py-2 px-4"
                      flat
                      :class="
                        $vuetify.theme.dark
                          ? 'white black--text'
                          : 'black white--text'
                      "
                      @click="showEditProfileModal"
                    >
                      Edit Profile
                    </v-card>
                  </v-list-item-action>
                </v-list-item>
              </div>
            </v-hover>
          </div>
        </v-scroll-y-transition>
      </div>
    </template>
  </v-bottom-navigation>
</template>

<script>
export default {
  props: ['profile', 'visible', 'routes', 'profileImage', 'showLeftNav'],
  methods: {
    showEditProfileModal() {
      this.$emit('showEditProfileModal')
    },
  },
}
</script>

<style></style>
