<template>
  <v-navigation-drawer
    v-model="nav"
    :right="true"
    class="elevated-light"
    :clipped="false"
    fixed
    :style="{
      backgroundColor: $vuetify.theme.dark ? '#1e1e1e' : '#ffffff',
      minHeight: '100%',
      border: 'none',
      zIndex: 7,
      minWidth: $vuetify.breakpoint.smAndDown ? '100vw' : '360px',
    }"
  >
    <div class="d-flex align-center">
      <v-btn icon class="ml-2" @click="nav = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-tabs v-if="items" v-model="mainTab" grow height="64px">
        <v-tab v-for="item in items" :key="item">
          <v-badge
            v-if="item === 'Messages'"
            color="error darken-1"
            content="6"
          >
            {{ item }}
          </v-badge>
          <v-badge v-if="item === 'Invites'" color="error darken-1" content="6">
            {{ item }}
          </v-badge>
          <v-badge v-if="item === 'Settings'" color="error darken-1" dot>
            {{ item }}
          </v-badge>
        </v-tab>
      </v-tabs>
    </div>
    <v-divider></v-divider>
    <div>
      <v-tabs-items v-model="mainTab">
        <v-tab-item :value="items.indexOf('Messages')">
          <div style="min-height: calc(100vh - 65px)">
            <div
              class="d-flex align-center justify-center px-4"
              style="min-height: 64px"
            >
              <v-textarea
                placeholder="Search Messages"
                rows="1"
                prepend-inner-icon="mdi-magnify"
                auto-grow
                hide-details
                filled
                dense
                rounded
                single-line
              ></v-textarea>
            </div>
            <v-divider></v-divider>
            <div style="height: calc(100vh - 195px); overflow-y: scroll">
              <div>
                <ChatSample />
              </div>
            </div>
            <v-divider></v-divider>
            <div class="d-flex align-center px-2" style="height: 64px">
              <v-badge
                bordered
                bottom
                color="green accent-4"
                dot
                offset-x="25"
                offset-y="20"
              >
                <v-list-item-avatar size="50">
                  <v-img
                    src="https://randomuser.me/api/portraits/women/79.jpg"
                  ></v-img>
                </v-list-item-avatar>
              </v-badge>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-tune</v-icon>
              </v-btn>
            </div>
          </div>
        </v-tab-item>
        <v-tab-item :value="items.indexOf('Invites')">
          <div style="min-height: calc(100vh - 65px)">
            <div>
              <v-tabs fixed-tabs height="65px">
                <v-tab> Recieved </v-tab>
                <v-tab> Sent </v-tab>
              </v-tabs>
            </div>
            <v-divider></v-divider>
            <div style="height: calc(100vh - 130px); overflow-y: scroll">
              <div>
                <ChatSample />
              </div>
            </div>
          </div>
        </v-tab-item>
        <!-- <v-tab-item :value="items.indexOf('Settings')">
          <div>
            <h1>Settings</h1>
          </div>
        </v-tab-item> -->
      </v-tabs-items>
    </div>
  </v-navigation-drawer>
</template>

<script>
import ChatSample from '../blocks/ChatSample.vue'
export default {
  components: {
    ChatSample,
  },
  data() {
    return {
      mainTab: 0,
      items: ['Messages', 'Invites'],
    }
  },
  computed: {
    nav: {
      get() {
        return this.$store.getters['ui/showMainRightNav']
      },
      set(val) {
        return this.$store.commit('ui/toggleMainRightNav', val)
      },
    },
  },
  methods: {},
}
</script>

<style scoped>
.v-navigation-drawer >>> .v-navigation-drawer__border {
  display: none;
}
</style>
