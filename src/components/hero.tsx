import Img from 'gatsby-image'
import Link from 'gatsby-link'
import * as React from 'react'
import {Box, Button, Container, Heading, Text} from 'rebass'

import Div from './div'

export interface Props {
  bgImage?: any,
  content?: any,
  fillVertical?: boolean,
  title?: string,
  body?: {body: string},
  handleLinkClick?: () => any,
  linkTitle?: string,
  linkUrl?: string,
}

const Hero = ({bgImage, content, title, body, handleLinkClick, linkTitle, linkUrl}: Props) => (
  <Div bg='darkGray' color='white' height='100%' position='relative'>
    {bgImage && (
      <Img
        alt='Background'
        sizes={bgImage.childImageSharp.sizes}
        style={{position: 'absolute', width: '100%', height: '100%'}}
      />
    )}

    <Container maxWidth={600} style={{position: 'relative'}}>
      <Box py={4}>
        {content || (
          <>
            <Heading className='serif' mb={1}>{title}</Heading>
            <Text mb={3}>{body.body}</Text>
            {linkTitle && linkUrl && (
              <Link onClick={handleLinkClick} to={handleLinkClick ? '#' : linkUrl}>
                <Button bg='white' color='purple'>{linkTitle}</Button>
              </Link>
            )}
          </>
        )}
      </Box>
    </Container>
  </Div>
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