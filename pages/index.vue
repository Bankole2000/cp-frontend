<template>
  <div>
    <v-card>
      <v-app-bar
        color="#6A76AB"
        dark
        prominent
        src="https://picsum.photos/1920/1080?random"
        extension-height="80"
        class="elevated-light"
      >
        <template #img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          ></v-img>
        </template>

        <template #extension>
          <div class="mb-n16 pt-6" style="width: 100%">
            <v-container>
              <v-row align="end">
                <v-col cols="8">
                  <div class="d-flex align-end" style="width: 100%">
                    <v-avatar
                      size="150"
                      style="border-width: 5px; border-style: solid"
                      :style="{
                        borderColor: $vuetify.theme.dark
                          ? '#121212'
                          : '#f0efef',
                      }"
                    >
                      <v-img
                        src="https://randomuser.me/api/portraits/men/12.jpg"
                        contain
                        :aspect-ratio="1"
                        alt="Vuetify Logo"
                      ></v-img>
                    </v-avatar>
                    <div class="mb-2 ml-2">
                      <div class="text-h6 font-weight-black mb-0">
                        Display name
                      </div>
                      <div
                        class="subtitle-1 text--secondary font-weight-regular"
                      >
                        @username
                      </div>
                    </div>
                    <v-spacer></v-spacer>
                    <div class="mb-4">
                      <v-btn icon outlined color="primary"
                        ><v-icon>mdi-dots-horizontal</v-icon></v-btn
                      >
                      <v-btn icon outlined color="primary"
                        ><v-icon>mdi-email-outline</v-icon></v-btn
                      >
                      <v-btn
                        outlined
                        rounded
                        large
                        color="primary"
                        class="text-capitalize"
                        >Following</v-btn
                      >
                      <v-btn
                        outlined
                        rounded
                        large
                        color="primary"
                        class="text-capitalize"
                        >Edit Profile</v-btn
                      >
                    </div>
                  </div>
                </v-col>
                <v-col cols="4"></v-col>
              </v-row>
            </v-container>
          </div>
        </template>
      </v-app-bar>
    </v-card>
    <v-container>
      <v-row>
        <v-col cols="3" class="pt-8">
          <v-card
            style="
              position: sticky;
              left: 20px;
              right: 60px;
              bottom: 5px;
              top: 80px;
            "
            class="elevated-light rounded-xl mt-16"
          >
            <v-card-title>Card Title</v-card-title>
            <v-card-text>Card Text</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="5" class="pt-8 mt-16">
          <!-- <v-tabs grow class="mt-16 mb-8" background-color="transparent">
            <v-tab>Posts</v-tab>
            <v-tab>Listings</v-tab>
            <v-tab>Roommate</v-tab>
          </v-tabs> -->
          <ListingCardItem v-for="i in 5" :key="i" class="mb-4" />
        </v-col>
        <v-col cols="4">
          <v-card
            style="
              position: sticky;
              left: 20px;
              right: 60px;
              bottom: 5px;
              top: 80px;
            "
            class="elevated-light rounded-xl"
          >
            <v-card-title>Card Title</v-card-title>
            <v-card-text>Card Text</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <ListingPreviewModal />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'admin',
}
</script>
