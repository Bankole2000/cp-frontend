<template>
  <div>
    <div>
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-card
              flat
              class="transparent"
              style="
                position: sticky;
                left: 20px;
                right: 60px;
                bottom: 5px;
                top: 80px;
              "
            >
              <div style="width: 100%">
                <v-card
                  class="elevated-light rounded-xl"
                  style="position: sticky; width: 100%"
                >
                  <!-- <v-card-title class="py-1">
                    <span class="caption text--disabled">Navigation</span>
                  </v-card-title>
                  <v-divider inset></v-divider> -->
                  <v-card-text class="py-1 py-3">
                    <nuxt-link to="/">
                      <HoverButton
                        text="Community"
                        :block="true"
                        :rounded="true"
                        class="mb-2"
                        :class="{
                          'elevated-light bg-gradient-right-primary-accent white--text':
                            $route.name === 'index',
                        }"
                        size="lg"
                      />
                    </nuxt-link>
                    <nuxt-link to="/listings">
                      <HoverButton
                        text="Listings"
                        :block="true"
                        :rounded="true"
                        class="mb-2"
                        :class="{
                          'elevated-light bg-gradient-right-primary-accent white--text':
                            $route.name.includes('listing'),
                        }"
                        size="lg"
                      />
                    </nuxt-link>
                    <nuxt-link to="/people">
                      <HoverButton
                        text="Personal Ads"
                        :block="true"
                        :rounded="true"
                        class="mb-2"
                        :class="{
                          'elevated-light bg-gradient-right-primary-accent white--text':
                            $route.name.includes('people'),
                        }"
                        size="lg"
                      />
                    </nuxt-link>
                    <nuxt-link to="/services">
                      <HoverButton
                        text="Services"
                        :block="true"
                        :rounded="true"
                        class="mb-2"
                        :class="{
                          'elevated-light bg-gradient-right-primary-accent white--text':
                            $route.name.includes('services'),
                        }"
                        size="lg"
                      />
                    </nuxt-link>
                    <v-switch v-model="$vuetify.theme.dark"></v-switch>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <!-- @click="testMessage" -->
                    <v-btn class="primary" rounded>Click me</v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-card>
          </v-col>
          <v-col cols="9">
            <nuxt-child />
            <!-- <v-container>
              <v-row>
                <v-col cols="7">
                  <PostCardItem v-for="i in 5" :key="`${i}-b`" class="mb-4" />
                  <OfferCardItem v-for="i in 5" :key="`${i}-a`" class="mb-4" />
                  <ListingCardItem v-for="i in 5" :key="i" class="mb-4" />
                </v-col>
                <v-col cols="5">
                  <div
                    style="
                      position: sticky;
                      left: 20px;
                      right: 60px;
                      bottom: 5px;
                      top: 80px;
                    "
                  >
                    <v-card class="elevated-light rounded-xl mb-4">
                      <v-card-title>
                        <div class="d-flex align-center">
                          <CountrySelectButton />
                          <v-textarea
                            placeholder="Search By City or State"
                            rows="1"
                            prepend-inner-icon="mdi-magnify"
                            auto-grow
                            hide-details
                            filled
                            dense
                            rounded
                            single-line
                          ></v-textarea>
                        </div>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>Card Text</v-card-text>
                    </v-card>
                    <v-card class="elevated-light rounded-xl mb-4">
                      <v-card-title>Trending</v-card-title>
                    </v-card>
                    <SuggestedProfilesCard />
                  </div>
                </v-col>
              </v-row>
            </v-container> -->
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'admin',
  scrollToTop: true,
  // middleware: 'checkAuth',
  data: () => ({}),
  mounted() {
    console.log({ routes: this.$router })
  },
}
</script>
