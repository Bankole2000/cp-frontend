<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <login-email />
          <AmenityConfig />
          <ListingTypeConfig />
        </v-col>
      </v-row>
    </v-container>
    <h1>Random Test page</h1>
    <p>{{ $store.state.ui.messages }}</p>
    <v-hover v-slot="{ hover }">
      <v-card
        flat
        :class="{ 'elevated-light': hover }"
        style="cursor: pointer; transition: all 0.3s ease"
      >
        Something
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import LoginEmail from './auth/login-email.vue'
import ListingTypeConfig from '~/components/blocks/setting/ListingTypeConfig.vue'
import AmenityConfig from '~/components/blocks/setting/AmenityConfig.vue'
export default {
  components: { ListingTypeConfig, LoginEmail, AmenityConfig },
  layout: 'empty',
  data() {
    return {}
  },
}
</script>

<style></style>
