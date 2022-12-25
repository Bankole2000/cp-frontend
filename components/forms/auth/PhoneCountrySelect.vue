<template>
  <v-autocomplete
    solo
    :items="allPhoneCountryCodes"
    item-text="name"
    v-model="selectedCountryCode"
    return-object
    :menu-props="{ offsetY: true, auto: true }"
    label="Country Code"
    @change="selectPhoneCountryCode"
  >
    <template #selection="{ item }">
      <div style="display: flex; align-items: center">
        <div
          class="mx-2"
          :style="{ backgroundImage: `url(${item.smallFlag})` }"
          style="
            width: 22px;
            height: 22px;
            background-position: 50% 50%;
            border-radius: 50%;
          "
        ></div>

        <p class="mb-0">
          {{ item.countryCode }}&nbsp;<span class="grey--text"
            >({{ item.phoneCode }})</span
          >
        </p>
      </div>
    </template>
    <template #item="{ item }">
      <v-list-item-avatar>
        <!-- <img :src="data.item.flag" /> -->
        <div
          class="mx-2"
          :style="{ backgroundImage: `url(${item.smallFlag})` }"
          style="
            width: 20px;
            height: 20px;
            background-position: 50% 50%;
            border-radius: 50%;
          "
        ></div>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.phoneCode }}</v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['countryCode'],
  data() {
    return {
      selectedCountryCode: null,
    }
  },
  computed: {
    ...mapGetters({
      allPhoneCountryCodes: 'settings/allCountryCodes',
    }),
  },
  mounted() {
    if (this.allPhoneCountryCodes.length > 0) {
      this.setPreSelectedCountryCode()
      this.selectPhoneCountryCode()
      return
    }
    this.getAllCountryCodes().then(() => {
      this.setPreSelectedCountryCode()
      this.selectPhoneCountryCode()
    })
  },
  methods: {
    ...mapActions({
      getAllCountryCodes: 'settings/getAllCountryCodes',
    }),
    selectPhoneCountryCode() {
      this.$emit('phoneCountryCodeSelected', this.selectedCountryCode)
    },
    setPreSelectedCountryCode() {
      if (this.countryCode) {
        this.selectedCountryCode = this.allPhoneCountryCodes.find(
          (item) => item.countryCode === this.countryCode
        )
        return
      }
      this.selectedCountryCode = this.allPhoneCountryCodes.find(
        (item) => item.countryCode === 'NG'
      )
    },
  },
}
</script>

<style>
</style>