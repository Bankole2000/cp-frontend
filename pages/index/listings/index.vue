<template>
  <v-container>
    <v-row>
      <v-col cols="7">
        <ListingCardItem v-for="i in 5" :key="i" class="mb-4" />
      </v-col>
      <v-col cols="5">
        <div
          style="
            position: sticky;
            left: 20px;
            right: 60px;
            bottom: 5px;
            top: 80px;
          "
        >
          <v-card class="elevated-light rounded-xl mb-4">
            <v-card-title>
              <div class="d-flex align-center">
                <CountrySelectButton />
                <v-textarea
                  placeholder="Search By City or State"
                  rows="1"
                  prepend-inner-icon="mdi-magnify"
                  auto-grow
                  hide-details
                  filled
                  dense
                  rounded
                  single-line
                ></v-textarea>
              </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>Card Text</v-card-text>
          </v-card>
          <v-card class="elevated-light rounded-xl mb-4">
            <v-card-title>Trending</v-card-title>
          </v-card>
          <SuggestedProfilesCard />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
}
</script>

<style>
</style>