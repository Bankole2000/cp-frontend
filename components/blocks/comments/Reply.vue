<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-timeline-item small>
    <template #icon>
      <v-avatar size="40">
        <img src="http://i.pravatar.cc/64" />
      </v-avatar>
    </template>
    <v-list-item class="pl-0 ml-n4 mb-n2">
      <v-list-item-content class="py-0 mt-n6">
        <v-list-item-subtitle>
          <span
            class="font-weight-bold"
            :class="{
              'secondary--text': !$vuetify.theme.dark,
              'white--text': $vuetify.theme.dark,
            }"
            >Display name</span
          >
          <span class="text--secondary font-weight-regular">
            &bull; {{ $moment() }}</span
          >
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <span
            style="cursor: pointer"
            :class="{
              'secondary--text': !$vuetify.theme.dark,
              'white--text': $vuetify.theme.dark,
            }"
            >@username</span
          >
          <span class="caption">&bull; Sponsored</span>
          <span class="caption">&bull; Location</span>
          <span class="caption">&bull; Pinned</span>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action class="mx-0 mb-0 py-0 mt-n6">
        <v-menu content-class="elevated-light rounded-lg" offset-y left>
          <template #activator="{ on, attrs }">
            <v-btn small icon class="mx-2 mb-2 mt-0" v-bind="attrs" v-on="on">
              <v-icon size="24">mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon size="24">mdi-pin</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="ml-n4">
                  Pin Comment
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon size="24">mdi-trash-can</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="ml-n4">
                  Delete
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon size="24">mdi-flag</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="ml-n4">
                  Report
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon size="24">mdi-account-arrow-right-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="ml-n4">
                  Follow {username}</v-list-item-content
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon size="24">mdi-account-minus-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="ml-n4">
                  Unfollow {username}</v-list-item-content
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon size="24">mdi-account-cancel-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="ml-n4">
                  Block {username}
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-list-item-action>
    </v-list-item>
    <p
      class="ml-n4 mt-n4 mb-2 pr-2"
      :class="{
        'secondary--text': !$vuetify.theme.dark,
        'white--text': $vuetify.theme.dark,
      }"
    >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa ut sint,
      fugiat velit cupiditate voluptatum alias.
    </p>
    <v-card outlined class="ml-n4 elevated-light">
      <v-img
        cover
        :src="'http://localhost:8080/api/files/08tzclgz3oh38j1/wotyxqibl8no3rq/post_image_EOkXRNH31F.png'"
      ></v-img>
    </v-card>
  </v-timeline-item>
</template>

<script>
export default {}
</script>

<style></style>
