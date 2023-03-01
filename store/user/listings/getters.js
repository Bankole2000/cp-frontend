export default {
  userPublishedListings(state) {
    if (state.allUserListings.length) {
      return state.allUserListings.filter(x => x.isPublished === true);
    }
    return [];
  },
  listingInCreation(state) {
    if (state.listingInCreation) {
      return state.listingInCreation
    }
    return null;
  }
}