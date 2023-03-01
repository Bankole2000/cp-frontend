<template>
  <div class="create-listing">
    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="listingData.title"
          label="Title"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="listingData.caption"
          label="Caption"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-select
          v-model="listingData.listingType"
          :items="settings.listingTypes"
          label="Space"
          item-text="title"
          item-value="listingType"
          outlined
        >
          <template #item="{ item }">
            <v-list-item-avatar>
              <v-icon>mdi-{{ item.mdiIcon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <!-- {{ item.descriptionHTML }} -->
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <div v-html="item.descriptionHTML"></div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" sm="4">
        <v-select
          v-model="listingData.listingPurpose"
          :items="settings.listingPurposes"
          label="Purpose"
          item-text="title"
          item-value="listingPurpose"
          outlined
          @change="listingData.listingPurposeSubgroup = ''"
        >
          <template #item="{ item }">
            <v-list-item-avatar>
              <v-icon>mdi-{{ item.mdiIcon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <!-- {{ item.descriptionHTML }} -->
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <div v-html="item.descriptionHTML"></div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" sm="4">
        <v-select
          v-model="listingData.listingPurposeSubgroup"
          :items="purposeSubgroups"
          label="Listing Type"
          item-text="title"
          item-value="purposeSubgroup"
          outlined
        >
          <template #item="{ item }">
            <v-list-item-avatar>
              <v-icon>mdi-{{ item.mdiIcon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <!-- {{ item.descriptionHTML }} -->
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <div v-html="item.descriptionHTML"></div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" sm="4" offset-sm="8" class="py-0">
        <div class="d-flex">
          <v-spacer></v-spacer>
          <v-btn @click="submitData" block>Save</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      listingData: {
        title: '',
        caption: '',
        listingType: '',
        listingPurpose: '',
        listingPurposeSubgroup: '',
      },
      settings: {},
    }
  },
  computed: {
    ...mapGetters({
      listingPath: 'listingPath',
    }),
    purposeSubgroups() {
      if (!this.settings.listingPurposes) {
        return []
      }
      if (this.listingData.listingPurpose && this.settings.subgroups) {
        return this.settings.subgroups.filter(
          (x) => x.listingPurpose === this.listingData.listingPurpose
        )
      }
      if (!this.settings.subgroups) {
        return []
      }
      return []
    },
  },
  async mounted() {
    await this.getListingSettings()
  },
  methods: {
    ...mapActions({
      createListing: 'user/listings/createListing',
    }),
    async getListingSettings() {
      try {
        const { data } = await this.$axios.$get(`${this.listingPath}/settings/`)
        console.log({ data })
        this.settings = data
      } catch (error) {
        console.log({ error })
      }
    },
    async submitData() {
      try {
        const result = await this.createListing(this.listingData)
        console.log({ result })
      } catch (error) {
        console.log({ error })
      }
    },
  },
}
</script>

<style></style>
