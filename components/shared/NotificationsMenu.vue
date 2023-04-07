<template>
  <v-menu
    v-model="showNotifications"
    :max-height="$vuetify.breakpoint.height / 1.2"
    bottom
    :disabled="!$store.getters['auth/user']"
    :min-width="$vuetify.breakpoint.xs ? '90vw' : 350"
    :max-width="$vuetify.breakpoint.xs ? '90vw' : 400"
    left
    offset-y
    :close-on-content-click="false"
    content-class="elevated-light rounded-xl"
    transition="slide-x-transition"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        class="mx-2"
        @click="showNotifications = !showNotifications"
        v-on="on"
      >
        <v-badge
          bordered
          color="error"
          :content="newCount"
          :value="newCount"
          overlap
          offset-x="10"
          offset-y="8"
          class="mx-1"
        >
          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-card
      :min-width="$vuetify.breakpoint.xs ? '90vw' : 350"
      :max-width="$vuetify.breakpoint.xs ? '90vw' : 400"
      class="px-0 rounded-xl elevated-light"
    >
      <v-toolbar style="width: 100%" elevation="0" class="rounded-tr-xl">
        <v-toolbar-title>Notifications</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu
          transition="slide-x-transition"
          content-class="rounded-xl elevated-light"
          bottom
          left
          :offset-y="true"
        >
          <template #activator="{ on, attrs }">
            <v-btn v-bind="attrs" class="mx-2" icon v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <v-list-item @click="markAllAsRead()">
              <v-list-item-icon>
                <v-icon>mdi-check-all</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Mark all as read</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="clearAllNotifications()">
              <v-list-item-icon>
                <v-icon>mdi-delete</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Clear All Notifications</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-divider></v-divider>
      <v-expand-transition>
        <v-progress-linear v-show="loading" indeterminate></v-progress-linear>
      </v-expand-transition>
      <v-card-text class="pa-0">
        <div style="max-height: calc(70vh); overflow-y: scroll">
          <div>
            <v-list three-line dense class="py-0">
              <v-list-item-group :key="componentKey" class="py-0">
                <NotificationItem
                  v-for="(notification, i) in notifications"
                  :key="i"
                  :notification="notification"
                  :socket="socket"
                  @handleNotification="handleNotification"
                />
                <v-list-item class="pr-0 pl-2">
                  <div
                    style="
                      display: flex;
                      align-items: start;
                      cursor: pointer;
                      width: 100%;
                    "
                    class="my-2"
                  >
                    <div style="flex: 4">
                      <v-badge
                        overlap
                        bordered
                        bottom
                        icon="mdi-account-plus"
                        offset-x="15"
                        offset-y="15"
                        color="blue"
                      >
                        <v-avatar size="48">
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/john.png"
                          ></v-img>
                        </v-avatar>
                      </v-badge>
                    </div>
                    <div style="flex: 18" class="pl-2">
                      <p class="mb-0">
                        <span class="font-weight-bold">Andrew Diete-Koki</span>
                        ordered for 2 items.
                      </p>
                      <p class="accent--text font-weight-bold mb-0">
                        2 min ago.
                      </p>
                    </div>
                    <div
                      style="flex: 2; display: flex; justify-content: center"
                    >
                      <v-icon size="12" class="mt-4" color="accent"
                        >mdi-circle</v-icon
                      >
                    </div>
                  </div>
                </v-list-item>
                <v-list-item class="pr-0 pl-2">
                  <div
                    style="
                      display: flex;
                      align-items: start;
                      cursor: pointer;
                      width: 100%;
                    "
                    class="my-2"
                  >
                    <div style="flex: 4">
                      <v-badge
                        overlap
                        bordered
                        bottom
                        icon="mdi-account-plus"
                        offset-x="15"
                        offset-y="15"
                        color="blue"
                      >
                        <v-avatar size="48">
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/john.png"
                          ></v-img>
                        </v-avatar>
                      </v-badge>
                    </div>
                    <div style="flex: 18" class="pl-2">
                      <p class="mb-0">
                        <span class="font-weight-bold">John Doe</span>
                        Requested to follow you
                      </p>
                      <p class="accent--text font-weight-bold mb-0">
                        2 min ago.
                      </p>
                      <div>
                        <v-btn text color="error">Decline</v-btn>
                        <v-btn depressed color="primary">Accept</v-btn>
                      </div>
                    </div>
                    <div
                      style="flex: 2; display: flex; justify-content: center"
                    >
                      <v-icon size="12" class="mt-4" color="accent"
                        >mdi-circle</v-icon
                      >
                    </div>
                  </div>
                </v-list-item>
                <v-list-item class="pr-0 pl-2">
                  <div
                    style="
                      display: flex;
                      align-items: start;
                      cursor: pointer;
                      width: 100%;
                    "
                    class="my-2"
                  >
                    <div style="flex: 4">
                      <v-badge
                        overlap
                        bordered
                        bottom
                        icon="mdi-heart"
                        offset-x="15"
                        offset-y="15"
                        color="error"
                      >
                        <v-avatar size="48">
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/john.png"
                          ></v-img>
                        </v-avatar>
                      </v-badge>
                    </div>
                    <div style="flex: 18" class="pl-2">
                      <p class="mb-0">
                        <span class="font-weight-bold">John doe</span>
                        liked your post
                      </p>
                      <p class="mb-0 text--secondary">
                        This post has a caption but no media
                      </p>
                      <p class="accent--text font-weight-bold mb-0">
                        2 min ago.
                      </p>
                    </div>
                    <div
                      style="flex: 2; display: flex; justify-content: center"
                    >
                      <v-icon size="12" class="mt-4" color="accent"
                        >mdi-circle</v-icon
                      >
                    </div>
                  </div>
                </v-list-item>
                <v-list-item class="pr-0 pl-2">
                  <div
                    style="
                      display: flex;
                      align-items: start;
                      cursor: pointer;
                      width: 100%;
                    "
                    class="my-2"
                  >
                    <div style="flex: 4">
                      <v-badge
                        overlap
                        bordered
                        bottom
                        icon="mdi-heart"
                        offset-x="15"
                        offset-y="15"
                        color="error"
                      >
                        <v-avatar size="48">
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/john.png"
                          ></v-img>
                        </v-avatar>
                      </v-badge>
                    </div>
                    <div
                      style="flex: 18; display: flex; align-items: start"
                      class="pl-2"
                    >
                      <div class="flex-grow">
                        <p class="mb-0">
                          <span class="font-weight-bold">John doe</span>
                          liked your post
                        </p>
                        <p
                          class="mb-0 text--secondary text-truncate"
                          style="max-width: 200px"
                        >
                          This post has a caption with media Lorem ipsum dolor
                          sit amet.
                        </p>
                        <p class="accent--text font-weight-bold mb-0">
                          2 min ago.
                        </p>
                      </div>
                      <v-spacer></v-spacer>
                      <div>
                        <v-avatar class="mt-3 ml-1" color="grey" size="30" tile>
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                          ></v-img>
                        </v-avatar>
                      </div>
                    </div>
                    <div
                      style="flex: 2; display: flex; justify-content: center"
                    >
                      <v-icon size="12" class="mt-4" color="accent"
                        >mdi-circle</v-icon
                      >
                    </div>
                  </div>
                </v-list-item>
                <v-list-item class="pr-0 pl-2">
                  <div
                    style="
                      display: flex;
                      align-items: start;
                      cursor: pointer;
                      width: 100%;
                    "
                    class="my-2"
                  >
                    <div style="flex: 4">
                      <v-badge
                        overlap
                        bordered
                        bottom
                        icon="mdi-message"
                        offset-x="15"
                        offset-y="15"
                        color="accent"
                      >
                        <v-avatar size="48">
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/john.png"
                          ></v-img>
                        </v-avatar>
                      </v-badge>
                    </div>
                    <div
                      style="flex: 18; display: flex; align-items: start"
                      class="pl-2"
                    >
                      <div class="flex-grow">
                        <p class="mb-0">
                          <span class="font-weight-bold">John doe</span>
                          commented on your post
                        </p>
                        <p
                          class="mb-0 text--secondary text-truncate"
                          style="max-width: 200px"
                        >
                          This is the comment preview text
                        </p>
                        <p class="accent--text font-weight-bold mb-0">
                          2 min ago.
                        </p>
                      </div>
                      <v-spacer></v-spacer>
                      <div>
                        <v-avatar class="mt-3 ml-1" color="grey" size="30" tile>
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                          ></v-img>
                        </v-avatar>
                      </div>
                    </div>
                    <div
                      style="flex: 2; display: flex; justify-content: center"
                    >
                      <v-icon size="12" class="mt-4" color="accent"
                        >mdi-circle</v-icon
                      >
                    </div>
                  </div>
                </v-list-item>
                <v-list-item class="pr-0 pl-2">
                  <div
                    style="
                      display: flex;
                      align-items: start;
                      cursor: pointer;
                      width: 100%;
                    "
                    class="my-2"
                  >
                    <div style="flex: 4">
                      <v-badge
                        overlap
                        bordered
                        bottom
                        icon="mdi-heart-plus"
                        offset-x="15"
                        offset-y="15"
                        color="error"
                      >
                        <v-avatar size="48">
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/john.png"
                          ></v-img>
                        </v-avatar>
                      </v-badge>
                    </div>
                    <div
                      style="flex: 18; display: flex; align-items: start"
                      class="pl-2"
                    >
                      <div class="flex-grow">
                        <p class="mb-0">
                          <span class="font-weight-bold">John doe</span>
                          Liked your listing
                        </p>
                        <p
                          class="mb-0 text--secondary text-truncate"
                          style="max-width: 200px"
                        >
                          This is the listing title Lorem ipsum dolor sit amet,
                          consectetur adipisicing elit. Corporis blanditiis et,
                          culpa soluta consequuntur consectetur ea consequatur
                          deleniti vero rem?
                        </p>
                        <p class="accent--text font-weight-bold mb-0">
                          2 min ago.
                        </p>
                      </div>
                      <v-spacer></v-spacer>
                      <div>
                        <v-avatar class="mt-3 ml-1" color="grey" size="30" tile>
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                          ></v-img>
                        </v-avatar>
                      </div>
                    </div>
                    <div
                      style="flex: 2; display: flex; justify-content: center"
                    >
                      <v-icon size="12" class="mt-4" color="accent"
                        >mdi-circle</v-icon
                      >
                    </div>
                  </div>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-expand-transition>
        <v-progress-linear v-show="loading" indeterminate></v-progress-linear>
      </v-expand-transition>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="rounded-xl text-capitalize">Take action</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import NotificationItem from '../blocks/NotificationItem.vue'
