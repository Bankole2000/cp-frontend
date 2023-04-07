<template>
  <div class="ml-4 mr-8">
    <v-menu
      v-model="menu"
      offset-y
      content-class="rounded-xl elevated-light"
      transition="scroll-y-reverse-transition"
      top
    >
      <template #activator="{ on, attrs }">
        <v-hover v-slot="{ hover }">
          <v-card
            flat
            class="py-3 mb-4 d-flex pl-6"
            :class="
              menu || hover || $route.name.includes('create')
                ? 'elevated-light bg-gradient-right-primary-accent white--text'
                : ''
            "
            style="
              border-radius: 20px;
              cursor: pointer;
              transition: all 0.3s ease;
            "
            :style="{
              backgroundColor: $vuetify.theme.dark ? '#121212' : '#f0efef',
            }"
            v-bind="attrs"
            v-on="on"
          >
            <div class="d-flex align-center">
              <v-icon
                :color="
                  menu || hover || $route.name.includes('create') ? 'white' : ''
                "
                left
                >mdi-plus-circle-outline</v-icon
              >
              <p class="mb-0">Create</p>
            </div>
          </v-card>
        </v-hover>
      </template>
      <v-list>
        <v-list-item>
          <v-hover v-slot="{ hover }">
            <v-card
              block
              flat
              class="px-4 py-2 my-2 rounded-xl d-flex align-center"
              :class="{
                'elevated-light': hover,
                'bg-primary-lt': true,
              }"
              width="180"
              style="text-align: left; transition: all 0.3s ease-in-out"
              :style="{
                backgroundColor: $vuetify.theme.dark ? '#121212' : '#f0efef',
              }"
              @click="$emit('show-create-post-modal')"
            >
              <v-icon left>mdi-post-outline</v-icon>
              <p class="mb-0">Post</p>
            </v-card>
          </v-hover>
        </v-list-item>
        <v-list-item v-for="(item, index) in links" :key="index">
          <v-hover v-slot="{ hover }">
            <nuxt-link :to="{ name: item.route }">
              <v-card
                block
                flat
                class="px-4 py-2 my-2 rounded-xl d-flex align-center"
                :class="{
                  'elevated-light': hover,
                  'bg-primary-lt': true,
                }"
                width="180"
                style="text-align: left; transition: all 0.3s ease-in-out"
                :style="{
                  backgroundColor: $vuetify.theme.dark ? '#121212' : '#f0efef',
                }"
              >
                <v-icon left>{{ item.icon }}</v-icon>
                <p class="mb-0">{{ item.name }}</p>
              </v-card>
            </nuxt-link>
          </v-hover>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'CreateButton',
  props: {
    // props
  },
  data() {
    return {
      menu: false,
      links: [
        // {
        //   name: 'Post',
        //   icon: 'mdi-post-outline',
        //   route: 'create-post',
        // },
        {
          name: 'Listing',
          icon: 'mdi-home-account',
          route: 'create-listing',
        },
        {
          name: 'Personal Ad',
          icon: 'mdi-card-search-outline',
          route: 'create-ad',
        },
        {
          name: 'Service',
          icon: 'mdi-account-hard-hat-outline',
          route: 'create-service',
        },
      ],
    }
  },
  computed: {
    // computed
  },
  methods: {
    // methods
  },
}
</script>

<style></style>
