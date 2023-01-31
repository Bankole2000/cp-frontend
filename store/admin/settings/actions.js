import { loadingMessage, errorMessage, successMessage } from "~/utils/messaging";

export default {
  async getListingTypes({ commit, rootState }) {
    try {
      const response = await this.$axios.$get(`${rootState.env.listingPath}/settings/listing-types`);
      console.log({ response });
      if (response.success) {
        commit('SET_LISTING_TYPES', response.data)
      } else {
        commit('SET_LISTING_TYPES', [])
      }
    } catch (error) {
      console.log({ error })
    }
  },
  async createListingType({ commit, rootState, dispatch }, data) {
    const message = loadingMessage({ text: 'Creating Listing Type...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$post(`${rootState.env.listingPath}/settings/listing-types`, data);
      if (response.success) {
        commit('ADD_LISTING_TYPE', response.data);
        return await dispatch('handleRequestSuccess', { response, uuid })
      }
      console.log({ response });
    } catch (error) {
      console.log({ error });
      return await dispatch('handleRequestError', { error, uuid })
    }
  },
  async updateListingType({ commit, dispatch, rootState }, { id, data }) {
    console.log({ id, data });
    const message = loadingMessage({ text: 'Updating Listing Type...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$patch(`${rootState.env.listingPath}/settings/listing-types/${id}${data.useNewKey ? '?newkey=' : ''}${data.newkey}`, data)
      console.log({ response });
      if (response.success) {
        const { useNewKey, id: oldKey } = data
        commit('UPDATE_LISTING_TYPE', { typeData: response.data, oldKey, useNewKey });
        return await dispatch('handleRequestSuccess', { response, uuid })
      }
    } catch (error) {
      console.log({ error })
      return await dispatch('handleRequestError', { error, uuid })
    }
  },
  async deleteListingType({ commit, dispatch, rootState }, id) {
    const message = loadingMessage({ text: 'Deleting Listing Type...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$delete(`${rootState.env.listingPath}/settings/listing-types/${id}`);
      console.log({ response });
      if (response.success) {
        commit('REMOVE_LISTING_TYPE', response.data);
        return await dispatch('handleRequestSuccess', { response, uuid })
      }
    } catch (error) {
      console.log({ error })
      return await dispatch('handleRequestError', { error, uuid })
    }
  },
  async getAmenityCategories({ commit, rootState }) {
    try {
      const response = await this.$axios.$get(`${rootState.env.listingPath}/settings/amenity-categories`);
      console.log({ response });
      if (response.success) {
        commit('SET_AMENITY_CATEGORIES', response.data)
      } else {
        commit('SET_AMENITY_CATEGORIES', [])
      }
    } catch (error) {
      console.log({ error })
    }
  },
  async createAmenityCategory({ commit, rootState, dispatch }, data) {
    const message = loadingMessage({ text: 'Creating Amenity Category...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$post(`${rootState.env.listingPath}/settings/amenity-categories`, data);
      if (response.success) {
        commit('ADD_AMENITY_CATEGORY', response.data);
        return await dispatch('handleRequestSuccess', { response, uuid })
      }
      console.log({ response });
    } catch (error) {
      console.log({ error });
      return await dispatch('handleRequestError', { error, uuid })
    }
  },
  async updateAmenityCategory({ commit, dispatch, rootState }, { id, data }) {
    console.log({ id, data });
    const message = loadingMessage({ text: 'Updating Amenity Category...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$patch(`${rootState.env.listingPath}/settings/amenity-categories/${id}${data.useNewKey ? '?newkey=' : ''}${data.newkey}`, data)
      console.log({ response });
      if (response.success) {
        const { useNewKey, id: oldKey } = data
        commit('UPDATE_AMENITY_CATEGORY', { categoryData: response.data, oldKey, useNewKey });
        if (useNewKey) {
          commit('UPDATE_CATEGORIES_IN_AMENITIES', { oldCategory: oldKey, newCategory: data.newkey })
        }
        return await dispatch('handleRequestSuccess', { response, uuid })
      }
    } catch (error) {
      console.log({ error })
      return await dispatch('handleRequestError', { error, uuid })
    }
  },
  async deleteAmenityCategory({ commit, dispatch, rootState }, id) {
    const message = loadingMessage({ text: 'Deleting Amenity Category...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$delete(`${rootState.env.listingPath}/settings/amenity-categories/${id}`);
      console.log({ response });
      if (response.success) {
        commit('REMOVE_AMENITY_CATEGORY', response.data.amenityCategory);
        return await dispatch('handleRequestSuccess', { response, uuid })
      }
    } catch (error) {
      console.log({ error })
      return await dispatch('handleRequestError', { error, uuid })
    }
  },
  async getAllAmenities({ commit, rootState }) {
    try {
      const response = await this.$axios.$get(`${rootState.env.listingPath}/settings/amenities`);
      console.log({ response });
      if (response.success) {
        commit('SET_AMENITIES', response.data)
      } else {
        commit('SET_AMENITIES', [])
      }
    } catch (error) {
      console.log({ error })
    }
  },
  async createAmenity({ commit, rootState, dispatch }, data) {
    const message = loadingMessage({ text: 'Creating Listing Type...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$post(`${rootState.env.listingPath}/settings/amenity-categories/${data.amenityCategory}/amenities`, data);
      if (response.success) {
        commit('ADD_AMENITY', response.data);
        commit('UPDATE_CATEGORY_AMENITY_COUNT', { category: response.data.amenityCategory, amount: 1 })
        return await dispatch('handleRequestSuccess', { response, uuid })
      }
      console.log({ response });
    } catch (error) {
      console.log({ error });
      return await dispatch('handleRequestError', { error, uuid })
    }
  },
  async updateAmenity({ commit, dispatch, rootState }, { id, data }) {
    console.log({ id, data });
    const message = loadingMessage({ text: 'Updating Listing Type...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$patch(`${rootState.env.listingPath}/settings/amenity-categories/${data.amenityCategory}/amenities/${id}${data.useNewKey ? '?newkey=' : ''}${data.newkey}`, data)
      console.log({ response });
      if (response.success) {
        const { useNewKey, id: oldKey } = data
        commit('UPDATE_AMENITY', { amenityData: response.data, oldKey, useNewKey });
        return await dispatch('handleRequestSuccess', { response, uuid })
      }
    } catch (error) {
      console.log({ error })
      return await dispatch('handleRequestError', { error, uuid })
    }
  },
  async deleteAmenity({ commit, dispatch, rootState }, data) {
    const message = loadingMessage({ text: 'Deleting Listing Type...' });
    const uuid = await dispatch('ui/showMessage', message, { root: true });
    try {
      const response = await this.$axios.$delete(`${rootState.env.listingPath}/settings/amenity-categories/${data.amenityCategory}/amenities/${data.amenity}`);
      console.log({ response });
      if (response.success) {
        commit('REMOVE_AMENITY', response.data.amenity);
        commit('UPDATE_CATEGORY_AMENITY_COUNT', { category: response.data.amenityCategory, amount: -1 })
        return await dispatch('handleRequestSuccess', { response, uuid })
      }
    } catch (error) {
      console.log({ error })
      return await dispatch('handleRequestError', { error, uuid })
    }
  },
  async handleRequestError({ commit, dispatch }, { error, uuid }) {
    console.log({ error, response: error.response })
    if (!error) {
      return null;
    }
    if (!error.response) {
      const text = error.message ? error.message : 'Something went wrong'
      if (uuid) {
        await dispatch('ui/updateMessage', { uuid, ...errorMessage({ text }) }, { root: true })
      } else {
        const message = errorMessage({ text, timeout: 3000 });
        await dispatch('ui/showMessage', message, { root: true });
      }
      return error
    }
    if (error.response.data) {
      const text = error.response.data.message;
      if (uuid) {
        await dispatch('ui/updateMessage', {
          uuid,
          ...errorMessage({ text })
        }, { root: true })
      } else {
        const message = errorMessage({ text, timeout: 3000 });
        await dispatch('ui/showMessage', message, { root: true });
      }
      return error.response.data
    }
    const text = error.message ? error.message : 'Something went wrong'
    if (uuid) {
      await dispatch('ui/updateMessage', { uuid, ...errorMessage({ text }) }, { root: true })
    } else {
      const message = errorMessage({ text, timeout: 3000 });
      await dispatch('ui/showMessage', message, { root: true });
    }
    return error
  },
  async handleRequestSuccess({ dispatch }, { response, uuid }) {
    await dispatch('ui/updateMessage', {
      uuid,
      ...successMessage({ text: `${response.message}` })
    }, { root: true })
    return response;
  }
}