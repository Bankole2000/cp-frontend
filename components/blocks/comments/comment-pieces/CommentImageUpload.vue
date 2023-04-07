<template>
  <v-card flat>
    <v-card-text class="pa-0">
      <v-expand-transition>
        <v-card-text v-show="imageSelected" class="pa-0"
          ><v-alert
            type="success"
            class="mb-0"
            prominent
            icon="mdi-camera-iris"
            text
            >Pinch/Scroll to zoom, drag to move, use buttons to rotate/delete.
            Double click/tap to select new</v-alert
          ></v-card-text
        >
      </v-expand-transition>
      <v-expand-transition>
        <v-card-text v-show="!imageSelected" class="pa-0"
          ><v-alert
            type="info"
            class="mb-0"
            prominent
            icon="mdi-phone-rotate-landscape"
            text
            >For best results, please take pictures in landscape mode</v-alert
          ></v-card-text
        >
      </v-expand-transition>
      <div class="d-flex justify-center">
        <div
          :style="{
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: $vuetify.theme.dark ? '#1e1e1e' : '#f0efef',
          }"
          style="overflow: hidden; background-color: red"
        >
          <div
            :style="{
              transform: `translate(-50%, -50%) scale(${scale})`,
            }"
            style="
              top: 50%;
              left: 50%;
              width: 720px;
              height: 600px;
              position: relative;
            "
          >
            <Croppa
              v-model="croppa"
              :width="720"
              :height="600"
              placeholder-color="#00000000"
              :placeholder-font-size="24"
              :prevent-white-space="true"
              :show-remove-button="true"
              :show-loading="true"
              :loading-size="50"
              style="z-index: 3"
              loading-color="#00000000"
              canvas-color="transparent"
              :quality="1"
              @dblclick="croppa.chooseFile()"
              @init="handleCroppaInit"
            >
              <div
                v-if="!imageSelected"
                :style="{
                  backgroundColor: $vuetify.theme.dark ? '#1e1e1e' : '#f0efef',
                }"
                class="d-flex flex-column align-center justify-center"
                style="
                  height: 100%;
                  width: 100%;
                  cursor: pointer;
                  position: absolute;
                  top: 0;
                  z-index: -1;
                "
                @click="croppa.chooseFile()"
                @dblclick="croppa.chooseFile()"
              >
                <div class="d-flex text-center align-center">
                  <v-icon size="80">mdi-camera</v-icon>
                  <v-icon size="80">mdi-image-multiple</v-icon>
                </div>
                <h1 class="text-h2 font-weight-bold mt-4">Add a Picture</h1>
                <h1 class="text-h3 mt-4">
                  {{ $vuetify.breakpoint.smAndDown ? 'Tap' : 'Click' }} Or Drag
                  n Drop
                </h1>
              </div>
            </Croppa>

            <div
              class="d-flex"
              style="position: absolute; top: 0; z-index: 4; width: 100%"
            >
              <v-spacer></v-spacer>
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-btn
                    :style="{ transform: `scale(${1 / scale})` }"
                    icon
                    :disabled="loading"
                    :dark="$vuetify.theme.dark"
                    v-bind="attrs"
                    class="my-4 mr-8"
                    v-on="on"
                    @click.stop="cancel"
                  >
                    <v-icon size="32"> mdi-close-circle</v-icon>
                  </v-btn>
                </template>
                <span>Cancel</span>
              </v-tooltip>
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
    <v-expand-transition>
      <div v-show="!!imageSelected">
        <v-card-actions class="pb-0 pt-2">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                :disabled="loading || !imageSelected"
                color="primary"
                dark
                v-bind="attrs"
                @click="croppa.rotate(-1)"
                v-on="on"
                ><v-icon>mdi-rotate-left</v-icon></v-btn
              >
            </template>
            <span>Rotate Left</span>
          </v-tooltip>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                color="primary"
                dark
                :disabled="loading || !imageSelected"
                class="mx-2"
                v-bind="attrs"
                @click="croppa.rotate()"
                v-on="on"
                ><v-icon>mdi-rotate-right</v-icon></v-btn
              >
            </template>
            <span>Rotate Right</span>
          </v-tooltip>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                color="error"
                dark
                :disabled="loading || !imageSelected"
                v-bind="attrs"
                @click="croppa.remove()"
                v-on="on"
                ><v-icon>mdi-delete-forever-outline</v-icon></v-btn
              >
            </template>
            <span>Remove Image</span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-btn
            text
            rounded-lg
            :disabled="loading || !imageSelected"
            color="error"
            class="pr-4"
            @click.stop="cancel"
          >
            <v-icon left>mdi-close</v-icon> cancel</v-btn
          >
        </v-card-actions>
        <v-card-actions>
          <v-hover v-slot="{ hover }">
            <v-btn
              block
              style="transition: all 0.3s ease-in-out"
              depressed
              rounded-lg
              class="white--text my-0 pr-4"
              :class="{
                'bg-gradient-right-primary-accent white--text':
                  !!imageSelected && !loading,
                'elevated-light': hover,
              }"
              :loading="loading"
              :disabled="loading || !imageSelected"
              @click="saveImage"
            >
              <v-icon right>mdi-content-save</v-icon>
              Save
            </v-btn>
          </v-hover>
        </v-card-actions>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    postId: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      croppa: {},
      loading: false,
    }
  },
  computed: {
    width() {
      return this.$vuetify.breakpoint.width < 360
        ? this.$vuetify.breakpoint.width
        : 360
    },
    height() {
      return this.width ? (this.width / 6) * 5 : 350
    },
    scale() {
      return this.width / 720
    },
    imageSelected() {
      if (this.croppa.hasImage) {
        return !!this.croppa.hasImage()
      } else {
        return false
      }
    },
  },
  watch: {
    dialog(val) {
      console.log({ val })
      if (!val) {
        this.croppa.refresh()
      }
      // this.$emit('close', val)
    },
  },
  methods: {
    ...mapActions({
      uploadImage: 'user/posts/addImageToPost',
    }),
    blobToFile(blob, fileName) {
      blob.lastModifiedDate = new Date()
      blob.name = `${fileName}.${blob.type.split('/')[1]}`
      return blob
    },
    async saveImage() {
      if (this.loading) return
      this.loading = true
      console.log({ croppa: this.croppa })
      try {
        const blob = await this.croppa.promisedBlob()
        const file = this.blobToFile(blob, 'postImage')
        const formData = new FormData()
        formData.append('media', file, file.name)
        formData.append('type', 'IMAGE')
        const result = await this.uploadImage(formData)
        console.log({ result })
        if (result.success) {
          this.croppa.remove()
          this.$emit('cancel')
        }
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
    },
    cancel() {
      if (this.imageSelected) {
        this.croppa.remove()
      }
      this.$emit('cancel')
    },
    handleCroppaInit(e) {
      console.log({ e })
    },
  },
}
</script>

<style></style>
