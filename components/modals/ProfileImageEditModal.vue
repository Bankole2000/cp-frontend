<template>
  <div class="profile-image-edit-modal">
    <v-dialog
      v-model="show"
      content-class="rounded-xl elevated-light"
      persistent
      :width="$vuetify.breakpoint.smAndDown ? '100vw' : '450px'"
    >
      <v-card class="pa-0 rounded-xl elevated-light">
        <v-card-title class="px-4">Update Profile Image</v-card-title>
        <v-card-text class="pa-0">
          <v-expand-transition>
            <v-card-text v-show="imageSelected" class="pa-0"
              ><v-alert
                type="info"
                class="mb-0"
                prominent
                icon="mdi-camera-iris"
                text
                >Pinch/Scroll to zoom, drag to move, use buttons to
                rotate/delete. Double click/tap to select new</v-alert
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
                >For best results, please take pictures in landscape
                mode</v-alert
              ></v-card-text
            >
          </v-expand-transition>
          <div class="d-flex justify-center">
            <Croppa
              v-model="croppa"
              :width="$vuetify.breakpoint.smAndDown ? 350 : 350"
              :height="$vuetify.breakpoint.smAndDown ? 350 : 350"
              placeholder="Click/Tap to Set Image"
              placeholder-color="#606060"
              :placeholder-font-size="24"
              :initial-image="`${profileImage}?w=500`"
              :prevent-white-space="true"
              :show-remove-button="false"
              :show-loading="true"
              :loading-size="50"
              loading-color="#606060"
              canvas-color="transparent"
              :quality="2"
              @dblclick="croppa.chooseFile()"
              @init="handleCroppaInit"
            >
            </Croppa>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                :disabled="!imageSelected"
                icon
                color="primary"
                dark
                large
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
                large
                color="primary"
                dark
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
                large
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
            rounded
            color="error"
            class="pr-4"
            @click="$emit('close')"
          >
            <v-icon left>mdi-close</v-icon> cancel</v-btn
          >
          <v-hover v-slot="{ hover }">
            <v-btn
              style="transition: all 0.3s ease-in-out"
              nuxt
              rounded
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
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      croppa: {},
      loading: false,
    }
  },
  computed: {
    show: {
      get() {
        return this.dialog
      },
      set(val) {
        this.$emit('close', val)
      },
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
        const file = this.blobToFile(blob, 'profileImage')
        const formData = new FormData()
        console.log({ file })
        formData.append('profileImage', file, file.name)
        const url = `${this.$store.state.env.profilePath}/me/image`
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
    handleCroppaInit(e) {
      console.log({ e })
    },
  },
}
</script>

<style>
</style>