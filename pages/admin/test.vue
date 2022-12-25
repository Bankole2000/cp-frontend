<template>
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
                <v-card-title class="py-1">
                  <span class="caption text--disabled">Navigation</span>
                </v-card-title>
                <v-divider inset></v-divider>
                <v-card-text>
                  <HoverButton
                    text="Community"
                    :block="true"
                    :rounded="true"
                    class="mb-2"
                    size="lg"
                  />
                  <HoverButton
                    text="Listings"
                    :block="true"
                    :rounded="true"
                    class="mb-2"
                    size="lg"
                  />
                  <HoverButton
                    text="Personal Ads"
                    :block="true"
                    :rounded="true"
                    class="mb-2"
                    size="lg"
                  />
                  <HoverButton
                    text="Services"
                    :block="true"
                    :rounded="true"
                    class="mb-2"
                    size="lg"
                  />
                  <v-switch v-model="$vuetify.theme.dark"></v-switch>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="primary" rounded @click="testMessage"
                    >Click me</v-btn
                  >
                </v-card-actions>
              </v-card>
            </div>
          </v-card>
        </v-col>
        <v-col cols="5">
          <PostCardItem v-for="i in 5" :key="`${i}-b`" class="mb-4" />
          <OfferCardItem v-for="i in 5" :key="`${i}-a`" class="mb-4" />
          <ListingCardItem v-for="i in 5" :key="i" class="mb-4" />
        </v-col>
        <v-col cols="4">
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
            <v-card class="elevated-light rounded-xl mb-4 pa-0">
              <v-card-title class="px-4 pt-3 pb-1"
                >Suggested Profiles</v-card-title
              >
              <v-card-text class="pa-0">
                <v-list two-line>
                  <v-list-item-group>
                    <div v-for="(profile, i) in suggestedProfiles" :key="i">
                      <v-list-item dense>
                        <v-list-item-avatar
                          size="40"
                          class="mr-2"
                          :class="{ 'mt-0': i === 0 }"
                        >
                          <v-img :src="profile.avatar"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            <div class="d-flex align-center">
                              <span
                                class="body-2 text-truncate"
                                style="max-width: 160px"
                              >
                                {{ profile.displayName }}
                              </span>
                              <v-icon small color="primary"
                                >mdi-checkbox-marked-circle</v-icon
                              >
                            </div>
                          </v-list-item-title>
                          <v-list-item-subtitle class="font-weight-light">
                            <div class="d-flex align-center">
                              <span
                                class="d-inline-block text-truncate"
                                style="max-width: 100px"
                              >
                                @{{ profile.username }}
                              </span>
                              <v-chip
                                label
                                x-small
                                class="bg-secondary-lt px-1 ml-2"
                              >
                                <span class="text--secondary">Follows you</span>
                              </v-chip>
                            </div>
                          </v-list-item-subtitle>
                          <v-list-item-subtitle v-if="i === 0">
                            <div class="d-flex align-center mt-0">
                              <v-icon x-small class="mr-1">mdi-finance</v-icon>
                              <span class="text--disabled caption"
                                >Promoted</span
                              >
                            </div>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action :class="{ 'mt-n1': i === 0 }">
                          <v-btn
                            class="text-capitalize rounded-xl"
                            depressed
                            :class="
                              $vuetify.theme.dark
                                ? 'white black--text'
                                : 'secondary'
                            "
                          >
                            follow
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </div>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
              <v-card-actions class="px-4">
                <a href="" class="caption">Show more</a>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import OfferCardItem from '~/components/blocks/OfferCardItem.vue'
import ListingCardItem from '~/components/blocks/ListingCardItem.vue'
import { genericMessage } from '@/utils/messaging.js'
export default {
  components: {
    OfferCardItem,
    ListingCardItem,
  },
  layout: 'admin',
  data() {
    return {
      suggestedProfiles: [
        {
          displayName: 'Jane Doe',
          username: 'janedoe',
          avatar: 'https://randomuser.me/api/portraits/women/80.jpg',
        },
        {
          displayName: 'Dude with a really long username that doesnt quite fit',
          username: 'johndoe',
          avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
        },
        {
          displayName: 'John Doe',
          username: 'personwithareallylongusername',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        },
      ],
    }
  },
  methods: {
    ...mapActions({
      showToast: 'ui/showMessage',
      updateToast: 'ui/updateMessage',
    }),
    async testMessage() {
      const message = genericMessage({
        type: 'success',
        color: 'success',
        icon: 'mdi-heart',
      })
      await this.showToast(message)
      console.log({ breakpoint: this.$vuetify.breakpoint })
    },
  },
}
</script>

<style>
</style>