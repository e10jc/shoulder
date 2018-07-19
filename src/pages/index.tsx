import GImage from 'gatsby-image'
import * as React from 'react'
import {Helmet} from 'react-helmet'
import {Box, Container, Flex, Heading, Image} from 'rebass'

import Callout from '../components/callout'
import Hero, {Props as HeroProps} from '../components/hero'
import Testimonial from '../components/testimonial'
import {PAGE_WIDTH} from '../layouts'

interface Props {
  data: {
    callouts: {
      edges: {
        node: {
          body: {body: string},
          icon: {
            file: {url: string},
            title: string,
          },
          title: string,
        }
      }[]
    },
    dotsImage: any,
    heroDefaultBgImage: any,
    heroImage: {
      value: {
        file: {url: string},
        title: string,
      }
    },
    testimonials: {
      edges: {
        node: {
          body: {body: string},
          name: string,
          photo: {
            file: {url: string},
            title: string,
          },
        }
      }[],
    },
    title: {
      value: {value: string}
    },
    homeHero: HeroProps,
  }
}

const HomePage = ({data: {callouts: {edges: callouts}, dotsImage, heroDefaultBgImage, heroImage, testimonials: {edges: testimonials}, title: {value: {value: title}}, homeHero}}: Props) => (
  <Box>
    <Helmet>
      <title>Shoulder</title>
    </Helmet>

    <Hero bgImage={heroDefaultBgImage} {...homeHero} />
    <Box>
      <Container maxWidth={PAGE_WIDTH}>
        <Box mx='auto' width={['100%', '75%']}>
          <Heading className='serif' dangerouslySetInnerHTML={{__html: title}} my={4} textAlign='center' />
        </Box>

        <Box mx='auto' my={4} width='50px'>
          <GImage
            alt='Dots'
            sizes={dotsImage.childImageSharp.sizes}
          />
        </Box>

        <Flex flexWrap='wrap' mb={4} mx={-3}>
          {callouts && callouts.map(({node: {body: {body}, icon: {file: {url: src}, title: alt}, title}}) => (
            <Box key={title} mb={3} mx='auto' px={3} width={[1, 1 / 3]}>
              <Callout body={body} image={{alt, src}} title={title} />
            </Box>
          ))}
        </Flex>

        <Image alt={heroImage.value.title} mb={4} src={heroImage.value.file.url} />
      </Container>

      <Box bg='darkWhite' pt={4}>
        <Container maxWidth={PAGE_WIDTH}>
          <Flex flexWrap='wrap' mx={-2}>
            {testimonials.map(({node: {body: {body}, name, photo: {file: {url: src}, title: alt}}}) => (
              <Box key={name} mb={3} px={2} width={[1, 1 / 3]}>
                <Testimonial body={body} image={{alt, src}} name={name} />
              </Box>
            ))}
          </Flex>
        </Container>
      </Box>
    </Box>
  </Box>
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

    homeHero: contentfulHero (contentful_id: {eq: "ngDKvizQGsA8iImmia4yI"}) {
      title
      body {body}
      linkUrl
      linkTitle
    }

    title: contentfulCopy (key: {eq: "Home Page Title"}) {
      value {value}
    }

    heroImage: contentfulImage (key: {eq: "Home Page Hero"}) {
      value {
        title
        file {url}
      }
    }

    callouts: allContentfulHomePageCallout {
      edges {
        node {
          icon {
            title
            file {url}
          }
          body {body}
          title
        }
      }
    }

    testimonials: allContentfulTestimonial {
      edges {
        node {
          body {body}
          name
          photo {
            title
            file {url}
          }
        }
      }
    }
  }`
  