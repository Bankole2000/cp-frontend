import Vue from "vue";
import Croppa from 'vue-croppa';


import HoverButton from '@/components/common/HoverButton.vue';
import PhoneCountrySelect from '@/components/common/PhoneCountrySelect.vue';
import ListingCardItem from '@/components/blocks/ListingCardItem.vue';
import OfferCardItem from '@/components/blocks/OfferCardItem.vue';
import ListingPreviewModal from '@/components/modals/ListingPreviewModal.vue';
import ChatContactsModal from '@/components/modals/ChatContactsModal.vue';
import CountrySelectButton from '@/components/common/CountrySelectButton.vue';
import PostCardItem from '@/components/blocks/PostCardItem.vue';
import SuggestedProfilesCard from '@/components/common/SuggestedProfiles.vue';
import verifyOTPForm from '@/components/common/verifyOTPForm.vue';
import NavButton from '@/components/common/NavButton.vue';

Vue.component('HoverButton', HoverButton);
Vue.component('PhoneCountrySelect', PhoneCountrySelect);
Vue.component('ListingCardItem', ListingCardItem);
Vue.component('OfferCardItem', OfferCardItem);
Vue.component('ListingPreviewModal', ListingPreviewModal);
Vue.component('ChatContactsModal', ChatContactsModal);
Vue.component('CountrySelectButton', CountrySelectButton);
Vue.component('PostCardItem', PostCardItem);
Vue.component('SuggestedProfilesCard', SuggestedProfilesCard);
Vue.component('VerifyOTPForm', verifyOTPForm);
Vue.component('NavButton', NavButton);
// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Croppa', Croppa.component);
