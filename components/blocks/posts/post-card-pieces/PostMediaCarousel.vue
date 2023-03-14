<template>
  <v-carousel
    :continuous="false"
    :cycle="false"
    :show-arrows="true"
    hide-delimiter-background
    height="auto"
  >
    <v-carousel-item v-for="(m, i) in media" :key="i">
      <v-img
        v-if="m.type === 'IMAGE'"
        :src="m.imageUrl"
        :aspect-ratio="1.2"
        cover
      >
        <template #placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              size="64"
              color="primary lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: ['media'],
  data() {
    return {
      // media: [
      //   {
      //     id: '68pmic98iq43lzl',
      //     type: 'IMAGE',
      //     imageUrl:
      //       'http://localhost:8080/api/files/08tzclgz3oh38j1/68pmic98iq43lzl/screenshot_2023_02_09_180714_Es3fIrywYz.png',
      //     image: 'screenshot_2023_02_09_180714_Es3fIrywYz.png',
      //     order: 0,
      //     data: {},
      //     post: 'aogrs53ffyflrso',
      //     created: '2023-02-19T22:21:46.927Z',
      //     updated: '2023-02-19T22:23:14.214Z',
      //   },
      //   {
      //     id: 'fuacqy7myt3dciv',
      //     type: 'IMAGE',
      //     imageUrl:
      //       'http://localhost:8080/api/files/08tzclgz3oh38j1/fuacqy7myt3dciv/screenshot_2023_02_09_180440_GJKdBGTT38.png',
      //     image: 'screenshot_2023_02_09_180440_GJKdBGTT38.png',
      //     order: 1,
      //     data: {},
      //     post: 'aogrs53ffyflrso',
      //     created: '2023-02-19T12:41:14.038Z',
      //     updated: '2023-02-19T22:23:14.216Z',
      //   },
      //   {
      //     id: '1xtdku5z68thb78',
      //     type: 'IMAGE',
      //     imageUrl:
      //       'http://localhost:8080/api/files/08tzclgz3oh38j1/1xtdku5z68thb78/screenshot_2023_02_09_180315_e0AHzJNGhG.png',
      //     image: 'screenshot_2023_02_09_180315_e0AHzJNGhG.png',
      //     order: 2,
      //     data: {},
      //     post: 'aogrs53ffyflrso',
      //     created: '2023-02-19T21:11:15.176Z',
      //     updated: '2023-02-19T22:23:14.216Z',
      //   },
      // ],
    }
  },
}
</script>

<style></style>
