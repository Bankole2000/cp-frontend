<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex align-center">
          <h1 class="display-2 mb-0 ml-4 mt-6">Welcome @username</h1>
          <v-switch
            v-model="$vuetify.theme.dark"
            hide-details
            class="mx-4"
          ></v-switch>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(metric, i) in metrics"
        :key="i"
        cols="12"
        xl="2"
        lg="3"
        md="4"
        sm="6"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            style="cursor: pointer; transition: all 0.2s ease-in-out"
            flat
            class="rounded-lg px-4 py-3"
            :class="hover ? `${metric.gradient} elevated-light` : ''"
          >
            <div class="d-flex align-center">
              <div>
                <p
                  class="mb-0"
                  :class="{ 'white--text': hover, 'text--secondary': !hover }"
                >
                  {{ metric.metric }}
                </p>
                <p
                  :class="{ 'white--text': hover }"
                  class="display-2 mb-0 font-weight-medium"
                >
                  {{ metric.value | count }}
                </p>
              </div>
              <v-spacer></v-spacer>
              <div>
                <v-avatar
                  size="70"
                  :color="$vuetify.theme.dark ? '#121212' : '#f0efef'"
                >
                  <v-icon :color="hover ? metric.color : ''" size="40">{{
                    metric.icon
                  }}</v-icon>
                </v-avatar>
              </div>
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['checkAuth', 'requireUser'],
  data() {
    return {
      metrics: [
        {
          metric: 'Published Posts',
          value: 90,
          icon: 'mdi-post',
          gradient: 'bg-gradient-right-primary-accent',
          color: 'accent',
        },
        {
          metric: 'Published Listings',
          value: 10,
          icon: 'mdi-home-roof',
          gradient: 'bg-gradient-right-primary-info',
          color: 'info',
        },
        // {
        //   metric: 'Personal Ads',
        //   value: 5,
        //   icon: 'mdi-bullhorn-outline',
        //   gradient: 'bg-gradient-right-primary-success',
        //   color: 'success',
        // },
        // {
        //   metric: 'Published Services',
        //   value: 10,
        //   icon: 'mdi-account-hard-hat-outline',
        //   gradient: 'bg-gradient-right-primary-error',
        //   color: 'error',
        // },
        {
          metric: 'Bookings (as host)',
          value: 19,
          icon: 'mdi-calendar-account',
          gradient: 'bg-gradient-right-primary-warning',
          color: 'warning',
        },
        // {
        //   metric: 'Service Bookings',
        //   value: 20,
        //   icon: 'mdi-receipt-text',
        //   gradient: 'bg-gradient-right-info-accent',
        //   color: 'accent',
        // },
        {
          metric: 'Bookings (as guest)',
          value: 300,
          icon: 'mdi-calendar-check',
          gradient: 'bg-gradient-right-info-error',
          color: 'error',
        },
        // {
        //   metric: 'Booked Services',
        //   value: 10,
        //   icon: 'mdi-receipt-text-check-outline',
        //   gradient: 'bg-gradient-right-info-warning',
        //   color: 'warning',
        // },
        {
          metric: 'Promotions',
          value: 2,
          icon: 'mdi-finance',
          gradient: 'bg-gradient-right-info-success',
          color: 'success',
        },
        {
          metric: 'Transactions',
          value: 1880,
          icon: 'mdi-currency-usd',
          gradient: 'bg-gradient-right-info-primary',
          color: 'primary',
        },
      ],
    }
  },
  mounted() {
    console.log('Dashboard mounted')
    this.$store.commit('ui/toggleUserDashboardLeftNav', true)
  },
}
</script>

<style></style>
