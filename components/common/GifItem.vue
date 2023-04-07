<template>
  <div ref="gifItem" @click="select">
    <v-hover v-slot="{ hover }">
      <v-card flat tile :class="$vuetify.theme.dark ? 'bg-dark' : 'bg-light'">
        <v-img
          :aspect-ratio="data.width ? data.width / data.height : 1"
          :src="data.url"
          @loadstart="loading = true"
          @load="loading = false"
        >
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              v-if="loading"
              indeterminate
              size="64"
              color="primary lighten-5"
            ></v-progress-circular>
          </v-row>
        </v-img>
        <v-scroll-y-transition v-if="$vuetify.breakpoint.mdAndUp">
          <v-overlay
            v-if="hover && !selected && !loading"
            absolute
            :opacity="0.6"
          >
            <!-- <v-btn text class="text-capitalize">Click to select</v-btn> -->
            <span>Click to select</span>
          </v-overlay>
        </v-scroll-y-transition>
        <v-scroll-y-transition>
          <v-overlay v-if="selected" color="primary" absolute :opacity="0.6">
            <!-- <v-btn text class="text-capitalize">Click to select</v-btn> -->
            <v-btn outlined class="text-capitalize" tile @click.stop="deselect"
              >Selected</v-btn
            >
          </v-overlay>
        </v-scroll-y-transition>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: {
    gif: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
    index: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    data() {
      if (this.gif) {
        return this.gif.images.original
      }
      return {}
    },
  },
  methods: {
    deselect() {
      this.$emit('select', null)
    },
    select() {
      console.log('Selected')
      if (this.selected) {
        this.$emit('select', null)
      } else {
        this.$emit('select', this.gif)
      }
    },
  },
}
</script>

<style></style>
