<template>
  <div class="profile-data-form">
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" class="py-1">
            <v-text-field
              v-model="profileData.displayname"
              hint="Display Name: Public (visible to everyone)"
              persistent-hint
              prepend-inner-icon="mdi-rename-outline"
              filled
              single-line
              rounded
              placeholder="Display Name"
              label="Display Name"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="py-1">
            <v-text-field
              v-model="profileData.firstname"
              filled
              rounded
              single-line
              prepend-inner-icon="mdi-account-outline"
              persistent-hint
              hint="Legal Firstname: Private"
              label="First Name"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="py-1">
            <v-text-field
              v-model="profileData.lastname"
              filled
              rounded
              single-line
              persistent-hint
              prepend-inner-icon="mdi-account-outline"
              label="Last Name"
              hint="Legal Lastname: Private"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="py-1">
            <v-textarea
              v-model="profileData.bio"
              filled
              rounded
              prepend-inner-icon="mdi-format-quote-open"
              persistent-hint
              single-line
              label="Bio"
              hint="A short bio about you: Public (visible to everyone)"
            ></v-textarea>
          </v-col>
          <v-col cols="9" class="py-1">
            <v-text-field
              v-model="profileData.websiteUrl"
              filled
              rounded
              prepend-inner-icon="mdi-link-variant"
              single-line
              persistent-hint
              placeholder="https://example.com"
              label="Website URL"
              hint="Personal / Business Website URL"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="py-1">
            <v-select
              :items="viewOptions"
              return-object
              filled
              rounded
              single-line
              @change="privacySelection('twitter', $event)"
            >
              <template #selection="{ item }">
                <v-icon>{{ item.icon }}</v-icon>
              </template>
            </v-select>
          </v-col>
          <v-col cols="9" class="py-1">
            <v-text-field
              v-model="profileData.twitterHandle"
              filled
              rounded
              persistent-hint
              single-line
              placeholder="@twitter_handle"
              prepend-inner-icon="mdi-twitter"
              label="Twitter Handle"
              hint="Twitter Handle: Private"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="py-1">
            <v-select
              :items="viewOptions"
              return-object
              filled
              rounded
              single-line
              @change="privacySelection('twitter', $event)"
            >
              <template #selection="{ item }">
                <v-icon>{{ item.icon }}</v-icon>
              </template>
            </v-select>
          </v-col>
          <v-col cols="9" class="py-1">
            <v-text-field
              v-model="profileData.instagramHandle"
              filled
              rounded
              single-line
              prepend-inner-icon="mdi-instagram"
              placeholder="@instagram_handle"
              persistent-hint
              label="Instagram Handle"
              hint="Instagram Handle: Private"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="py-1">
            <v-select
              :items="viewOptions"
              return-object
              filled
              rounded
              single-line
              @change="privacySelection('instagram', $event)"
            >
              <template #selection="{ item }">
                <v-icon>{{ item.icon }}</v-icon>
              </template>
            </v-select>
          </v-col>
          <v-col cols="9" class="py-1">
            <v-text-field
              v-model="profileData.facebookUrl"
              filled
              rounded
              single-line
              prepend-inner-icon="mdi-facebook"
              persistent-hint
              placeholder="https://facebook.com/username"
              hint="Facebook URL: Private"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="py-1">
            <v-select
              :items="viewOptions"
              return-object
              filled
              rounded
              single-line
              @change="privacySelection('instagram', $event)"
            >
              <template #selection="{ item }">
                <v-icon>{{ item.icon }}</v-icon>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: false,
      profileData: {
        displayname: '',
        firstname: '',
        lastname: '',
        isPrivate: '',
        bio: '',
        websiteUrl: '',
        facebookUrl: '',
        twitterHandle: '',
        twitterHandleIsPrivate: false,
        instagramHandle: '',
      },
      viewOptions: [
        { text: 'Anyone', value: 'PUBLIC', icon: 'mdi-web' },
        {
          text: 'Followers',
          value: 'FOLLOWERS',
          icon: 'mdi-account-multiple-outline',
        },
        { text: 'Private', value: 'PRIVATE', icon: 'mdi-eye-off-outline' },
      ],
    }
  },
  computed: {
    displayname() {
      return this.profile ? this.profile.displayname : null
    },
    firstname() {
      return this.profile ? this.profile.firstname : null
    },
    lastname() {
      return this.profile ? this.profile.lastname : null
    },
    bio() {
      return this.profile ? this.profile.bio : null
    },
  },
  watch: {
    profile: {
      handler: function (newVal) {
        this.profileData = newVal
      },
      deep: true,
    },
  },
  mounted() {
    const fields = Object.keys(this.profileData)
    fields.forEach((field) => {
      if (this[field]) {
        this.profileData[field] = this.profile[field]
      }
    })
  },
  methods: {
    privacySelection(field, event) {
      console.log({ field, event })
      // this.profileData[field + 'IsPrivate'] = event.value
    },
  },
}
</script>

<style>
</style>