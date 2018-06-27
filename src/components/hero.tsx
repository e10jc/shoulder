import Link from 'gatsby-link'
import * as React from 'react'
import {Box, Button, Container, Heading, Text} from 'rebass'

export interface Props {
  title: string,
  body: {body: string},
  linkTitle: string,
  linkUrl: string,
}

const Hero = ({title, body: {body}, linkTitle, linkUrl}: Props) => (
  <Box bg='darkGray' color='white' p={4}>
    <Container maxWidth={800}>
      <Heading mb={1}>{title}</Heading>
      <Text mb={3}>{body}</Text>
      {linkTitle && linkUrl && (
        <Link to={linkUrl}>
          <Button bg='white' color='purple'>{linkTitle}</Button>
        </Link>
      )}
    </Container>
  </Box>
)

export default Hero
