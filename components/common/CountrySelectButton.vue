<template>
  <v-menu
    bottom
    :close-on-content-click="false"
    left
    content-class="elevated-light rounded-xl"
  >
    <template #activator="{ on: menu, attrs }">
      <v-tooltip top>
        <template #activator="{ on: tooltip }">
          <v-card
            color="warning"
            v-bind="attrs"
            class="
              rounded-xl
              py-1
              pl-1
              pr-2
              mr-4
              d-flex
              align-center
              elevated-light
            "
            v-on="{ ...tooltip, ...menu }"
          >
            <div
              class="ma-1"
              :style="{
                backgroundImage: `url(${require('@/assets/img/flags/32x32/us.png')})`,
              }"
              style="
                width: 22px;
                height: 22px;
                background-position: 50% 50%;
                border-radius: 50%;
              "
            ></div>

            <!-- <v-avatar size="36" class="mr-2">
              <div
                style="border-radius: 50%"
                :src="require(`@/assets/img/flags/32x32/us.png`)"
                alt="US"
              />
            </v-avatar> -->
          </v-card>
        </template>
        <span>Search Location Settings</span>
      </v-tooltip>
    </template>

    <v-card class="rounded-xl">
      <v-card-title>
        <div>Search Location Settings</div>
      </v-card-title>
      <v-card-text> </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="() => {}">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
  }),
}
</script>

<style>
</style>