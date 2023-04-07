import { NimblePicker, Picker } from 'emoji-mart-vue'
import Vue from 'vue'

const EmojiPicker = {
  install(Vue, options) {
    // eslint-disable-next-line vue/multi-word-component-names
    Vue.component('Picker', Picker)
    Vue.component('NimblePicker', NimblePicker)
  }
}

Vue.use(EmojiPicker)

export default EmojiPicker