<template>
  <div>
    <v-row>
      <v-col v-for="i in 6" :key="`${i}-b`" cols="12" xl="6">
        <PostCardItem class="mb-4" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>