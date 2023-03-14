<!-- eslint-disable vue/no-v-for-template-key -->
<template>
  <div class="contacts">
    <v-list subheader class="pb-0">
      <!-- <v-subheader>Recent chat</v-subheader> -->
      <v-list-item-group v-model="activeItem">
        <div v-for="(item, index) in items" :key="index">
          <v-list-item class="pl-0" @click="showChat">
            <v-badge
              bordered
              bottom
              color="green accent-4"
              dot
              offset-x="25"
              offset-y="20"
            >
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>
            </v-badge>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle
                >I was just saying Hi really</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-action class="ml-n1">
              <v-list-item-action-text>yesterday</v-list-item-action-text>
              <v-chip class="ma-0" color="primary" x-small> 22 </v-chip>
            </v-list-item-action>
          </v-list-item>
          <ConversationModal ref="chat" />
          <v-divider></v-divider>
        </div>
      </v-list-item-group>
    </v-list>

    <v-divider></v-divider>
  </div>
</template>

<script>
import ConversationModal from './chat/ConversationModal.vue'
export default {
  components: {
    ConversationModal,
  },
  data: () => ({
    activeItem: 0,
    itemsa: [
      { title: 'Home', icon: 'mdi-home-city' },
      { title: 'My Account', icon: 'mdi-account' },
      { title: 'Users', icon: 'mdi-account-group-outline' },
    ],
    items: [
      {
        active: true,
        title: 'Jason Oner',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      },
      {
        active: true,
        title: 'Ranee Carlson',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      },
      {
        title: 'Cindy Baker',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      },
      {
        title: 'Ali Connors',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      },
      {
        active: true,
        title: 'Jason Oner',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      },
      {
        active: true,
        title: 'Ranee Carlson',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      },
      {
        title: 'Cindy Baker',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      },
      {
        title: 'Ali Connors',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      },
      {
        active: true,
        title: 'Jason Oner',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      },
      {
        active: true,
        title: 'Ranee Carlson',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      },
      {
        title: 'Cindy Baker',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      },
      {
        title: 'Ali Connors',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      },
      {
        active: true,
        title: 'Jason Oner',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      },
      {
        active: true,
        title: 'Ranee Carlson',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      },
      {
        title: 'Cindy Baker',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      },
      {
        title: 'Ali Connors',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      },
    ],
  }),
  methods: {
    showChat(val) {
      this.$refs.chat.show(val)
    },
  },
}
</script>

<style></style>
