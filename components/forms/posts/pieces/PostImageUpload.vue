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
              width: 1080px;
              height: 900px;
              position: relative;
            "
          >
            <div
              v-if="!imageSelected"
              :style="{
                backgroundColor: $vuetify.theme.dark ? '#1e1e1e' : '#f0efef',
              }"
              class="d-flex flex-column align-center justify-center"
              style="height: 100%; width: 100%; cursor: pointer"
              @click="croppa.chooseFile()"
              @dblclick="croppa.chooseFile()"
            >
              <div class="d-flex text-center align-center">
                <v-icon size="80">mdi-camera</v-icon>
                <v-icon size="80">mdi-image-multiple</v-icon>
              </div>
              <h1 class="text-h2 font-weight-bold mt-4">Add a Picture</h1>
              <h1 class="text-h3 mt-4">
                {{ $vuetify.breakpoint.smAndDown ? 'Tap' : 'Click' }} to add an
                image
              </h1>
            </div>
            <Croppa
              v-model="croppa"
              :width="1080"
              :height="900"
              placeholder-color="#606060"
              :placeholder-font-size="24"
              :prevent-white-space="true"
              :show-remove-button="true"
              :show-loading="true"
              :loading-size="50"
              loading-color="#606060"
              canvas-color="transparent"
              :quality="2"
              @dblclick="croppa.chooseFile()"
              @init="handleCroppaInit"
            >
            </Croppa>
            <div
              class="d-flex"
              style="position: absolute; top: 0; z-index: 1; width: 100%"
            >
              <v-spacer></v-spacer>
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-btn
                    :style="{ transform: `scale(${1 / scale})` }"
                    icon
                    :dark="$vuetify.theme.dark"
                    v-bind="attrs"
                    class="ma-16"
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
                :disabled="!imageSelected"
                icon
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
                :disabled="!imageSelected"
                icon
                color="primary"
                dark
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
                :disabled="!imageSelected"
                icon
                color="error"
                dark
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
              nuxt
              rounded-lg
              class="white--text my-0 pr-4"
              :class="
                hover
                  ? 'bg-gradient-right-primary-error elevated'
                  : 'bg-gradient-right-primary-accent elevated-light'
              "
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
      return this.$vuetify.breakpoint.width < 420
        ? this.$vuetify.breakpoint.width
        : 420
    },
    height() {
      return this.width ? (this.width / 6) * 5 : 350
    },
    scale() {
      return this.width / 1080
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
    blobToFile(blob, fileName) {
      blob.lastModifiedDate = new Date()
      blob.name = `${fileName}.${blob.type.split('/')[1]}`
      return blob
    },
    saveImage() {
      console.log({ croppa: this.croppa })
      this.croppa.getChosenFile()
      this.croppa.generateBlob((blob) => {
        console.log({ blob })
        const file = this.blobToFile(blob, 'postImage')
        const formData = new FormData()
        console.log({ file })
        formData.append('media', file, file.name)
        formData.append('type', 'IMAGE')
        const url = `${this.$store.getters.postPath}/posts/${this.postId}/media`
        this.$axios
          .$post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log({ res })
            this.$emit('close', false)
            this.$emit('imageSaved', res)
          })
          .catch((err) => {
            console.log({ err })
          })
      })
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
