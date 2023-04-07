export default {
  SET_POST_IN_CREATION(state, data) {
    state.postInCreation = data
  },
  ADD_POST_MEDIA(state, data) {
    state.postInCreation.postMedia.push(data);
  }
}