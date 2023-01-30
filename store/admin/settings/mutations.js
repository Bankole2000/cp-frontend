export default {
  SET_LISTING_TYPES(state, payload) {
    if (payload) {
      state.listingTypes = payload;
      return;
    }
    state.listingTypes = [];
  },

  REMOVE_LISTING_TYPE(state, id) {
    const index = state.listingTypes.findIndex(type => type.listingType === id)
    if (index) {
      state.listingTypes.splice(index, 1);
    }
  },

  ADD_LISTING_TYPE(state, type) {
    state.listingTypes.push(type);
  },

  UPDATE_LISTING_TYPE(state, { typeData, useNewKey, oldKey }) {
    console.log({ typeData })
    const index = useNewKey
      ? state.listingTypes.findIndex(type => type.listingType === oldKey)
      : state.listingTypes.findIndex(type => type.listingType === typeData.listingType)
    console.log({ index });
    if (index > -1) {
      state.listingTypes.splice(index, 1, typeData);
    }
  },

  SET_LISTING_PURPOSES(state, payload) {
    if (payload) {
      state.listingPurposes = payload;
    }
    state.listingPurposes = [];
  },

  REMOVE_LISTING_PURPOSE(state, id) {
    const index = state.listingPurposes.find(purpose => purpose.listingPurpose === id)
    if (index) {
      state.listingPurposes.splice(index, 1);
    }
  },

  ADD_LISTING_PURPOSE(state, purpose) {
    state.listingPurposes.push(purpose);
  },

  UPDATE_LISTING_PURPOSE(state, purposeData) {
    const index = state.listingPurposes.find(purpose => purpose.listingPurpose === purposeData.listingPurpose);
    if (index) {
      for (const field in purposeData) {
        state.listingPurposes[index][field] = purposeData[field];
      }
    }
  },

  SET_PURPOSE_SUBGROUPS(state, payload) {
    if (payload) {
      state.purposeSubgroups = payload;
    }
    state.purposeSubgroups = [];
  },

  REMOVE_PURPOSE_SUBGROUP(state, id) {
    const index = state.purposeSubgroups.find(subgroup => subgroup.purposeSubgroup === id)
    if (index) {
      state.purposeSubgroups.splice(index, 1);
    }
  },

  ADD_PURPOSE_SUBGROUP(state, subgroup) {
    state.purposeSubgroups.push(subgroup);
  },

  UPDATE_PURPOSE_SUBGROUP(state, subgroupData) {
    const index = state.purposeSubgroups.find(subgroup => subgroup.purposeSubgroup === subgroupData.purposeSubgroup);
    if (index) {
      for (const field in subgroupData) {
        state.purposeSubgroups[index][field] = subgroupData[field];
      }
    }
  },

  SET_AMENITY_CATEGORIES(state, payload) {
    if (payload) {
      state.amenityCategories = payload;
    }
    state.amenityCategories = [];
  },

  REMOVE_AMENITY_CATEGORY(state, id) {
    const index = state.amenityCategories.find(category => category.amenityCategory === id)
    if (index) {
      state.amenityCategories.splice(index, 1);
    }
  },

  ADD_AMENITY_CATEGORY(state, category) {
    state.amenityCategories.push(category);
  },

  UPDATE_AMENITY_CATEGORY(state, categoryData) {
    const index = state.amenityCategories.find(category => category.amenityCategory === categoryData.amenityCategory);
    if (index) {
      for (const field in categoryData) {
        state.amenityCategories[index][field] = categoryData[field];
      }
    }
  },

  SET_AMENITIES(state, payload) {
    if (payload) {
      state.amenities = payload;
    }
    state.amenities = [];
  },

  REMOVE_AMENITY(state, id) {
    const index = state.amenities.find(amenity => amenity.amenity === id)
    if (index) {
      state.amenities.splice(index, 1);
    }
  },

  ADD_AMENITY(state, amenity) {
    state.amenities.push(amenity);
  },

  UPDATE_AMENITY(state, amenityData) {
    const index = state.amenities.find(amenity => amenity.amenity === amenityData.amenity);
    if (index) {
      for (const field in amenityData) {
        state.amenities[index][field] = amenityData[field];
      }
    }
  },

  SET_HOUSE_RULES(state, payload) {
    if (payload) {
      state.houseRules = payload;
    }
    state.houseRules = [];
  },

  REMOVE_HOUSE_RULE(state, id) {
    const index = state.houseRules.find(houseRule => houseRule.houseRule === id)
    if (index) {
      state.houseRules.splice(index, 1);
    }
  },

  ADD_HOUSE_RULE(state, houseRule) {
    state.houseRules.push(houseRule);
  },

  UPDATE_HOUSE_RULE(state, houseRuleData) {
    const index = state.houseRules.find(houseRule => houseRule.houseRule === houseRuleData.houseRule);
    if (index) {
      for (const field in houseRuleData) {
        state.houseRules[index][field] = houseRuleData[field];
      }
    }
  },
}