const emailRegex = /^[a-z]+(_|\.)?[a-z0-9]*@[a-z]+\.[a-z]{2,}$/i;

export const isValidEmail = (emailLike) => {
  return emailLike ? emailRegex.test(emailLike) : false;
};