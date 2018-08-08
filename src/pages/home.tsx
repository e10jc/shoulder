import GImage from 'gatsby-image'
import * as React from 'react'
import {Box, Container, Flex, Heading, Image} from 'rebass'

import Callout from '../components/callout'
import Hero, {Props as HeroProps} from '../components/hero'
import Layout, {PAGE_WIDTH} from '../components/layout'
import Meta from '../components/meta'
import Testimonial from '../components/testimonial'

interface Props {
  data: {
    contentfulHomePage: {
      callouts: {
        body: {body: string},
        icon: {
          file: {url: string},
          title: string,
        },
        title: string,
      }[],
      hero: HeroProps,
      heroImage: {
        file: {url: string},
        title: string,
      },
      lede: {
        lede: string,
      },
      meta: Meta,
      testimonials: {
        body: {body: string},
        name: string,
        photo: {
          file: {url: string},
          title: string,
        },
      }[],
    },
    dotsImage: any,
    heroDefaultBgImage: any,
  }
}

const HomePage = ({
  data: {
    contentfulHomePage: {
      callouts,
      meta,
      hero,
      heroImage,
      lede: {lede},
      testimonials,
    }, 
    dotsImage, 
    heroDefaultBgImage, 
  }
}: Props) => (
  <Layout>
    <Meta meta={meta} />

    <Hero bgImage={heroDefaultBgImage} {...hero} />
    <Box>
      <Container maxWidth={PAGE_WIDTH}>
        <Box mx='auto' width={['100%', '75%']}>
          <Heading className='serif' dangerouslySetInnerHTML={{__html: lede}} my={4} textAlign='center' />
        </Box>

        <Box mx='auto' my={4} width='50px'>
          <GImage
            alt='Dots'
            sizes={dotsImage.childImageSharp.sizes}
          />
        </Box>

        <Flex flexWrap='wrap' mb={4} mx={-3}>
          {callouts && callouts.map(({body: {body}, icon: {file: {url: src}, title: alt}, title}) => (
            <Box key={title} mb={3} mx='auto' px={3} width={[1, 1 / 3]}>
              <Callout body={body} image={{alt, src}} title={title} />
            </Box>
          ))}
        </Flex>

        <Image alt={heroImage.title} mb={4} src={heroImage.file.url} />
      </Container>

      <Box bg='darkWhite' pt={4}>
        <Container maxWidth={PAGE_WIDTH}>
          <Flex flexWrap='wrap' mx={-2}>
            {testimonials.map(({body: {body}, name, photo: {file: {url: src}, title: alt}}) => (
              <Box key={name} mb={3} px={2} width={[1, 1 / 3]}>
                <Testimonial body={body} image={{alt, src}} name={name} />
              </Box>
            ))}
          </Flex>
        </Container>
      </Box>
    </Box>
  </Layout>
)

export default HomePage

export const query = graphql`
  query homePageQuery {
    ...heroDefaultBgImage

    dotsImage: file (relativePath: {eq: "dots.png"}) {
      childImageSharp {
        sizes(maxWidth: 50) {
          ...GatsbyImageSharpSizes
        }
      }
    }

    contentfulHomePage (contentful_id: {eq: "5dToGykxfUYqegYUsQK2qy"}) {
      callouts {
        icon {
          title
          file {url}
        }
        body {body}
        title
      }

      hero {
        title
        body {body}
        linkUrl
        linkTitle
      }
  
      heroImage {
        title
        file {url}
      }
  
      lede {lede}
  
      meta {
        description
        image {
          title
          file {url}
        }
        title
      }
  
      testimonials {
        body {body}
        name
        photo {
          title
          file {url}
        }
      }
    }
  }`
  