<template>
  <div class="amenity-category-config">
    <v-form ref="form">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="categoryData.amenityCategory"
            prepend-inner-icon="mdi-key"
            dense
            label="Amenity Category key"
            filled
            hide-details
            rounded
            type="text"
            single-line
            placeholder="AMENITY_CATEGORY"
            @keyup="formatKey(categoryData.amenityCategory)"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="categoryData.title"
            prepend-inner-icon="mdi-pen"
            dense
            label="Title"
            filled
            hide-details
            rounded
            type="text"
            single-line
            placeholder="Category Title"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-textarea
            v-model="categoryData.descriptionHTML"
            dense
            prepend-inner-icon="mdi-note-text"
            label="Description (HTML)"
            filled
            hide-details
            auto-grow
            rows="3"
            rounded
            type="text"
            single-line
            placeholder="Category Description (HTML allowed)"
          >
          </v-textarea>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="d-flex align-center">
            <v-switch
              v-if="categoryData.id"
              v-model="categoryData.useNewKey"
              hide-details
              label="Change Key"
              class="mr-4 mt-0"
            ></v-switch>
            <v-text-field
              v-if="categoryData.id"
              v-model="categoryData.newkey"
              dense
              prepend-inner-icon="mdi-key"
              label="New Key"
              :disabled="!categoryData.useNewKey || loading"
              filled
              hide-details
              rounded
              type="text"
              single-line
              placeholder="NEW_CATEGORY_KEY"
            ></v-text-field>
          </div>
          <v-row class="pt-4">
            <v-col cols="6">
              <v-btn text block @click="cancel">Cancel</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn v-if="categoryData.id" block @click="updateItem"
                >Update</v-btn
              >
              <v-btn v-else block @click="createItem">Save</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
    <v-data-table
      dense
      :headers="headers"
      class="elevated-light mt-4"
      :items="
        amenityCategories.map((t, i) => {
          return {
            ...t,
            // sno: i + 1,
            amenities: t._count.amenities,
          }
        })
      "
      :items-per-page="5"
    >
      <template #[`item.actions`]="{ item }">
        <div style="display: flex">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="editItem(item)">
                <v-icon small> mdi-pencil </v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
          <v-menu content-class="elevated-light rounded-xl" left>
            <template #activator="{ on: menu, attrs }">
              <v-tooltip top>
                <template #activator="{ on: tooltip }">
                  <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
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
                <v-btn color="error" @click="deleteItem(item)"> Delete </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
          <v-menu content-class="elevated-light rounded-xl" left>
            <template #activator="{ on: menu, attrs }">
              <v-tooltip top>
                <template #activator="{ on: tooltip }">
                  <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
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
                <v-btn color="error" @click="deleteItem(item)"> Delete </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      headers: [
        { text: 'Key', value: 'amenityCategory' },
        { text: 'Title', value: 'title' },
        { text: 'Amenities', value: 'amenities' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      categoryData: {
        id: '',
        amenityCategory: '',
        title: '',
        descriptionHTML: '',
        newkey: '',
        useNewKey: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      amenityCategories: 'admin/settings/amenityCategories',
    }),
  },
  mounted() {
    console.log({ ref: this.$refs })
  },
  // async mounted() {
  //   await this.getAmenityCategories()
  // },
  methods: {
    ...mapActions({
      // getAmenityCategories: 'admin/settings/getAmenityCategories',
      createAmenityCategory: 'admin/settings/createAmenityCategory',
      updateAmenityCategory: 'admin/settings/updateAmenityCategory',
      deleteAmenityCategory: 'admin/settings/deleteAmenityCategory',
    }),
    async createItem() {
      const result = await this.createAmenityCategory(this.categoryData)
      console.log({ result })
      if (result.success) {
        this.cancel()
      }
    },
    async deleteItem(item) {
      const result = await this.deleteAmenityCategory(item.amenityCategory)
      console.log({ result })
    },
    cancel() {
      // this.$refs.form.reset()
      this.categoryData = {
        id: '',
        amenityCategory: '',
        title: '',
        descriptionHTML: '',
        newkey: '',
        useNewKey: false,
      }
    },
    editItem(item) {
      console.log({ item })
      this.categoryData = {
        ...this.categoryData,
        ...item,
        id: item.amenityCategory,
      }
    },
    async updateItem() {
      const result = await this.updateAmenityCategory({
        id: this.categoryData.id,
        data: this.categoryData,
      })
      console.log({ result })
      if (result.success) {
        this.cancel()
      }
    },
    formatKey(string) {
      this.categoryData.amenityCategory = string
        .toUpperCase()
        .split(' ')
        .join('_')
    },
    formatNewKey(string) {
      this.categoryData.newkey = string.toUpperCase().split(' ').join('_')
    },
  },
}
</script>

<style></style>
