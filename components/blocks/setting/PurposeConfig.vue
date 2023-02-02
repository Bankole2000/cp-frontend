<template>
  <v-card class="elevated-light">
    <v-card-title class="py-3"
      >Listing Purpose Settings

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
              Listing Purposes
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
              {{ purposeData.id ? 'Edit' : 'Add' }} Listing Purpose
            </v-tab>
            <v-tab>
              Subgroups
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
            <v-tab> {{ purposeData.id ? 'Edit' : 'Add' }} Subgroup </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab" class="mt-4">
            <v-tab-item>
              <v-data-table
                dense
                :headers="headers"
                class="elevated-light"
                :items="
                  listingPurposes.map((t, i) => {
                    return {
                      ...t,
                      // sno: i + 1,
                      purposeSubgroups: t._count.purposeSubgroups,
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
                          @click="editPurpose(item)"
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
                          <v-btn color="error" @click="deletePurpose(item)">
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
                          <v-btn color="error" @click="deletePurpose(item)">
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
                      v-model="purposeData.listingPurpose"
                      prepend-inner-icon="mdi-key"
                      dense
                      :disabled="Boolean(purposeData.id)"
                      label="Purpose key"
                      filled
                      hide-details
                      rounded
                      type="text"
                      single-line
                      placeholder="PURPOSE_KEY"
                      @keyup="formatKey(purposeData.listingPurpose)"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="purposeData.title"
                      prepend-inner-icon="mdi-pen"
                      dense
                      label="Title"
                      filled
                      hide-details
                      rounded
                      type="text"
                      single-line
                      placeholder="Listing Purpose Title"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-textarea
                      v-model="purposeData.descriptionHTML"
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
                      placeholder="Listing Purpose Description (HTML allowed)"
                    >
                    </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model="purposeData.mdiIcon"
                      prepend-inner-icon="mdi-information-outline"
                      rounded
                      filled
                      class="mb-2"
                      dense
                      :items="mdiIcons.map((x) => x.name)"
                      placeholder="mdi icon"
                      flat
                      single-line
                      :append-icon="`mdi-${purposeData.mdiIcon}`"
                      prefix="mdi -"
                      hide-details
                      label="mdi Icon"
                    >
                    </v-autocomplete>
                    <v-autocomplete
                      v-model="purposeData.faIcon"
                      prepend-inner-icon="mdi-font-awesome"
                      rounded
                      filled
                      class="mb-2"
                      dense
                      :items="faIcons"
                      placeholder="fa icon"
                      flat
                      single-line
                      :append-icon="`mdi-${purposeData.faIcon}`"
                      prefix="fa -"
                      hide-details
                      label="fa Icon"
                    >
                    </v-autocomplete>
                    <div class="d-flex align-center">
                      <v-switch
                        v-model="purposeData.isActive"
                        hide-details
                        label="Active"
                        class="mr-2 mt-0"
                      ></v-switch>
                      <v-switch
                        v-if="purposeData.id"
                        v-model="purposeData.useNewKey"
                        hide-details
                        label="Change Key"
                        class="mr-4 mt-0"
                      ></v-switch>
                      <v-text-field
                        v-if="purposeData.id"
                        v-model="purposeData.newkey"
                        dense
                        prepend-inner-icon="mdi-key"
                        label="New Key"
                        :disabled="!purposeData.useNewKey || loading"
                        filled
                        hide-details
                        rounded
                        type="text"
                        single-line
                        placeholder="NEW_PURPOSE_KEY"
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
                          v-if="purposeData.id"
                          block
                          @click="updatePurpose"
                          >Update</v-btn
                        >
                        <v-btn v-else block @click="createPurpose">Save</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-form>
            </v-tab-item>
            <v-tab-item>
              <v-data-table
                dense
                :headers="subgroupHeaders"
                class="elevated-light"
                :items="
                  purposeSubgroups.map((t, i) => {
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
                          @click="editSubgroup(item)"
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
                          <v-btn color="error" @click="deleteSubgroup(item)">
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
                          <v-btn color="error" @click="deleteSubgroup(item)">
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
                      v-model="subgroupData.purposeSubgroup"
                      prepend-inner-icon="mdi-key"
                      dense
                      :disabled="Boolean(subgroupData.id)"
                      label="Subgroup key"
                      filled
                      hide-details
                      rounded
                      type="text"
                      single-line
                      placeholder="SUBGROUP_TYPE"
                      @keyup="formatSubgroupKey(subgroupData.purposeSubgroup)"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="subgroupData.title"
                      prepend-inner-icon="mdi-pen"
                      dense
                      label="Title"
                      filled
                      hide-details
                      rounded
                      type="text"
                      single-line
                      placeholder="Subgroup Title"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-textarea
                      v-model="subgroupData.descriptionHTML"
                      dense
                      auto-grow
                      class="mb-2"
                      rows="3"
                      prepend-inner-icon="mdi-note-text"
                      label="Description (HTML)"
                      filled
                      hide-details
                      rounded
                      type="text"
                      single-line
                      placeholder="Subgroup Description (HTML allowed)"
                    >
                    </v-textarea>
                    <v-select
                      v-model="subgroupData.listingPurpose"
                      :items="listingPurposes"
                      item-text="listingPurpose"
                      item-value="listingPurpose"
                      :disabled="Boolean(subgroupData.id)"
                      filled
                      single-line
                      hide-details
                      dense
                      rounded
                      label="Listing Purpose"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model="subgroupData.mdiIcon"
                      prepend-inner-icon="mdi-information-outline"
                      rounded
                      filled
                      class="mb-2"
                      dense
                      :items="mdiIcons.map((x) => x.name)"
                      placeholder="mdi icon"
                      flat
                      single-line
                      :append-icon="`mdi-${subgroupData.mdiIcon}`"
                      prefix="mdi -"
                      hide-details
                      label="mdi Icon"
                    >
                    </v-autocomplete>
                    <v-autocomplete
                      v-model="subgroupData.faIcon"
                      prepend-inner-icon="mdi-font-awesome"
                      rounded
                      filled
                      class="mb-2"
                      dense
                      :items="faIcons"
                      placeholder="fa icon"
                      flat
                      single-line
                      :append-icon="`mdi-${subgroupData.faIcon}`"
                      prefix="fa -"
                      hide-details
                      label="fa Icon"
                    >
                    </v-autocomplete>
                    <div class="d-flex align-center">
                      <v-switch
                        v-model="subgroupData.isActive"
                        hide-details
                        label="Active"
                        class="mr-2 mt-0"
                      ></v-switch>
                      <v-switch
                        v-if="subgroupData.id"
                        v-model="subgroupData.useNewKey"
                        hide-details
                        label="Change Key"
                        class="mr-4 mt-0"
                      ></v-switch>
                      <v-text-field
                        v-if="subgroupData.id"
                        v-model="subgroupData.newkey"
                        dense
                        prepend-inner-icon="mdi-key"
                        label="New Key"
                        :disabled="!subgroupData.useNewKey || loading"
                        filled
                        hide-details
                        rounded
                        type="text"
                        single-line
                        placeholder="NEW_SUBGROUP_KEY"
                      ></v-text-field>
                    </div>
                  </v-col>
                  <v-col cols="12" offset-sm="6" sm="6" class="py-4">
                    <v-row>
                      <v-col cols="6">
                        <v-btn text block @click="cancelSubgroupEdit"
                          >Cancel</v-btn
                        >
                      </v-col>
                      <v-col cols="6">
                        <v-btn
                          v-if="subgroupData.id"
                          block
                          @click="updateSubgroup"
                          >Update</v-btn
                        >
                        <v-btn v-else block @click="createSubgroup">Save</v-btn>
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
        { text: 'Purpose Key', value: 'listingPurpose' },
        { text: 'Title', value: 'title' },
        // { text: 'Description', value: 'descriptionHTML' },
        { text: 'Status', value: 'isActive', align: 'center' },
        { text: 'mdi Icon', value: 'mdiIcon', sortable: false },
        // { text: 'Fa Icon', value: 'faIcon' },
        { text: 'Subgroups', value: 'purposeSubgroups' },
        { text: 'Listings', value: 'listings' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      subgroupHeaders: [
        // {
        //   text: 'S/N',
        //   align: 'start',
        //   sortable: true,
        //   value: 'sno',
        // },
        { text: 'Subgroup Key', value: 'purposeSubgroup' },
        { text: 'Title', value: 'title' },
        { text: 'Purpose', value: 'listingPurpose' },
        // { text: 'Description', value: 'descriptionHTML' },
        { text: 'Status', value: 'isActive', align: 'center' },
        { text: 'mdi Icon', value: 'mdiIcon', sortable: false },
        // { text: 'Fa Icon', value: 'faIcon' },
        { text: 'Listings', value: 'listings' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      purposeData: {
        id: '',
        listingPurpose: '',
        title: '',
        descriptionHTML: '',
        isActive: false,
        mdiIcon: '',
        faIcon: '',
        newkey: '',
        useNewKey: false,
      },
      subgroupData: {
        id: '',
        purposeSubgroup: '',
        listingPurpose: '',
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
      listingPurposes: 'admin/settings/listingPurposes',
      purposeSubgroups: 'admin/settings/purposeSubgroups',
    }),
  },
  async mounted() {
    await this.getListingPurposes()
    await this.getPurposeSubgroups()
  },
  methods: {
    ...mapActions({
      getListingPurposes: 'admin/settings/getListingPurposes',
      createListingPurpose: 'admin/settings/createListingPurpose',
      updateListingPurpose: 'admin/settings/updateListingPurpose',
      deleteListingPurpose: 'admin/settings/deleteListingPurpose',
      getPurposeSubgroups: 'admin/settings/getPurposeSubgroups',
      createPurposeSubgroup: 'admin/settings/createPurposeSubgroup',
      updatePurposeSubgroup: 'admin/settings/updatePurposeSubgroup',
      deletePurposeSubgroup: 'admin/settings/deletePurposeSubgroup',
    }),
    async refresh() {
      await this.getListingPurposes()
      await this.getPurposeSubgroups()
    },
    async createPurpose() {
      const result = await this.createListingPurpose(this.purposeData)
      console.log({ result })
      if (result.success) {
        this.cancel()
      }
    },
    editPurpose(item) {
      this.purposeData = {
        ...this.purposeData,
        ...item,
        id: item.listingPurpose,
      }
      this.tab = 1
    },
    async updatePurpose() {
      const result = await this.updateListingPurpose({
        id: this.purposeData.id,
        data: this.purposeData,
      })
      console.log({ result })
      if (result.success) {
        this.cancel()
      }
    },
    async deletePurpose(item) {
      const result = await this.deleteListingPurpose(item.listingPurpose)
      console.log({ result })
    },
    cancel() {
      // this.$refs.form.reset()
      this.purposeData = {
        id: '',
        listingPurpose: '',
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
    async createSubgroup() {
      const result = await this.createPurposeSubgroup(this.subgroupData)
      console.log({ result })
      if (result.success) {
        this.cancelSubgroupEdit()
      }
    },
    editSubgroup(item) {
      this.subgroupData = {
        ...this.subgroupData,
        ...item,
        id: item.purposeSubgroup,
      }
      this.tab = 3
    },
    async updateSubgroup() {
      const result = await this.updatePurposeSubgroup({
        id: this.subgroupData.id,
        data: this.subgroupData,
      })
      console.log({ result })
      if (result.success) {
        this.cancelSubgroupEdit()
      }
    },
    async deleteSubgroup(item) {
      const result = await this.deletePurposeSubgroup(item)
      console.log({ result })
    },
    cancelSubgroupEdit() {
      // this.$refs.form.reset()
      this.subgroupData = {
        id: '',
        purposeSubgroup: '',
        listingPurpose: '',
        title: '',
        descriptionHTML: '',
        isActive: false,
        mdiIcon: '',
        faIcon: '',
        newkey: '',
        useNewKey: false,
      }
      this.tab = 2
    },
    formatKey(string) {
      this.purposeData.listingPurpose = string
        .toUpperCase()
        .split(' ')
        .join('_')
    },
    formatSubgroupKey(string) {
      this.subgroupData.purposeSubgroup = string
        .toUpperCase()
        .split(' ')
        .join('_')
    },
  },
}
</script>

<style></style>
