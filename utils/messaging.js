const icons = {
  success: "mdi-check-bold",
  warning: "mdi-alert",
  error: "mdi-cancel",
  info: "mdi-information-outline",
  primary: "mdi-hand-wave",
  secondary: "mdi-account",
  accent: "mdi-security",
  listing: "mdi-home",
  offer: "mdi-account-multiple",
  transaction: "mdi-cash-multiple",
  profile: "mdi-account",
  chat: "mdi-message-text",
  follow: "mdi-account-plus",
  unfollow: "mdi-account-minus",
  like: "mdi-heart",
  unlike: "mdi-heart-outline",
  comment: "mdi-comment",
  share: "mdi-share",
  report: "mdi-flag",
  delete: "mdi-delete",
  edit: "mdi-pencil",
  save: "mdi-content-save",
  cancel: "mdi-cancel",
  close: "mdi-close",
  back: "mdi-arrow-left",
  book: "mdi-calendar-check",
  booked: "mdi-calendar-check",
  unbooked: "mdi-calendar-remove",
  photo: "mdi-image",
  picture: "mdi-camera",
  video: "mdi-video",
  audio: "mdi-music",
  file: "mdi-file",
  link: "mdi-link",
  location: "mdi-map-marker",
  phone: "mdi-phone",
  email: "mdi-email",
}

export const genericMessage = ({
  text = 'A generic notification',
  title = null,
  loading = false,
  timeout = 3000,
  color = null,
  type = null,
  icon = null,
  progressColor = 'white',
  avatar = null,
  action = null
}) => ({
  message: {
    text,
    title,
    type,
    loading,
    timeout,
    avatar,
    progressColor,
    action,
    icon: icon ? icons[icon] || icon || icons[type] : null,
  },
  color,
  timeout,
})

export const loadingMessage = ({
  text = 'Loading...',
  title = null,
  loading = true,
  timeout = -1,
  color = null,
  type = null,
  icon = null,
  avatar = null,
  progressColor = 'white',
  action = null
}) => ({
  message: {
    text,
    title,
    type,
    loading,
    timeout,
    progressColor,
    avatar,
    action,
    icon: icon ? icons[icon] || icon || icons[type] : null,
  },
  color,
  timeout,
});

export const successMessage = ({
  text = 'A basic success notification (success)',
  title = null,
  loading = false,
  timeout = 3000,
  color = 'success',
  type = 'success',
  icon = 'success',
  avatar = null,
  progressColor = 'white',
  action = null
}) => ({
  message: {
    text,
    title,
    type,
    loading,
    timeout,
    progressColor,
    avatar,
    action,
    icon: icon ? icons[icon] || icon || icons[type] : null,
  },
  color,
  timeout,
});

export const errorMessage = ({
  text = 'Something went wrong (oops)',
  title = null,
  loading = false,
  timeout = 5000,
  color = 'error',
  type = 'error',
  avatar = null,
  icon = 'error',
  progressColor = 'white',
  action = null
}) => ({
  message: {
    text,
    title,
    type,
    loading,
    timeout,
    progressColor,
    avatar,
    action,
    icon: icon ? icons[icon] || icon || icons[type] : null,
  },
  color,
  timeout,
});

export const infoMessage = ({
  text = 'A notification with some info (info)',
  title = null,
  loading = false,
  timeout = 3000,
  color = 'info',
  type = 'info',
  avatar = null,
  icon = 'info',
  progressColor = 'white',
  action = null
}) => ({
  message: {
    text,
    title,
    type,
    loading,
    timeout,
    progressColor,
    avatar,
    action,
    icon: icon ? icons[icon] || icon || icons[type] : null,
  },
  color,
  timeout,
});

export const warningMessage = ({
  text = 'A Warning Notification (warning)',
  title = null,
  loading = false,
  timeout = 3000,
  color = 'warning',
  avatar = null,
  type = 'warning',
  icon = 'warning',
  progressColor = 'white',
  action = null
}) => ({
  message: {
    text,
    title,
    type,
    loading,
    timeout,
    progressColor,
    avatar,
    action,
    icon: icon ? icons[icon] || icon || icons[type] : null,
  },
  color,
  timeout,
});

export const primaryMessage = ({
  text = 'A basic message (Primary)',
  title = null,
  loading = false,
  timeout = 3000,
  color = 'primary',
  avatar = null,
  type = 'primary',
  icon = 'primary',
  progressColor = 'white',
  action = null
}) => ({
  message: {
    text,
    title,
    type,
    loading,
    timeout,
    progressColor,
    avatar,
    action,
    icon: icon ? icons[icon] || icon || icons[type] : null,
  },
  color,
  timeout,
});

export const secondaryMessage = ({
  text = 'A notification from another user (secondary)',
  title = null,
  loading = false,
  timeout = 3000,
  color = 'secondary',
  type = 'secondary',
  icon = 'secondary',
  avatar = null,
  progressColor = 'white',
  action = null
}) => ({
  message: {
    text,
    title,
    type,
    loading,
    timeout,
    progressColor,
    avatar,
    action,
    icon: icon ? icons[icon] || icon || icons[type] : null,
  },
  color,
  timeout,
});

export const accentMessage = ({
  text = "A System Notification (Accent)",
  title = null,
  loading = false,
  timeout = 3000,
  color = 'accent',
  type = 'accent',
  icon = 'accent',
  avatar = null,
  progressColor = 'white',
  action = null
}) => ({
  message: {
    text,
    title,
    type,
    loading,
    timeout,
    progressColor,
    action,
    avatar,
    icon: icon ? icons[icon] || icon || icons[type] : null,
  },
  color,
  timeout,
});