import { infoMessage } from '@/utils/messaging'
export default {
  components: { NotificationItem },
  props: {
    socket: {
      type: Object,
      required: true,
    },
    socketsReady: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      menu: false,
      total: 0,
      notifications: [],
      componentKey: 0,
    }
  },
  async fetch() {
    try {
      this.loading = true
      if (!this.$store.getters['auth/user']) {
        this.loading = false
        return
      }
      let res
      if (this.notifications.length) {
        res = await this.$axios.$get(
          `${this.$store.getters.notificationPath}/me/notifications/next?from=${this.notifications[0].notification.createdAt}`
        )
      } else {
        res = await this.$axios.$get(
          `${this.$store.getters.notificationPath}/me/notifications/previous`
        )
      }
      console.log({ res })
      const {
        data: { total, notifications },
      } = res
      this.total = total
      if (this.notifications.length) {
        this.notifications.unshift(...notifications)
      } else {
        this.notifications = notifications
      }
    } catch (error) {
      console.log({ error })
    } finally {
      this.loading = false
    }
  },
  computed: {
    newCount() {
      if (this.notifications.length) {
        return this.notifications.filter((x) => !x.seen).length
      }
      return 0
    },
    showNotifications: {
      get() {
        return this.menu
      },
      set(val) {
        console.log({ val, loggedIn: !!this.$store.getters['auth/user'] })
        if (!this.$store.getters['auth/user'] && val) {
          this.$store.dispatch(
            'ui/showLoginModal',
            { action: 'notification' },
            { root: true }
          )
        } else {
          this.menu = val
        }
      },
    },
  },
  watch: {
    async menu(newVal, old) {
      console.log({ newVal, old })
      if (newVal) {
        await this.$fetch()
        this.componentKey++
      }
      if (old) {
        console.log('mark all as seen')
        if (this.newCount) {
          this.markAllAsSeen()
        }
      }
    },
  },
  fetchOnServer: false,
  async mounted() {
    await this.$fetch()
    if (this.socketsReady) {
      this.socket.on('USER_CONNECTED', (data) => {
        console.log('USER_CONNECTED')
        console.log({ data })
      })
      this.socket.on('NEW_NOTIFICATION', async (data) => {
        console.log('NEW_NOTIFICATION')
        await this.showMessage(data.data.notification)
        this.notifications.unshift(data.data)
        console.log({ data })
      })
      this.socket.on('ALL_NOTIFICATIONS_SEEN', (data) => {
        console.log('ALL_NOTIFICATIONS_SEEN')
        console.log({ data })
        this.notifications.forEach((x) => {
          x.seen = true
        })
      })
      this.socket.on('ALL_NOTIFICATIONS_READ', (data) => {
        console.log('ALL_NOTIFICATIONS_READ')
        console.log({ data })
        this.notifications.forEach((x) => {
          x.seen = true
          x.read = true
        })
      })
      this.socket.on('NOTIFICATION_READ', (data) => {
        console.log('NOTIFICATION_READ')
        console.log({ data })
        this.notifications.forEach((x) => {
          if (x.notificationId === data.notificationId) {
            x.read = true
            x.seen = true
          }
        })
      })
    }
  },
  // async created() {

  // },
  methods: {
    async connectUser() {
      if (this.$store.getters['auth/isLoggedIn']) {
        console.log('Emitting event')
        await this.socket.emit(
          'USER_CONNECTED',
          this.$store.getters['auth/user']
        )
      }
    },
    async showMessage(notification) {
      switch (notification.type) {
        case 'FOLLOWED_YOU': {
          const {
            resourceData: { follower },
          } = notification
          const message = infoMessage({
            text: `<strong>${follower.displayname}</strong> started following you`,
            // title: 'New Follower',
            loading: false,
            timeout: 10000,
            type: null,
            color: 'info',
            avatar: `${this.$store.getters.profilePath}/u/image/${notification.resourceId}`,
            icon: 'follow',
            action: {
              text: 'View Profile',
              type: 'route',
              route: `/profile/${notification.resourceId}`,
            },
          })
          await this.$store.dispatch('ui/showMessage', message, { root: true })
          break
        }

        default:
          break
      }
    },
    markAllAsSeen() {
      this.socket.emit('ALL_NOTIFICATIONS_SEEN', {
        userId: this.$store.getters['auth/user'].userId,
      })
    },
    markAllAsRead() {
      // console.log('Mark all as read')
      this.socket.emit('ALL_NOTIFICATIONS_READ', {
        userId: this.$store.getters['auth/user'].userId,
      })
    },
    clearAllNotifications() {
      console.log('Clear all notifications')
    },
    handleNotification(e) {
      console.log({ e })
    },
  },
}
</script>

<style></style>
