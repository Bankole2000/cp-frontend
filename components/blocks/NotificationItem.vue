<template>
  <div>
    <FollowNotification
      v-if="notification.notification.type === 'FOLLOWED_YOU'"
      :notification="notification.notification"
      :seen="notification.seen"
      :read="notification.read"
      @click="handleNotification"
    />
  </div>
</template>

<script>
import FollowNotification from './notifications/FollowNotification.vue'
export default {
  components: {
    FollowNotification,
  },
  props: ['notification', 'socket'],
  methods: {
    async handleNotification() {
      console.log('Handling notification')
      console.log({ notification: this.notification.notification })
      const {
        userId,
        notificationId,
        notification: { type, resourceData },
      } = this.notification
      await this.socket.emit('NOTIFICATION_READ', { userId, notificationId })
      switch (type) {
        case 'FOLLOWED_YOU': {
          const { follower } = resourceData
          try {
            this.$router.push({ path: `/profile/@${follower.username}` })
          } catch (error) {
            console.log({ error })
          }
          break
        }
        default:
          break
      }
    },
  },
}
</script>

<style></style>
