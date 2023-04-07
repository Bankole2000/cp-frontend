export default {
  postInCreation(state) {
    return state.postInCreation
  },
  postInCreationMedia(state) {
    return state.postInCreation ? state.postInCreation.postMedia : [];
  }
}