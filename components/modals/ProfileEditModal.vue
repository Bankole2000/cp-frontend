<template>
  <div class="profile-edit-modal">
    <v-dialog
      v-model="show"
      persistent
      :content-class="
        $vuetify.breakpoint.smAndUp
          ? 'rounded-xl elevated-light'
          : 'elevated-light'
      "
      scrollable
      :max-height="$vuetify.breakpoint.mdAndUp ? '700px' : '100vh'"
      :fullscreen="$vuetify.breakpoint.xs"
      width="500px"
    >
      <v-card
        :max-height="$vuetify.breakpoint.mdAndUp ? '700px' : '100vh'"
        class="elevated-light px-0"
        :tile="$vuetify.breakpoint.xs"
        :class="$vuetify.breakpoint.smAndUp ? 'rounded-xl' : ''"
      >
        <v-card-title class="px-4">Edit Profile</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="px-0">
          <v-card tile elevation="0">
            <v-hover v-slot="{ hover }">
              <v-app-bar
                tile
                color="#6A76AB"
                dark
                prominent
                :src="profileWallpaper"
                extension-height="80"
                class="elevated-light"
              >
                <template #img="{ props }">
                  <!-- gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)" -->
                  <v-img v-bind="props">
                    <template #placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </template>

                <v-overlay v-if="hover" absolute color="#036358">
                  <v-btn icon><v-icon>mdi-camera</v-icon></v-btn>
                </v-overlay>
              </v-app-bar>
            </v-hover>
            <!-- <v-card elevation="0" class="transparent mx-auto d-flex mt-n12"> -->
            <v-hover v-slot="{ hover }">
              <v-avatar
                size="100"
                class="mt-n12"
                style="margin-left: calc(50% - 50px)"
              >
                <v-img :src="profileImage" class="elevated-light"></v-img>
                <v-overlay
                  :value="hover || $vuetify.breakpoint.smAndDown"
                  style="inset: 0"
                  absolute
                  color="#036358"
                >
                  <v-btn icon @click="showImageEditModal = true"
                    ><v-icon>mdi-camera</v-icon></v-btn
                  >
                </v-overlay>
              </v-avatar>
            </v-hover>
            <!-- </v-card> -->
          </v-card>
          <ProfileWallpaperEditModal
            :dialog="showWallpaperEditModal"
            @close="showWallpaperEditModal = false"
          />
          <ProfileImageEditModal
            :dialog="showImageEditModal"
            :profile-image="profileImage"
            @close="showImageEditModal = false"
          />
          <ProfileDataForm :profile="userProfile" class="mt-8" />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text rounded color="error" class="pr-4" @click="close">
            <v-icon left>mdi-close</v-icon> cancel</v-btn
          >
          <v-hover v-slot="{ hover }">
            <v-btn
              style="transition: all 0.3s ease-in-out"
              nuxt
              rounded
              class="white--text my-0 pr-4"
              :class="
                hover
                  ? 'bg-gradient-right-primary-error elevated'
                  : 'bg-gradient-right-primary-accent elevated-light'
              "
              :loading="loading"
              :disabled="loading"
              @click="save"
            >
              <v-icon right>mdi-content-save</v-icon>
              Save
            </v-btn>
          </v-hover>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileDataForm from '../forms/user/ProfileDataForm.vue'
import ProfileImageEditModal from './ProfileImageEditModal.vue'
import ProfileWallpaperEditModal from './ProfileWallpaperEditModal.vue'
export default {
  components: {
    ProfileDataForm,
    ProfileImageEditModal,
    ProfileWallpaperEditModal,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      showImageEditModal: false,
      showWallpaperEditModal: false,
    }
  },
  computed: {
    ...mapGetters({
      userProfile: 'user/profile',
      profileImage: 'user/profileImage',
      profileWallpaper: 'user/profileWallpaper',
    }),
    show: {
      get() {
        return this.dialog
      },
      set(val) {
        this.$emit('close', val)
      },
    },
  },
  methods: {
    save() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$emit('close', false)
      }, 2000)
    },
    close() {
      this.$emit('close', false)
    },
  },
}
</script>

<style>
</style>