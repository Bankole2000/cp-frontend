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
    if (index > -1) {
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
      return;
    }
    state.listingPurposes = [];
  },

  REMOVE_LISTING_PURPOSE(state, id) {
    const index = state.listingPurposes.findIndex(purpose => purpose.listingPurpose === id)
    if (index > -1) {
      state.listingPurposes.splice(index, 1);
    }
  },

  ADD_LISTING_PURPOSE(state, purpose) {
    state.listingPurposes.push(purpose);
  },

  UPDATE_LISTING_PURPOSE(state, { purposeData, useNewKey, oldKey }) {
    console.log({ purposeData })
    const index = useNewKey
      ? state.listingPurposes.findIndex(type => type.listingPurpose === oldKey)
      : state.listingPurposes.findIndex(type => type.listingPurpose === purposeData.listingPurpose)
    console.log({ index });
    if (index > -1) {
      state.listingPurposes.splice(index, 1, purposeData);
    }
  },

  SET_PURPOSE_SUBGROUPS(state, payload) {
    if (payload) {
      state.purposeSubgroups = payload;
      return;
    }
    state.purposeSubgroups = [];
  },

  REMOVE_PURPOSE_SUBGROUP(state, id) {
    const index = state.purposeSubgroups.findIndex(subgroup => subgroup.purposeSubgroup === id)
    if (index > -1) {
      state.purposeSubgroups.splice(index, 1);
    }
  },

  ADD_PURPOSE_SUBGROUP(state, subgroup) {
    state.purposeSubgroups.push(subgroup);
  },

  UPDATE_PURPOSE_SUBGROUP(state, { subgroupData, useNewKey, oldKey }) {
    console.log({ subgroupData })
    const index = useNewKey
      ? state.purposeSubgroups.findIndex(subgroup => subgroup.purposeSubgroup === oldKey)
      : state.purposeSubgroups.findIndex(subgroup => subgroup.purposeSubgroup === subgroupData.purposeSubgroup)
    console.log({ index });
    if (index > -1) {
      state.purposeSubgroups.splice(index, 1, subgroupData);
    }
  },

  SET_AMENITY_CATEGORIES(state, payload) {
    if (payload) {
      state.amenityCategories = payload;
      return;
    }
    state.amenityCategories = [];
  },

  REMOVE_AMENITY_CATEGORY(state, id) {
    const index = state.amenityCategories.findIndex(category => category.amenityCategory === id)
    if (index > -1) {
      state.amenityCategories.splice(index, 1);
    }
  },

  ADD_AMENITY_CATEGORY(state, category) {
    state.amenityCategories.push(category);
  },

  UPDATE_AMENITY_CATEGORY(state, { categoryData, useNewKey, oldKey }) {
    console.log({ categoryData })
    const index = useNewKey
      ? state.amenityCategories.findIndex(type => type.amenityCategory === oldKey)
      : state.amenityCategories.findIndex(type => type.amenityCategory === categoryData.amenityCategory)
    console.log({ index });
    if (index > -1) {
      state.amenityCategories.splice(index, 1, categoryData);
    }
  },

  SET_AMENITIES(state, payload) {
    if (payload) {
      state.amenities = payload;
      return;
    }
    state.amenities = [];
  },

  REMOVE_AMENITY(state, id) {
    const index = state.amenities.findIndex(amenity => amenity.amenity === id)
    if (index > -1) {
      state.amenities.splice(index, 1);
    }
  },

  ADD_AMENITY(state, amenity) {
    state.amenities.push(amenity);
  },

  UPDATE_AMENITY(state, { amenityData, useNewKey, oldKey }) {
    console.log({ amenityData })
    const index = useNewKey
      ? state.amenities.findIndex(type => type.amenity === oldKey)
      : state.amenities.findIndex(type => type.amenity === amenityData.amenity)
    console.log({ index });
    if (index > -1) {
      state.amenities.splice(index, 1, amenityData);
    }
  },

  UPDATE_CATEGORY_AMENITY_COUNT(state, { category, amount }) {
    state.amenityCategories.forEach(x => {
      if (x.amenityCategory === category) {
        x._count.amenities += amount
      }
    })
  },

  UPDATE_CATEGORIES_IN_AMENITIES(state, { oldCategory, newCategory }) {
    if (state.amenities.length) {
      state.amenities.forEach(x => {
        if (x.amenityCategory === oldCategory) {
          x.amenityCategory = newCategory
        }
      });
    }
  },

  SET_HOUSE_RULES(state, payload) {
    if (payload) {
      state.houseRules = payload;
      return;
    }
    state.houseRules = [];
  },

  REMOVE_HOUSE_RULE(state, id) {
    const index = state.houseRules.findIndex(houseRule => houseRule.houseRule === id)
    if (index > -1) {
      state.houseRules.splice(index, 1);
    }
  },

  ADD_HOUSE_RULE(state, houseRule) {
    state.houseRules.push(houseRule);
  },

  UPDATE_HOUSE_RULE(state, { houseRuleData, useNewKey, oldKey }) {
    console.log({ houseRuleData })
    const index = useNewKey
      ? state.houseRules.findIndex(type => type.houseRule === oldKey)
      : state.houseRules.findIndex(type => type.houseRule === houseRuleData.houseRule)
    console.log({ index });
    if (index > -1) {
      state.houseRules.splice(index, 1, houseRuleData);
    }
  },
}