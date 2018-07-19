import GImage from 'gatsby-image'
import Link from 'gatsby-link'
import * as React from 'react'
import {Box, Button, Container, Flex, Heading, Text} from 'rebass'

import Div from './div'
import {PAGE_WIDTH} from '../layouts'

export interface Props {
  bgImage?: any,
  buttonAlign?: string,
  content?: any,
  fillVertical?: boolean,
  title?: string,
  body?: {body: string},
  handleLinkClick?: () => any,
  linkTitle?: string,
  linkUrl?: string,
  py?: any,
}

const Hero = ({bgImage, buttonAlign, content, title, body, handleLinkClick, linkTitle, linkUrl, py}: Props) => (
  <Div bg='darkGray' color='white' height='100%' position='relative'>
    {bgImage && (
      <GImage
        alt='Background'
        imgStyle={{objectPosition: 'center bottom'}}
        sizes={bgImage.childImageSharp.sizes}
        style={{position: 'absolute', width: '100%', height: '100%'}}
      />
    )}

    <Container maxWidth={PAGE_WIDTH} style={{position: 'relative'}}>
      <Box py={py || 5}>
        {content || (
          <>
            <Heading className='serif' dangerouslySetInnerHTML={{__html: title}} mb={1} />
            <Flex flexWrap='wrap' justifyContent='space-between'>
              <Box width={buttonAlign !== 'right' ? 1 : null}>
                <Text mb={3}>{body.body}</Text>
              </Box>
              <Box width={buttonAlign !== 'right' ? 1 : null}>
                {linkTitle && linkUrl && (
                  <Link onClick={handleLinkClick} to={handleLinkClick ? '#' : linkUrl}>
                    <Button bg='white' color='purple' px={5} py={2}>{linkTitle}</Button>
                  </Link>
                )}
              </Box>
            </Flex>
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