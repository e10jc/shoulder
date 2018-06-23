import GoTrue from 'gotrue-js'

export default () => new GoTrue({
  APIUrl: process.env.GATSBY_NETLIFY_IDENTITY_URL,
  audience: '',
  setCookie: true,
})