import * as React from 'react'
import {Helmet} from 'react-helmet'

interface Props {
  meta: Meta,
}

const Meta = ({meta}: Props) => (
  <Helmet>
    <title>{meta.title}</title>
    <meta name='description' content={meta.description} />
    <meta property='og:title' content={meta.title} />
    <meta property='og:description' content={meta.description} />
    <meta property='og:image' content={meta.image.file.url} />
  </Helmet>
)

export default Meta