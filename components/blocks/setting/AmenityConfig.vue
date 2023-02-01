<template>
  <v-card class="elevated-light">
    <v-card-title class="py-3"
      >Amenity Settings

      <v-spacer></v-spacer>
      <v-expand-x-transition>
        <v-card v-show="show" class="transparent pa-0" elevation="0">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            :readonly="loading"
            :disabled="loading"
            dense
            label="Search"
            filled
            hide-details
            rounded
            type="email"
            single-line
            placeholder="Search"
            clearable
          ></v-text-field>
        </v-card>
      </v-expand-x-transition>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon
          color="secondary"
          :style="{
            transform: `${show ? 'rotate(180deg)' : 'rotate(0deg)'}`,
            transition: 'all 0.2s ease-out',
          }"
          >mdi-chevron-double-up</v-icon
        >
      </v-btn>
    </v-card-title>
    <!-- <v-divider></v-divider> -->
    <v-expand-transition>
      <div v-show="show">
        <v-card-text class="pt-0">
          <v-tabs v-model="tab">
            <v-tab>
              Amenities
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-btn
                    small
                    class="ml-2"
                    icon
                    v-bind="attrs"
                    @click="refresh"
                    v-on="on"
                    ><v-icon small>mdi-refresh</v-icon></v-btn
                  >
                </template>
                <span>Refresh</span>
              </v-tooltip>
            </v-tab>
            <v-tab> {{ amenityData.id ? 'Edit' : 'Add' }} Amenity </v-tab>
            <v-tab>
              Categories

              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-btn
                    small
                    class="ml-2"
                    icon
                    v-bind="attrs"
                    @click="refresh"
                    v-on="on"
                    ><v-icon small>mdi-refresh</v-icon></v-btn
                  >
                </template>
                <span>Refresh</span>
              </v-tooltip>
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab" class="mt-4">
            <v-tab-item>
              <v-data-table
                dense
                :headers="headers"
                class="elevated-light"
                :items="
                  amenities.map((t, i) => {
                    return {
                      ...t,
                      // sno: i + 1,
                      listings: t._count.listings,
                    }
                  })
                "
                :items-per-page="5"
              >
                <template #[`item.mdiIcon`]="{ item }">
                  <v-icon>mdi-{{ item.mdiIcon }}</v-icon>
                </template>
                <template #[`item.descriptionHTML`]="{ item }">
                  <div v-html="item.descriptionHTML"></div>
                </template>
                <!-- <template #[`item.isActive`]="{ item }">
                  <v-chip
                    class="ma-2"
                    :color="item.isActive ? 'success' : 'error'"
                  >
                    {{ item.isActive ? 'Active' : 'Disabled' }}
                  </v-chip>
                </template> -->
                <template #[`item.actions`]="{ item }">
                  <div style="display: flex">
                    <v-tooltip top>
                      <template #activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                          @click="editItem(item)"
                        >
                          <v-icon small> mdi-pencil </v-icon>
                        </v-btn>
                      </template>
                      <span>Edit</span>
                    </v-tooltip>
                    <v-menu content-class="elevated-light rounded-xl" left>
                      <template #activator="{ on: menu, attrs }">
                        <v-tooltip top>
                          <template #activator="{ on: tooltip }">
                            <v-btn
                              icon
                              v-bind="attrs"
                              v-on="{ ...tooltip, ...menu }"
                            >
                              <v-icon small> mdi-eye </v-icon>
                            </v-btn>
                          </template>
                          <span>View Details</span>
                        </v-tooltip>
                      </template>
                      <v-card class="rounded-lg elevated-light px-2" flat>
                        <v-card-title>Confirm delete</v-card-title>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-btn text> Cancel </v-btn>
                          <v-btn color="error" @click="deleteItem(item)">
                            Delete
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-menu>
                    <v-menu content-class="elevated-light rounded-xl" left>
                      <template #activator="{ on: menu, attrs }">
                        <v-tooltip top>
                          <template #activator="{ on: tooltip }">
                            <v-btn
                              icon
                              v-bind="attrs"
                              v-on="{ ...tooltip, ...menu }"
                            >
                              <v-icon small> mdi-delete </v-icon>
                            </v-btn>
                          </template>
                          <span>Delete</span>
                        </v-tooltip>
                      </template>
                      <v-card class="rounded-lg elevated-light px-2" flat>
                        <v-card-title>Confirm delete</v-card-title>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-btn text> Cancel </v-btn>
                          <v-btn color="error" @click="deleteItem(item)">
                            Delete
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-menu>
                  </div>
                </template>
              </v-data-table>
            </v-tab-item>
            <v-tab-item>
              <v-form ref="form">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="amenityData.amenity"
                      prepend-inner-icon="mdi-key"
                      dense
                      :disabled="Boolean(amenityData.id)"
                      label="Amenity key"
                      filled
                      hide-details
                      rounded
                      type="text"
                      single-line
                      placeholder="LISTING_TYPE"
                      @keyup="formatKey(amenityData.amenity)"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="amenityData.title"
                      prepend-inner-icon="mdi-pen"
                      dense
                      label="Title"
                      filled
                      hide-details
                      rounded
                      type="text"
                      single-line
                      placeholder="Amenity Title"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-textarea
                      v-model="amenityData.descriptionHTML"
                      dense
                      auto-grow
                      rows="4"
                      prepend-inner-icon="mdi-note-text"
                      label="Description (HTML)"
                      filled
                      hide-details
                      rounded
                      type="text"
                      single-line
                      placeholder="Amenity Description (HTML allowed)"
                    >
                    </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model="amenityData.mdiIcon"
                      prepend-inner-icon="mdi-information-outline"
                      rounded
                      filled
                      class="mb-2"
                      dense
                      :items="mdiIcons.map((x) => x.name)"
                      placeholder="mdi icon"
                      flat
                      single-line
                      :append-icon="`mdi-${amenityData.mdiIcon}`"
                      prefix="mdi -"
                      hide-details
                      label="mdi Icon"
                    >
                    </v-autocomplete>
                    <v-autocomplete
                      v-model="amenityData.faIcon"
                      prepend-inner-icon="mdi-font-awesome"
                      rounded
                      filled
                      class="mb-2"
                      dense
                      :items="faIcons"
                      placeholder="fa icon"
                      flat
                      single-line
                      :append-icon="`mdi-${amenityData.faIcon}`"
                      prefix="fa -"
                      hide-details
                      label="fa Icon"
                    >
                    </v-autocomplete>
                    <v-select
                      v-model="amenityData.amenityCategory"
                      :items="amenityCategories"
                      item-text="amenityCategory"
                      item-value="amenityCategory"
                      :disabled="Boolean(amenityData.id)"
                      filled
                      single-line
                      hide-details
                      dense
                      rounded
                      label="Amenity Category"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" class="pb-4 pt-0">
                    <div class="d-flex align-center">
                      <v-switch
                        v-if="amenityData.id"
                        v-model="amenityData.useNewKey"
                        hide-details
                        label="Change Key"
                        class="mr-4 mt-0"
                      ></v-switch>
                      <v-text-field
                        v-if="amenityData.id"
                        v-model="amenityData.newkey"
                        dense
                        prepend-inner-icon="mdi-key"
                        label="New Key"
                        :disabled="!amenityData.useNewKey || loading"
                        filled
                        hide-details
                        rounded
                        type="text"
                        single-line
                        placeholder="NEW_AMENITY_KEY"
                      ></v-text-field>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="pb-4 pt-0">
                    <v-row>
                      <v-col cols="6">
                        <v-btn text block @click="cancel">Cancel</v-btn>
                      </v-col>
                      <v-col cols="6">
                        <v-btn v-if="amenityData.id" block @click="updateItem"
                          >Update</v-btn
                        >
                        <v-btn v-else block @click="createItem">Save</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-form>
            </v-tab-item>
            <v-tab-item>
              <AmenityCategoryConfig />
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AmenityCategoryConfig from './AmenityCategoryConfig.vue'
import faIcons from '@/utils/data/fa5Icons.json'
import mdiIcons from '@/utils/data/mdiIconsData.json'
// import { formatAsKey } from '@/utils/validators'

