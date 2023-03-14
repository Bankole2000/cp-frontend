<template>
  <div class="create-post-page">
    <v-card class="pa-2 transparent" flat>
      <CreatePostForm />
    </v-card>
  </div>
</template>

<script>
import CreatePostForm from '~/components/forms/posts/CreatePostForm.vue'
export default {
  components: {
    CreatePostForm,
  },
}
</script>

<style></style>
