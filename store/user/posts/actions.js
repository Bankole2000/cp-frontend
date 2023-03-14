import {
  loadingMessage,
  // errorMessage, 
  // successMessage 
} from "~/utils/messaging";

export default {
  async createPost({ commit, rootState }) {
    try {
      const response = await this.$axios.$get(`${rootState.env.postPath}/posts/create`)
      console.log({ response });
      if (response.success) {
        commit('SET_POST_IN_CREATION', response.data);
      }
      return response;
    } catch (error) {
      console.log({ error })
    }
  },

  async publishPost({ commit, rootState, dispatch }, { caption, autoModerate, contentWarning, publishAt, postId }) {
    console.log('Creating loading message');
    const message = loadingMessage({ text: 'Posting...' });
    console.log('Dispatching loading message Action');
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      console.log('Formatting URL')
      const url = new URL(`${rootState.env.postPath}/posts/${postId}/publish`)
      console.log('Making Request')
      const response = await this.$axios.$post(url.href, { caption, autoModerate, contentWarning, publishAt })
      console.log({ response })
      if (response.success) {
        await dispatch('handleRequestSuccess', { response, uuid }, { root: true })
      }
      return response
    } catch (error) {
      console.log({ error });
      return await dispatch('handleRequestError', { error, uuid }, { root: true })
    }
  }
}