<template>
  <v-menu
    open-on-hover
    bottom
    nudge-left="40%"
    content-class="elevated-light rounded-lg"
    offset-y
  >
    <template #activator="{ on, attrs }">
      <span
        v-bind="attrs"
        class="font-weight-bold"
        style="color: var(--primary)"
        v-on="on"
        >@{{ username }}
      </span>
    </template>
    <v-card class="rounded-lg elevated-light">
      <v-card-title></v-card-title>
      <v-card-text> @{{ username }} Details </v-card-text>
      <v-card-actions></v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required: true,
    },
  },
}
</script>

<style></style>
