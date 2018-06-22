import Link from 'gatsby-link'
import * as React from 'react'

interface Props {
  data: {
    title: string,
    body: {body: string},
    linkTitle: string,
    linkUrl: string,
  }
}

const Hero = ({data: {title, body: {body}, linkTitle, linkUrl}}: Props) => (
  <div>
    <h1>{title}</h1>
    <div>{body}</div>
    {linkTitle && linkUrl && (
      <Link to={linkUrl}>
        <button>{linkTitle}</button>
      </Link>
    )}
  </div>
)

export default Hero
