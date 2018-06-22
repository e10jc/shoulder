import Link from 'gatsby-link'
import * as React from 'react'
import {Box, Button, Heading, Text} from 'rebass'

interface Props {
  data: {
    title: string,
    body: {body: string},
    linkTitle: string,
    linkUrl: string,
  }
}

const Hero = ({data: {title, body: {body}, linkTitle, linkUrl}}: Props) => (
  <Box bg='darkGray' color='white' p={4}>
    <Heading mb={1}>{title}</Heading>
    <Text mb={3}>{body}</Text>
    {linkTitle && linkUrl && (
      <Link to={linkUrl}>
        <Button bg='white' color='purple'>{linkTitle}</Button>
      </Link>
    )}
  </Box>
)

export default Hero
