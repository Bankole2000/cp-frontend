<template>
  <div class="user-dashboard-listing-item">
    <v-hover v-slot="{ hover }">
      <v-card
        flat
        class="rounded-lg"
        :class="{ 'elevated-light': hover }"
        style="transition: all 0.2s ease-in-out"
        :style="{
          borderRight: showMoreDetails ? '3px solid var(--warning)' : 'none',
        }"
      >
        <v-layout
          row
          wrap
          class="align-center py-1 pl-2"
          @click.stop="
            !actionsMenu ? (showMoreDetails = !showMoreDetails) : null
          "
        >
          <v-flex xs12 sm4 md3 lg3 xl2>
            <div
              class="d-flex align-center"
              :class="{ 'pt-3 ml-n1 mb-2': $vuetify.breakpoint.smAndDown }"
            >
              <v-avatar
                v-if="listing.images.length"
                tile
                class="rounded-lg mx-4"
                size="50"
              >
                <img
                  :src="`${listing.images[0].imageUrl}?thumb=60x50`"
                  :alt="listing.images[0].title"
                />
              </v-avatar>
              <v-avatar v-else tile class="rounded-lg mx-4" size="50">
                <img
                  src="http://178.62.24.155/api/files/qrC9kQzDgHFTVkZ/bkn30eyrMpiB4BG/wmx5IDJltyyHDmA5gUoU2ZrkhIr85ni0.png"
                />
              </v-avatar>
              <div>
                <div class="caption grey--text text--lighten-1">Title</div>
                <div class="text--lighten-1 text-truncate">
                  {{ listing.title }}
                </div>
              </div>
            </div>
          </v-flex>
          <v-flex xs6 sm4 md3 lg2 xl2 class="pa-2">
            <div class="caption grey--text text--lighten-1">Purpose</div>
            <div class="text--lighten-1 text-truncate">
              {{ listing.listingPurpose }}
            </div>
          </v-flex>
          <v-flex v-if="!$vuetify.breakpoint.lg" xs6 sm4 md3 lg1 xl2>
            <div class="caption grey--text text--lighten-1">Subgroup</div>
            <div v-if="listing.listingPurpose" class="text--lighten-1">
              {{ listing.listingPurposeSubgroup }}
            </div>
            <div v-else>
              <v-chip
                label
                small
                class="error--text"
                style="background-color: var(--error-light)"
                >Not Yet Set</v-chip
              >
            </div>
          </v-flex>
          <v-flex xs6 sm4 md3 lg2 xl2 class="pa-2">
            <div class="caption grey--text text--lighten-1">Location</div>
            <div class="text--lighten-1 text-truncate">
              <!-- { Location State, country } -->
              <v-chip
                label
                small
                :style="{
                  backgroundColor: !$vuetify.theme.dark
                    ? 'var(--error-light)'
                    : 'var(--error-dark)',
                }"
                :class="
                  $vuetify.theme.dark
                    ? 'error--text text--darken-2'
                    : 'error--text text--darken-1'
                "
                >Not Yet Set</v-chip
              >
            </div>
          </v-flex>
          <v-flex
            xs6
            sm4
            md3
            lg1
            xl1
            :class="
              $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.md
                ? 'pa-2'
                : ''
            "
          >
            <div class="caption grey--text text--lighten-1">Status</div>
            <div class="text--lighten-1 text-truncate">
              <!-- { Location State, country } -->
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-icon color="success" dark v-bind="attrs" v-on="on"
                    >mdi-calendar-check</v-icon
                  >
                </template>
                <span>Open for bookings</span>
              </v-tooltip>
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-icon color="info lighten-3" dark v-bind="attrs" v-on="on"
                    >mdi-calendar-account-outline</v-icon
                  >
                </template>
                <span>Currently Occupied</span>
              </v-tooltip>
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-icon
                    color="warning lighten-3"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    >mdi-calendar-clock</v-icon
                  >
                </template>
                <span>Has Upcoming bookings</span>
              </v-tooltip>
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-icon
                    color="secondary lighten-3"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    >mdi-calendar-blank</v-icon
                  >
                </template>
                <span>Currently Vacant</span>
              </v-tooltip>
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-icon color="error lighten-2" dark v-bind="attrs" v-on="on"
                    >mdi-calendar-alert</v-icon
                  >
                </template>
                <span>Has Some Booking error</span>
              </v-tooltip>
            </div>
          </v-flex>
          <v-flex sm4 md2 xs3 lg1 xl1>
            <div
              class="d-flex align-center"
              :class="{
                'justify-center': !$vuetify.breakpoint.smAndDown,
                'justify-start': $vuetify.breakpoint.smAndDown,
              }"
            >
              <v-chip
                v-if="!listing.isPublished"
                :small="$vuetify.breakpoint.xs"
                label
                :style="{
                  backgroundColor: !$vuetify.theme.dark
                    ? 'var(--success-light)'
                    : '',
                }"
                class="ma-2"
                :class="
                  $vuetify.theme.dark
                    ? 'success text--darken-2'
                    : 'success--text text--darken-1'
                "
                >Active</v-chip
              >
              <v-chip
                v-else
                label
                style="background-color: var(--warning-light)"
                :class="`warning--text ma-2 text--darken-2`"
                >Draft</v-chip
              >
            </div>
          </v-flex>
          <v-flex
            xs9
            sm12
            md7
            lg3
            xl2
            :class="{ 'py-2': $vuetify.breakpoint.smAndDown }"
          >
            <div class="d-flex align-center justify-end mr-4">
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="info"
                    depressed
                    small
                    class="mx-1"
                    icon
                    v-bind="attrs"
                    v-on="on"
                    ><v-icon>mdi-finance</v-icon></v-btn
                  >
                </template>
                <span>Promoted</span>
              </v-tooltip>
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-btn
                    small
                    outlined
                    class="mx-1"
                    icon
                    v-bind="attrs"
                    v-on="on"
                    ><v-icon small>mdi-chart-bar</v-icon></v-btn
                  >
                </template>
                <span>View Analytics</span>
              </v-tooltip>
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-btn
                    small
                    outlined
                    class="mx-1"
                    icon
                    v-bind="attrs"
                    v-on="on"
                    ><v-icon small>mdi-pencil</v-icon></v-btn
                  >
                </template>
                <span>Edit</span>
              </v-tooltip>
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-btn
                    small
                    outlined
                    class="mx-1"
                    icon
                    v-bind="attrs"
                    @click.stop="showPreviewModal = true"
                    v-on="on"
                    ><v-icon small>mdi-eye</v-icon></v-btn
                  >
                </template>
                <span>Preview</span>
              </v-tooltip>
              <v-menu
                v-model="actionsMenu"
                :close-on-content-click="false"
                left
                content-class="elevated-light rounded-lg"
              >
                <template #activator="{ on: menu, attrs }">
                  <v-tooltip top>
                    <template #activator="{ on: tooltip }">
                      <v-btn
                        small
                        outlined
                        class="mx-1"
                        icon
                        v-bind="attrs"
                        v-on="{ ...tooltip, ...menu }"
                        ><v-icon small>mdi-dots-vertical</v-icon></v-btn
                      >
                    </template>
                    <span>More Actions</span>
                  </v-tooltip>
                </template>
                <v-card class="elevated-light rounded-lg">
                  <v-card-title class="caption grey--text text-lighten-1 py-2"
                    >More Actions</v-card-title
                  >
                  <v-divider></v-divider>
                  <v-card-text
                    class="py-0"
                    :class="{ 'px-1': $vuetify.breakpoint.xs }"
                  >
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-action>
                          <v-switch disabled></v-switch>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title>Publish Listing</v-list-item-title>
                          <v-list-item-subtitle
                            >Make listing Public</v-list-item-subtitle
                          >
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-tooltip top>
                            <template #activator="{ on, attrs }">
                              <v-icon
                                color="error"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                >mdi-alert-circle</v-icon
                              >
                            </template>
                            <span>This listing has incomplete details</span>
                          </v-tooltip>
                        </v-list-item-action>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-action>
                          <v-switch disabled></v-switch>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title
                            >Open for Bookings</v-list-item-title
                          >
                          <v-list-item-subtitle
                            >Make available for bookings</v-list-item-subtitle
                          >
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-tooltip top>
                            <template #activator="{ on, attrs }">
                              <v-icon
                                color="error"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                >mdi-alert-circle</v-icon
                              >
                            </template>
                            <span>This listing is not published</span>
                          </v-tooltip>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                    <div class="d-flex align-center pb-2">
                      <div style="flex: 1" class="mx-2">
                        <v-btn block depressed>
                          Bookings
                          <v-icon right>mdi-calendar-cursor-outline</v-icon>
                        </v-btn>
                      </div>
                      <div style="flex: 1" class="mx-2">
                        <v-btn block depressed>
                          Invite
                          <v-icon right>mdi-send</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions class="py-0">
                    <v-spacer></v-spacer>
                    <v-btn text @click="actionsMenu = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-btn
                    small
                    outlined
                    class="mx-1"
                    icon
                    color="error"
                    v-bind="attrs"
                    v-on="on"
                    ><v-icon small>mdi-trash-can</v-icon></v-btn
                  >
                </template>
                <span>Delete</span>
              </v-tooltip>
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-btn
                    class="mx-1"
                    icon
                    v-bind="attrs"
                    @click="resolution"
                    v-on="on"
                    ><v-icon>mdi-arrow-right-thin</v-icon></v-btn
                  >
                </template>
                <span>View Listing Page</span>
              </v-tooltip>
            </div>
          </v-flex>
        </v-layout>
        <v-expand-transition>
          <div
            v-show="showMoreDetails"
            class="pt-3"
            @click.stop="
              !actionsMenu ? (showMoreDetails = !showMoreDetails) : null
            "
          >
            <v-divider></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12" class="pb-0">
                  <h2 class="font-weight-light">More listing details here</h2>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-expand-transition>
        <v-progress-linear
          value="15"
          class="mt-3"
          :height="showMoreDetails ? 25 : 4"
        >
          <template v-if="showMoreDetails" #default="{ value }">
            <strong>{{ Math.ceil(value) }}% Complete</strong>
          </template>
        </v-progress-linear>
      </v-card>
    </v-hover>
    <ListingItemPreview
      :images="listing.images"
      :listing-id="listing.listingId"
      :listing="listing"
      :dialog="showPreviewModal"
      @close="showPreviewModal = false"
    />
  </div>
</template>

<script>
import ListingItemPreview from './DashboardListingItemPreviewModal.vue'
export default {
  components: {
    ListingItemPreview,
  },
  props: {
    listing: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      actionsMenu: false,
      showMoreDetails: false,
      showPreviewModal: false,
    }
  },
  methods: {
    resolution() {
      console.log({ breakpoint: this.$vuetify.breakpoint })
    },
  },
}
</script>

<style></style>
