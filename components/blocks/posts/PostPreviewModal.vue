<template>
  <v-dialog
    :value="dialog"
    :scrollable="$vuetify.breakpoint.smAndDown"
    persistent
    fullscreen
  >
    <v-card v-if="$vuetify.breakpoint.smAndDown">
      <v-card-title>
        <v-btn nuxt to="./" icon><v-icon>mdi-arrow-left</v-icon></v-btn>
        <v-spacer></v-spacer>
        Post
        <v-spacer></v-spacer>
        <v-btn nuxt to="./" icon><v-icon>mdi-window-close</v-icon></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="px-0">
        <v-skeleton-loader
          :boilerplate="false"
          type="list-item-avatar-two-line, list-item-three-line"
          :tile="false"
          class="mx-auto"
        ></v-skeleton-loader>
        <v-skeleton-loader
          :boilerplate="false"
          type="image"
          tile
          class="mx-auto"
        ></v-skeleton-loader>
        <v-skeleton-loader
          :boilerplate="false"
          type="card-heading"
          class="mx-auto"
        ></v-skeleton-loader>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions> Comment Section </v-card-actions>
    </v-card>
    <div v-else class="d-flex">
      <div style="width: 70vw">
        <v-card
          tile
          style="min-height: 100vh; min-width: 100%"
          class="transparent"
        >
          <v-overlay :absolute="true" :opacity="0.8" :value="true">
            <v-carousel
              :continuous="false"
              :cycle="false"
              :show-arrows="true"
              hide-delimiter-background
              height="90vh"
              width="100%"
            >
              <v-carousel-item v-for="(image, i) in images" :key="i">
                <v-card
                  color="transparent"
                  flat
                  height="90vh"
                  width="70vw"
                  class="fill-height d-flex align-center justify-center"
                >
                  <v-img
                    :src="image"
                    max-height="90vh"
                    max-width="70vw"
                    contain
                    @click="() => {}"
                  />
                </v-card>
              </v-carousel-item>
            </v-carousel>
          </v-overlay>
        </v-card>
      </div>
      <div style="width: 30vw">
        <v-card style="min-height: 100vh">
          <v-card-title class="headline"
            >Use Google's location service?</v-card-title
          >
          <v-card-text>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="close"> Disagree </v-btn>

            <v-btn color="green darken-1" text @click="close"> Agree </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    post: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    // dialog: true,
    images: [
      'https://images.squarespace-cdn.com/content/v1/625964627d9818640fa5b8cb/c3dda892-6330-42e7-baf3-6a905a200493/5+Tips+to+get+you+started+as+a+great+Dungeon+Master+in+Dungeons+and+Dragons+%7C+crit+academy',
      'https://i.pinimg.com/originals/32/3f/4f/323f4f9d59315390b539db3b09cc14a6.jpg',
      'https://i.redd.it/q0vws2aot9zz.jpg',
    ],
  }),
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style></style>
