<template>
  <div>
    <div
      style="width: 100%; background-color: grey; height: 10vh; position: fixed"
    >
      Some Content
    </div>
    <v-container class="pt-16">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-card flat class="pa-4 elevated-light">
            something
            <HoverButton
              text="button text"
              classes="text-capitalize"
              @click="youClicked"
            />
          </v-card>
          <div style="height: 300vh">
            <h1>This is the admin route</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  methods: {
    youClicked() {
      console.log('you clicked')
    },
  },
}
</script>

<style></style>