export default {
  components: {
    AmenityCategoryConfig,
  },
  data() {
    return {
      show: true,
      loading: false,
      componentKey: 1,
      mdiIcons,
      faIcons: faIcons.map((x) => x.split(' ')[1]),
      tab: 0,
      search: '',
      headers: [
        // {
        //   text: 'S/N',
        //   align: 'start',
        //   sortable: true,
        //   value: 'sno',
        // },
        { text: 'key', value: 'amenity' },
        { text: 'Title', value: 'title' },
        // { text: 'Description', value: 'descriptionHTML' },
        { text: 'Category', value: 'amenityCategory' },
        { text: 'mdi Icon', value: 'mdiIcon', sortable: false },
        // { text: 'Fa Icon', value: 'faIcon' },
        { text: 'Listings', value: 'listings' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      amenityData: {
        id: '',
        amenity: '',
        title: '',
        descriptionHTML: '',
        amenityCategory: '',
        mdiIcon: '',
        faIcon: '',
        newkey: '',
        useNewKey: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      amenities: 'admin/settings/amenities',
      amenityCategories: 'admin/settings/amenityCategories',
    }),
  },
  async mounted() {
    await this.getAmenityCategories().then(async () => {
      await this.getAmenities()
    })
  },
  methods: {
    ...mapActions({
      getAmenities: 'admin/settings/getAllAmenities',
      getAmenityCategories: 'admin/settings/getAmenityCategories',
      createAmenity: 'admin/settings/createAmenity',
      updateAmenity: 'admin/settings/updateAmenity',
      deleteAmenity: 'admin/settings/deleteAmenity',
    }),
    async createItem() {
      const result = await this.createAmenity(this.amenityData)
      console.log({ result })
      if (result.success) {
        this.cancel()
      }
    },
    editItem(item) {
      this.amenityData = {
        ...this.amenityData,
        ...item,
        id: item.amenity,
      }
      this.tab = 1
    },
    async updateItem() {
      const result = await this.updateAmenity({
        id: this.amenityData.id,
        data: this.amenityData,
      })
      console.log({ result })
      if (result.success) {
        this.cancel()
      }
    },
    async refresh() {
      await this.getAmenityCategories()
      await this.getAmenities()
    },
    async deleteItem(item) {
      const result = await this.deleteAmenity(item)
      console.log({ result })
    },
    cancel() {
      // this.$refs.form.reset()
      this.amenityData = {
        id: '',
        amenity: '',
        title: '',
        descriptionHTML: '',
        mdiIcon: '',
        faIcon: '',
        newkey: '',
        useNewKey: false,
      }
      this.tab = 0
    },
    formatKey(string) {
      this.amenityData.amenity = string.toUpperCase().split(' ').join('_')
    },
  },
}
</script>

<style></style>
