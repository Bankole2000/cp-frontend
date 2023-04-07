<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent
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
            :readonly="loading"
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
                  :disabled="loading"
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
          :loading="loading"
          rounded
          block
          :class="{
            'bg-gradient-right-primary-accent white--text':
              !!selected || !loading,
          }"
          @click="addGifToPost"
          ><v-icon left>mdi-content-save-outline</v-icon> Add</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import ClientOnly from 'vue-client-only'
import { GiphyFetch } from '@giphy/js-fetch-api'
import GifItem from './GifItem.vue'
import ObserverButton from './ObserverButton.vue'
import categories from '@/utils/data/giffyCategories.json'
import gifs from '@/utils/data/gifs.json'
import {
  errorMessage,
  loadingMessage,
  // successMessage
} from '~/utils/messaging'
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
      loading: false,
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
        if (!val) {
          if (this.loading) return
          this.selected = null
          this.$emit('show', val)
        }
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
    ...mapActions({
      // addGifToPost: 'user/posts/addGifToPost',
      showMessage: 'ui/showMessage',
      handleRequestSuccess: 'handleRequestSuccess',
      handleRequestError: 'handleRequestError',
    }),
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
    async addGifToPost() {
      if (this.loading) return
      if (!this.selected) {
        const message = errorMessage({ text: 'Please select a gif first...' })
        this.showMessage(message)
        this.loading = false
        return
      }
      this.loading = true
      const message = loadingMessage({ text: 'Adding Your Gif...' })
      const uuid = await this.showMessage(message)
      try {
        const url = new URL(
          `${this.$store.getters.postPath}/posts/${this.postId}/media`
        )
        const response = await this.$axios.$post(url.href, {
          type: 'GIF',
          id: this.selected.id,
          data: this.selected.images.original,
        })
        console.log({ response })
        if (response.success) {
          await this.handleRequestSuccess({ response, uuid })
          this.selected = null
          this.$emit('saved', response.data)
        }
      } catch (error) {
        console.log({ error })
        await this.handleRequestError({ error, uuid })
      } finally {
        this.loading = false
      }
    },
    // async addGif() {
    //   if (this.loading) return
    //   try {
    //     this.loading = true
    //     const result = await this.addGifToPost({
    //       id: this.selected.id,
    //       postId: this.postId,
    //       data: this.selected.images.original,
    //     })
    //     if (result.success) {
    //       this.$emit('saved')
    //     }
    //   } catch (error) {
    //     console.log({ error })
    //   } finally {
    //     this.loading = false
    //   }
    // },
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
