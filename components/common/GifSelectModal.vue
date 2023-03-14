<template>
  <v-dialog
    v-model="dialog"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs"
    width="600"
    content-class="rounded-xl"
  >
    <v-card height="80vh" class="rounded-xl">
      <v-card-title class="d-flex flex-column pa-0">
        <div class="d-flex align-center px-2 pt-2 pb-1" style="width: 100%">
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-spacer> </v-spacer>
          <span class="headline d-inline-flex font-weight-bold">Add A Gif</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </div>
        <v-divider style="width: 100%"></v-divider>
        <div class="px-4 py-2 d-flex align-center" style="width: 100%">
          <v-text-field
            filled
            dense
            rounded
            hide-details
            single-line
            :append-outer-icon="
              filterCategory
                ? 'mdi-chevron-double-up'
                : 'mdi-chevron-double-down'
            "
            prepend-inner-icon="mdi-file-gif-box"
            label="Search"
            @click:append-outer="toggleFilter"
          ></v-text-field>
        </div>
        <v-expand-transition>
          <div v-show="filterCategory" style="max-width: 100%" class="pb-2">
            <v-slide-group center-active show-arrows>
              <v-slide-item
                v-for="category in categories"
                :key="category.name_encoded"
                v-slot="{ active, toggle }"
              >
                <v-btn
                  class="mx-2 text-capitalize"
                  :input-value="active"
                  active-class="purple white--text"
                  text
                  rounded
                  @click="toggle"
                >
                  {{ category.name }}
                </v-btn>
              </v-slide-item>
            </v-slide-group>
          </div>
        </v-expand-transition>
        <v-expand-transition>
          <div></div>
        </v-expand-transition>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text
        id="gif-display"
        class="pa-0"
        style="overflow-x: hidden; position: relative"
      >
        <ClientOnly>
          <v-row
            v-masonry
            item-selector="[class*='col-']"
            class="masonry-container"
          >
            <v-col
              v-for="(giph, i) in gifs"
              :key="i"
              cols="12"
              sm="6"
              class="pa-0"
            >
              <GifItem
                :index="i"
                :total="gifs.length"
                :gif="giph"
                :selected="selected ? selected.id === giph.id : false"
                @select="select"
              />
            </v-col>
            <v-col cols="12" style="position: static; bottom: 0">
              <ObserverButton />
            </v-col>
          </v-row>
        </ClientOnly>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          :disabled="!selected"
          rounded
          block
          :class="{
            'bg-gradient-right-primary-accent white--text': !!selected,
          }"
          ><v-icon left>mdi-content-save-outline</v-icon> Add</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ClientOnly from 'vue-client-only'
import { GiphyFetch } from '@giphy/js-fetch-api'
import GifItem from './GifItem.vue'
import ObserverButton from './ObserverButton.vue'
import categories from '@/utils/data/giffyCategories.json'
import gifs from '@/utils/data/gifs.json'
export default {
  components: {
    ClientOnly,
    GifItem,
    ObserverButton,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      gif: null,
      limit: 10,
      page: 1,
      next: null,
      prev: null,
      pages: 1,
      total: 0,
      categories,
      filterCategory: false,
      selected: null,
      gifs,
    }
  },
  computed: {
    dialog: {
      get() {
        return this.show
      },
      set(val) {
        this.selected = null
        this.$emit('show', val)
      },
    },
  },
  // watch: {
  //   async dialog(val) {
  //     if (val) {
  //       await this.getTrending()
  //     }
  //   },
  // },
  async mounted() {
    const apiKey = this.$store.state.env.giphyAPIKey
    this.gif = await new GiphyFetch(apiKey)
    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
    // await this.getGifCategories()
    // await this.getTrending()
    // const res = await fetch(
    //   `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`
    // )
    // const data = await res.json()
    // console.log({ res, data })
  },
  methods: {
    async getGifCategories() {
      try {
        const categories = await this.gif.categories()
        console.log({ categories })
      } catch (error) {
        console.log({ error })
      }
    },
    redraw() {
      if (typeof this.$redrawVueMasonry === 'function') {
        this.$redrawVueMasonry()
      }
    },
    cancel() {
      this.$emit('cancel')
    },
    getGifs() {
      return new Promise((resolve) => {
        const limit = this.limit
        const page = this.page
        const g = this.next
          ? gifs.filter((x, i) => i > (page - 1) * limit && i < page * limit)
          : gifs.filter(
              (x, i) => i > (this.next - 1) * limit && i < this.next * limit
            )
        const total = gifs.length
        const pages = Math.ceil(total / limit) || 1
        const prev = pages > 1 && page <= pages && page > 0 ? page - 1 : null
        const next = pages > 1 && page < pages && page > 0 ? page + 1 : null
        resolve({ g, page, limit, pages, prev, next })
      })
    },
    async getTrending() {
      try {
        // const trending = await this.gif.trending()
        console.log('getting trending')
        const { g, page, limit, pages, prev, next } = await this.getGifs()

        this.gifs = g
        this.page = page
        this.limit = limit
        this.pages = pages
        this.prev = prev
        this.next = next
        console.log('fetched')
        // console.log({ trending })
      } catch (error) {
        console.log({ error })
      }
    },
    toggleFilter() {
      this.filterCategory = !this.filterCategory
    },
    select(e) {
      console.log({ e })
      this.selected = e
    },
  },
}
</script>

<style></style>
