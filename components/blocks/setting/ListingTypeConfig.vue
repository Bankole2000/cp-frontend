<template>
  <v-card class="elevated-light">
    <v-card-title class="py-3"
      >Listing Type Settings

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
              Listing Types
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
            <v-tab>
              {{ listingTypeData.id ? 'Edit' : 'Add' }} Listing Type
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab" class="mt-4">
            <v-tab-item>
              <v-data-table
                dense
                :headers="headers"
                class="elevated-light"
                :items="
                  listingTypes.map((t, i) => {
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
                <template #[`item.isActive`]="{ item }">
                  <v-chip
                    class="ma-2"
                    :color="item.isActive ? 'success' : 'error'"
                  >
                    {{ item.isActive ? 'Active' : 'Disabled' }}
                  </v-chip>
                </template>
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
                      v-model="listingTypeData.listingType"
                      prepend-inner-icon="mdi-key"
                      dense
                      :disabled="Boolean(listingTypeData.id)"
                      label="Listing Type key"
                      filled
                      hide-details
                      rounded
                      type="text"
                      single-line
                      placeholder="LISTING_TYPE"
                      @keyup="formatKey(listingTypeData.listingType)"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="listingTypeData.title"
                      prepend-inner-icon="mdi-pen"
                      dense
                      label="Title"
                      filled
                      hide-details
                      rounded
                      type="text"
                      single-line
                      placeholder="Listing Type Title"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-textarea
                      v-model="listingTypeData.descriptionHTML"
                      dense
                      auto-grow
                      rows="3"
                      prepend-inner-icon="mdi-note-text"
                      label="Description (HTML)"
                      filled
                      hide-details
                      rounded
                      type="text"
                      single-line
                      placeholder="Listing Type Description (HTML allowed)"
                    >
                    </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model="listingTypeData.mdiIcon"
                      prepend-inner-icon="mdi-information-outline"
                      rounded
                      filled
                      class="mb-2"
                      dense
                      :items="mdiIcons.map((x) => x.name)"
                      placeholder="mdi icon"
                      flat
                      single-line
                      :append-icon="`mdi-${listingTypeData.mdiIcon}`"
                      prefix="mdi -"
                      hide-details
                      label="mdi Icon"
                    >
                    </v-autocomplete>
                    <v-autocomplete
                      v-model="listingTypeData.faIcon"
                      prepend-inner-icon="mdi-font-awesome"
                      rounded
                      filled
                      class="mb-2"
                      dense
                      :items="faIcons"
                      placeholder="fa icon"
                      flat
                      single-line
                      :append-icon="`mdi-${listingTypeData.faIcon}`"
                      prefix="fa -"
                      hide-details
                      label="fa Icon"
                    >
                    </v-autocomplete>
                    <div class="d-flex align-center">
                      <v-switch
                        v-model="listingTypeData.isActive"
                        hide-details
                        label="Active"
                        class="mr-2 mt-0"
                      ></v-switch>
                      <v-switch
                        v-if="listingTypeData.id"
                        v-model="listingTypeData.useNewKey"
                        hide-details
                        label="Change Key"
                        class="mr-4 mt-0"
                      ></v-switch>
                      <v-text-field
                        v-if="listingTypeData.id"
                        v-model="listingTypeData.newkey"
                        dense
                        prepend-inner-icon="mdi-key"
                        label="New Key"
                        :disabled="!listingTypeData.useNewKey || loading"
                        filled
                        hide-details
                        rounded
                        type="text"
                        single-line
                        placeholder="NEW_LISTING_KEY"
                      ></v-text-field>
                    </div>
                  </v-col>
                  <v-col cols="12" offset-sm="6" sm="6" class="py-4">
                    <v-row>
                      <v-col cols="6">
                        <v-btn text block @click="cancel">Cancel</v-btn>
                      </v-col>
                      <v-col cols="6">
                        <v-btn
                          v-if="listingTypeData.id"
                          block
                          @click="updateItem"
                          >Update</v-btn
                        >
                        <v-btn v-else block @click="createItem">Save</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-form>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import faIcons from '@/utils/data/fa5Icons.json'
import mdiIcons from '@/utils/data/mdiIconsData.json'
// import { formatAsKey } from '@/utils/validators'

export default {
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
        { text: 'Type Key', value: 'listingType' },
        { text: 'Title', value: 'title' },
        // { text: 'Description', value: 'descriptionHTML' },
        { text: 'Status', value: 'isActive', align: 'center' },
        { text: 'mdi Icon', value: 'mdiIcon', sortable: false },
        // { text: 'Fa Icon', value: 'faIcon' },
        { text: 'Listings', value: 'listings' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      listingTypeData: {
        id: '',
        listingType: '',
        title: '',
        descriptionHTML: '',
        isActive: false,
        mdiIcon: '',
        faIcon: '',
        newkey: '',
        useNewKey: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      listingTypes: 'admin/settings/listingTypes',
    }),
  },
  async mounted() {
    await this.getListingTypes()
  },
  methods: {
    ...mapActions({
      getListingTypes: 'admin/settings/getListingTypes',
      createListingType: 'admin/settings/createListingType',
      updateListingType: 'admin/settings/updateListingType',
      deleteListingType: 'admin/settings/deleteListingType',
    }),
    async refresh() {
      await this.getListingTypes()
    },
    async createItem() {
      const result = await this.createListingType(this.listingTypeData)
      console.log({ result })
      if (result.success) {
        this.cancel()
      }
    },
    editItem(item) {
      this.listingTypeData = {
        ...this.listingTypeData,
        ...item,
        id: item.listingType,
      }
      this.tab = 1
    },
    async updateItem() {
      const result = await this.updateListingType({
        id: this.listingTypeData.id,
        data: this.listingTypeData,
      })
      console.log({ result })
      if (result.success) {
        this.cancel()
      }
    },
    async deleteItem(item) {
      const result = await this.deleteListingType(item.listingType)
      console.log({ result })
    },
    cancel() {
      this.$refs.form.reset()
      this.listingTypeData = {
        id: '',
        listingType: '',
        title: '',
        descriptionHTML: '',
        isActive: false,
        mdiIcon: '',
        faIcon: '',
        newkey: '',
        useNewKey: false,
      }
      this.tab = 0
    },
    formatKey(string) {
      this.listingTypeData.listingType = string
        .toUpperCase()
        .split(' ')
        .join('_')
    },
  },
}
</script>

<style></style>
