export default {
  profile(state) {
    return state.profile;
  },
  profileImage(state, _, rootState) {
    if (state.profile) {
      if (state.profile.imageUrl) {
        return state.profile.imageUrl;
      }
    }
    return `${rootState.env.profilePath}/u/image/guest`
  },
  profileWallpaper(state, _, rootState) {
    if (state.profile) {
      if (state.profile.wallpaperUrl) {
        return state.profile.wallpaperUrl;
      }
    }
    return `${rootState.env.profilePath}/u/wallpaper/guest`
  },
  followerCount(state) {
    return state.profile ? state.profile._count.followers : 0;
  },
  followingCount(state) {
    return state.profile ? state.profile._count.following : 0;
  }
}