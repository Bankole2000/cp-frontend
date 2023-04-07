<template>
  <div class="country-select-modal">
    <v-dialog
      :value="dialog"
      :content-class="
        !$vuetify.breakpoint.smAndDown ? 'rounded-xl elevated-light' : ''
      "
      persistent
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :width="$vuetify.breakpoint.smAndDown ? '100vw' : '400px'"
      scrollable
    >
      <v-card
        class="pa-0 elevated-light"
        :tile="$vuetify.breakpoint.smAndDown"
        :class="{ 'rounded-xl': !$vuetify.breakpoint.smAndDown }"
        :width="$vuetify.breakpoint.smAndDown ? '100vw' : '400px'"
        :height="$vuetify.breakpoint.smAndDown ? '100vh' : '450px'"
      >
        <v-card-title class="pa-0">
          <div
            class="pa-4 white--text bg-gradient-right-primary-accent"
            style="width: 100%"
          >
            <div class="d-flex align-center">
              Select Phone Country Code
              <v-spacer></v-spacer>
              <v-icon color="white" @click="$emit('close')">mdi-close</v-icon>
            </div>
          </div>
          <div class="px-4 py-2" style="width: 100%">
            <v-text-field
              v-model.trim="searchTerm"
              filled
              rounded
              single-line
              dense
              hide-details
              placeholder="Search"
              prepend-inner-icon="mdi-magnify"
              label="Search"
              type="text"
              clearable
              :readonly="loading"
              :disabled="loading"
            ></v-text-field>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="px-0">
          <v-list v-if="filteredCountries.length">
            <!-- mandatory -->
            <!-- <v-list-item-group
              :value="sCode"
              color="primary"
              @change="onCountrySelect"
            > -->
            <v-slide-y-transition
              v-if="filteredCountries.length"
              class="py-0"
              group
              tag="div"
            >
              <div
                v-for="country in filteredCountries"
                :key="country.countryCode"
              >
                <v-hover v-slot="{ hover }">
                  <v-card
                    tile
                    class="my-1"
                    style="cursor: pointer; transition: all 0.3s ease-in-out"
                    :class="{
                      'bg-gradient-right-info-primary white--text elevated-light':
                        country.countryCode === sCode,
                      'elevated-light': hover,
                      'elevation-0 transparent': !hover,
                    }"
                    @click="onCountrySelect(country.countryCode)"
                  >
                    <v-list-item>
                      <v-list-item-avatar>
                        <div
                          :style="{
                            backgroundImage: `url(${country.largeFlag})`,
                          }"
                          style="
                            width: 50px;
                            height: 50px;
                            background-position: 50% 40%;
                            border-radius: 50%;
                          "
                        ></div>
                      </v-list-item-avatar>
                      <v-list-item-content
                        :class="{
                          'white--text': country.countryCode === sCode,
                        }"
                      >
                        <v-list-item-title>{{
                          country.name
                        }}</v-list-item-title>
                        <v-list-item-subtitle
                          :class="{
                            'white--text': country.countryCode === sCode,
                          }"
                          >({{ country.countryCode }})
                          {{ country.phoneCode }}</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-hover>
              </div>
            </v-slide-y-transition>
            <!-- </v-list-item-group> -->
          </v-list>
          <v-alert
            text
            tile
            :value="!filteredCountries.length"
            prominent
            color="info"
            icon="mdi-file-find"
          >
            No countries found - Try a different search term
          </v-alert>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="d-flex flex-column px-2 pb-2">
          <div style="width: 100%">
            <v-slide-y-transition leave-absolute>
              <v-alert
                v-if="selectedCountry"
                :key="sCode"
                class="rounded-xl mb-0 py-1"
                color="primary"
                :value="Boolean(selectedCountry)"
                text
              >
                <div class="d-flex align-center" style="width: 100%">
                  <div
                    v-if="selectedCountry"
                    class="mr-2"
                    :style="{
                      backgroundImage: `url(${selectedCountry.smallFlag})`,
                    }"
                    style="
                      width: 30px;
                      height: 30px;
                      background-position: 50% 50%;
                      background-size: 150%;
                      border-radius: 50%;
                    "
                  ></div>
                  <div class="text-truncate">
                    <p class="caption text--secondary mb-0">Selected Country</p>
                    <p class="mb-0">
                      {{ selectedCountry.name }} ({{
                        selectedCountry.countryCode
                      }}
                      - {{ selectedCountry.phoneCode }})
                    </p>
                  </div>
                  <v-spacer></v-spacer>
                </div>
              </v-alert>
            </v-slide-y-transition>
            <v-slide-y-transition leave-absolute hide-on-leave>
              <v-alert
                color="red accent-2"
                type="error"
                class="mb-0 rounded-xl"
                :value="!selectedCountry"
                transition="scroll-y-transition"
                text
              >
                No Country Selected
              </v-alert>
            </v-slide-y-transition>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CountrySelectModal',
  props: {
    countryCode: {
      type: String,
      default: null,
    },
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      searchTerm: '',
      sCode: null,
      selectedCountry: null,
    }
  },
  computed: {
    ...mapGetters({
      countries: 'settings/allCountryCodes',
    }),
    filteredCountries() {
      if (!this.searchTerm) {
        return this.countries
      }
      return this.countries.filter((country) => {
        return (
          country.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          country.phoneCode
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          country.countryCode
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          country.iso3.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      })
    },
  },
  watch: {
    dialog: function (v) {
      if (v) {
        this.searchTerm = ''
        this.sCode = this.countryCode
        this.selectedCountry = this.countries.find(
          (c) => c.countryCode === this.countryCode
        )
      }
    },
  },
  mounted() {
    if (this.countries.length > 0) {
      this.setPreselectedCountry()
      return
    }
    this.loading = true
    this.getAllCountryCodes().then(() => {
      this.setPreselectedCountry()
      this.loading = false
    })
  },

  methods: {
    ...mapActions({
      getAllCountryCodes: 'settings/getAllCountryCodes',
    }),
    setPreselectedCountry() {
      if (!this.countryCode) {
        return
      }
      this.sCode = this.countryCode
      this.selectedCountry = this.countries.find(
        (c) => c.countryCode === this.countryCode
      )
    },
    onCountrySelect(e) {
      this.selectedCountry = this.countries.find((c) => c.countryCode === e)
      this.sCode = e

      this.$store.commit('settings/setVisitorData', this.selectedCountry)
      this.$emit('selectedCountry', this.selectedCountry)
    },
  },
}
</script>

<style></style>
