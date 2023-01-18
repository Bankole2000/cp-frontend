export default {
  profile(state) {
    return state.profile;
  },
  profileImage(state, _, rootState) {
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    return `${rootState.env.profilePath}/u/image/${state.profile ? state.profile.username : uniqueId}`
  },
  profileWallpaper(state, _, rootState) {
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    return `${rootState.env.profilePath}/u/wallpaper/${state.profile ? state.profile.username : uniqueId}`
  },
  followerCount(state) {
    return state.profile ? state.profile._count.followers : 0;
  },
  followingCount(state) {
    return state.profile ? state.profile._count.following : 0;
  }
}