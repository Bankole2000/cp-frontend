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
  async addGifToPost({ commit, rootState, dispatch }, { id, postId, data }) {
    console.log('Creating loading message');
    const message = loadingMessage({ text: 'Adding Gif...' });
    console.log('Dispatching loading message Action');
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      console.log('Formatting URL')
      const url = new URL(`${rootState.env.postPath}/posts/${postId}/media`)
      console.log('Making Request')
      const response = await this.$axios.$post(url.href, { type: 'GIF', id, data })
      console.log({ response })
      if (response.success) {
        await dispatch('handleRequestSuccess', { response, uuid }, { root: true })
        commit('ADD_POST_MEDIA', response.data);
      }
      return response
    } catch (error) {
      console.log({ error });
      return await dispatch('handleRequestError', { error, uuid }, { root: true })
    }
  },
  async addImageToPost({ commit, rootState, state, dispatch }, formData) {
    const message = loadingMessage({ text: 'Uploading Your Image - please wait...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      console.log('Formatting URL')
      const url = new URL(`${rootState.env.postPath}/posts/${state.postInCreation.id}/media`)
      console.log('Making Request')
      const response = await this.$axios.$post(url.href, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log({ response });
      if (response.success) {
        await dispatch('handleRequestSuccess', { response, uuid }, { root: true })
        commit('ADD_POST_MEDIA', response.data);
      }
      return response
    } catch (error) {
      console.log({ error });
      return await dispatch('handleRequestError', { error, uuid }, { root: true })
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
        commit('SET_POST_IN_CREATION', null);
        await dispatch('handleRequestSuccess', { response, uuid }, { root: true })
      }
      return response
    } catch (error) {
      console.log({ error });
      return await dispatch('handleRequestError', { error, uuid }, { root: true })
    }
  },
  async publishComment({ rootState, dispatch }, { postId, content = "", parentCommentId = null }) {
    console.log('Creating loading message');
    const message = loadingMessage({ text: `publishing your ${parentCommentId ? 'comment' : 'reply'}...` });
    console.log('Dispatching loading message Action');
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    let url;
    try {
      if (parentCommentId) {
        url = new URL(`${rootState.env.postPath}/posts/${postId}/comments/${parentCommentId}/replies`);
      } else {
        url = new URL(`${rootState.env.postPath}/posts/${postId}/comments/`)
      }
      console.log('Making Request')
      const response = await this.$axios.$post(url.href, { content })
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