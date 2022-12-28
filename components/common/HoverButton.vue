<template>
  <v-hover v-slot="{ hover }">
    <v-btn
      :rounded="rounded"
      :class="
        $vuetify.theme.dark
          ? `${classes} bg-${color}-dk`
          : `${classes} bg-${color}-lt`
      "
      :x-small="size === 'xs'"
      :small="size === 'sm'"
      :medium="size === 'md'"
      :large="size === 'lg'"
      :x-large="size === 'xl'"
      style="transition: all 0.2s ease-in-out"
      :disabled="disabled"
      :icon="icon ? true : false"
      :block="block"
      :text="!hover"
      :depressed="hover"
      :color="color"
      @click="$emit('click')"
    >
      <!-- :color="color" -->
      <v-icon v-if="leftIcon" :left="true" :class="leftIcon">{{
        leftIcon
      }}</v-icon>
      <v-icon v-if="icon">{{ icon }}</v-icon>
      <span
        v-else
        :class="{
          'grey--text': color === 'secondary' && $vuetify.theme.dark && !hover,
        }"
        style="transition: all 0.1s ease-in-out"
      >
        {{ text }}
      </span>
      <v-icon v-if="rightIcon" :right="true" :class="rightIcon">{{
        rightIcon
      }}</v-icon>
    </v-btn>
  </v-hover>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'button',
    },
    color: {
      type: String,
      default: 'primary',
    },
    rightIcon: {
      type: String,
      default: null,
    },
    leftIcon: {
      type: String,
      default: null,
    },
    classes: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    bgColor() {
      return `bg-${this.color}-lt`
    },
  },
}
</script>

<style>
</style>