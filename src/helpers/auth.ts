import GoTrue from 'gotrue-js'

module.exports = () => new GoTrue({
  APIUrl: process.env.GATSBY_NETLIFY_IDENTITY_URL,
  audience: '',
  setCookie: true,
})