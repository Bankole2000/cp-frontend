const baseURL = process.env.BASE_URL || 'http://localhost'

export default {
  baseURL: process.env.BASE_URL || 'http://localhost',
  authPath: `${baseURL}${process.env.AUTH_URL}`,
}