import Img from 'gatsby-image'
import Link from 'gatsby-link'
import * as React from 'react'
import {Box, Button, Container, Heading, Text} from 'rebass'

export interface Props {
  bgImage?: any,
  title: string,
  body: {body: string},
  linkTitle: string,
  linkUrl: string,
}

const Hero = ({bgImage, title, body: {body}, linkTitle, linkUrl}: Props) => (
  <Box bg='darkGray' color='white' style={{position: 'relative'}}>
    {bgImage && (
      <Img
        alt='Background'
        sizes={bgImage.childImageSharp.sizes}
        style={{position: 'absolute', width: '100%', height: '100%'}}
      />
    )}

    <Container maxWidth={600} style={{position: 'relative'}}>
      <Box py={4}>
        <Heading mb={1}>{title}</Heading>
        <Text mb={3}>{body}</Text>
        {linkTitle && linkUrl && (
          <Link to={linkUrl}>
            <Button bg='white' color='purple'>{linkTitle}</Button>
          </Link>
        )}
      </Box>
    </Container>
  </Box>
)

export default Hero

export const defaultBgImgFragment = graphql`
  fragment heroDefaultBgImage on RootQueryType {
    heroDefaultBgImage: file (relativePath: {eq: "hero-bg.jpg"}) {
      childImageSharp {
        sizes(maxWidth: 1600) {
          ...GatsbyImageSharpSizes
        }
      }
    }
  }
`