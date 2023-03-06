import Vue from 'vue'

import countFilter from './filters/countFilter';
import camelToTitle from './filters/camelToTitle';

Vue.filter('count', countFilter);
Vue.filter('camelToTitle', camelToTitle)
