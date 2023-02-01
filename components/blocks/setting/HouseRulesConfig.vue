<template>
  <v-card class="elevated-light">
    <v-card-title class="py-3"
      >House Rules Settings

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
              House Rules
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
            <v-tab> {{ houseRuleData.id ? 'Edit' : 'Add' }} House Rule </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab" class="mt-4">
            <v-tab-item>
              <v-data-table
                dense
                :headers="headers"
                class="elevated-light"
                :items="
                  houseRules.map((t, i) => {
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
                <template #[`item.mdiIconFalse`]="{ item }">
                  <v-icon>mdi-{{ item.mdiIconFalse }}</v-icon>
                </template>
                <template #[`item.mdiIconTrue`]="{ item }">
                  <v-icon>mdi-{{ item.mdiIconTrue }}</v-icon>
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
                      v-model="houseRuleData.houseRule"
                      prepend-inner-icon="mdi-key"
                      :disabled="Boolean(houseRuleData.id)"
                      dense
                      label="House Rule key"
                      filled
                      hide-details
                      rounded
                      type="text"
                      single-line
                      placeholder="HOUSE_RULE"
                      @keyup="formatKey(houseRuleData.houseRule)"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="houseRuleData.title"
                      prepend-inner-icon="mdi-pen"
                      dense
                      label="Title"
                      filled
                      hide-details
                      rounded
                      type="text"
                      single-line
                      placeholder="House Rule Title"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-textarea
                      v-model="houseRuleData.descriptionHTML"
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
                      placeholder="House Rule Description (HTML allowed)"
                    >
                    </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="d-flex align-center">
                      <v-autocomplete
                        v-model="houseRuleData.mdiIconTrue"
                        prepend-inner-icon="mdi-check"
                        rounded
                        filled
                        class="mb-2"
                        dense
                        :items="mdiIcons.map((x) => x.name)"
                        placeholder="mdi icon"
                        flat
                        single-line
                        :append-icon="`mdi-${houseRuleData.mdiIconTrue}`"
                        prefix="mdi -"
                        hide-details
                        label="Allowed Icon"
                      >
                      </v-autocomplete>
                      <v-autocomplete
                        v-model="houseRuleData.mdiIconFalse"
                        prepend-inner-icon="mdi-cancel"
                        rounded
                        filled
                        class="mb-2"
                        dense
                        :items="mdiIcons.map((x) => x.name)"
                        placeholder="mdi icon"
                        flat
                        single-line
                        :append-icon="`mdi-${houseRuleData.mdiIconFalse}`"
                        prefix="mdi -"
                        hide-details
                        label="Not Allowed Icon"
                      >
                      </v-autocomplete>
                    </div>
                    <div class="d-flex align-center">
                      <v-autocomplete
                        v-model="houseRuleData.faIconTrue"
                        prepend-inner-icon="mdi-font-awesome"
                        rounded
                        filled
                        class="mb-2"
                        dense
                        :items="faIcons"
                        placeholder="fa icon"
                        flat
                        single-line
                        :append-icon="`mdi-${houseRuleData.faIconTrue}`"
                        prefix="fa -"
                        hide-details
                        label="Allowed fa Icon"
                      >
                      </v-autocomplete>
                      <v-autocomplete
                        v-model="houseRuleData.faIconFalse"
                        prepend-inner-icon="mdi-cancel"
                        rounded
                        filled
                        class="mb-2"
                        dense
                        :items="faIcons"
                        placeholder="fa icon"
                        flat
                        single-line
                        :append-icon="`mdi-${houseRuleData.faIconFalse}`"
                        prefix="fa -"
                        hide-details
                        label="Not allowed fa Icon"
                      >
                      </v-autocomplete>
                    </div>

                    <div class="d-flex align-center">
                      <v-switch
                        v-if="houseRuleData.id"
                        v-model="houseRuleData.useNewKey"
                        hide-details
                        label="Change Key"
                        class="mr-4 mt-0"
                      ></v-switch>
                      <v-text-field
                        v-if="houseRuleData.id"
                        v-model="houseRuleData.newkey"
                        dense
                        prepend-inner-icon="mdi-key"
                        label="New Key"
                        :disabled="!houseRuleData.useNewKey || loading"
                        filled
                        hide-details
                        rounded
                        type="text"
                        single-line
                        placeholder="NEW_HOUSE_RULE_KEY"
                      ></v-text-field>
                    </div>
                  </v-col>
                  <v-col cols="12" offset-sm="6" sm="6" class="py-4">
                    <v-row>
                      <v-col cols="6">
                        <v-btn text block @click="cancel">Cancel</v-btn>
                      </v-col>
                      <v-col cols="6">
                        <v-btn v-if="houseRuleData.id" block @click="updateItem"
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
        { text: 'key', value: 'houseRule' },
        { text: 'Title', value: 'title' },
        // { text: 'Description', value: 'descriptionHTML' },
        // { text: 'Status', value: 'isActive', align: 'center' },
        { text: 'allowed Icon', value: 'mdiIconTrue', sortable: false },
        { text: 'not allowed Icon', value: 'mdiIconFalse', sortable: false },
        // { text: 'Fa Icon', value: 'faIcon' },
        { text: 'Listings', value: 'listings' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      houseRuleData: {
        id: '',
        houseRule: '',
        title: '',
        descriptionHTML: '',
        mdiIconFalse: '',
        mdiIconTrue: '',
        faIconFalse: '',
        faIconTrue: '',
        newkey: '',
        useNewKey: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      houseRules: 'admin/settings/houseRules',
    }),
  },
  async mounted() {
    await this.getHouseRules()
  },
  methods: {
    ...mapActions({
      getHouseRules: 'admin/settings/getHouseRules',
      createHouseRule: 'admin/settings/createHouseRule',
      updateHouseRule: 'admin/settings/updateHouseRule',
      deleteHouseRule: 'admin/settings/deleteHouseRule',
    }),
    async refresh() {
      await this.getHouseRules()
    },
    async createItem() {
      const result = await this.createHouseRule(this.houseRuleData)
      console.log({ result })
      if (result.success) {
        this.cancel()
      }
    },
    editItem(item) {
      this.houseRuleData = {
        ...this.houseRuleData,
        ...item,
        id: item.houseRule,
      }
      this.tab = 1
    },
    async updateItem() {
      const result = await this.updateHouseRule({
        id: this.houseRuleData.id,
        data: this.houseRuleData,
      })
      console.log({ result })
      if (result.success) {
        this.cancel()
      }
    },
    async deleteItem(item) {
      const result = await this.deleteHouseRule(item.houseRule)
      console.log({ result })
    },
    cancel() {
      // this.$refs.form.reset()
      this.houseRuleData = {
        id: '',
        houseRule: '',
        title: '',
        descriptionHTML: '',
        mdiIconTrue: '',
        mdiIconFalse: '',
        faIconTrue: '',
        faIconFalse: '',
        newkey: '',
        useNewKey: false,
      }
      this.tab = 0
    },
    formatKey(string) {
      this.houseRuleData.houseRule = string.toUpperCase().split(' ').join('_')
    },
  },
}
</script>

<style></style>
