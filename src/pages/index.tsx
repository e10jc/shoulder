import * as React from 'react'
import {Box, Container, Flex, Heading, Image} from 'rebass'

import Callout from '../components/callout'
import Hero, {Props as HeroProps} from '../components/hero'
import Testimonial from '../components/testimonial'

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

const HomePage = ({data: {callouts: {edges: callouts}, heroDefaultBgImage, heroImage, testimonials: {edges: testimonials}, title: {value: {value: title}}, homeHero}}: Props) => (
  <Box>
    <Hero bgImage={heroDefaultBgImage} {...homeHero} />
    <Box>
      <Container maxWidth={800}>
        <Heading my={3} textAlign='center'>{title}</Heading>

        <Flex flexWrap='wrap' mb={4} mx={-3}>
          {callouts && callouts.map(({node: {body: {body}, icon: {file: {url: src}, title: alt}, title}}) => (
            <Box key={title} mx='auto' px={3} w={[1, 1 / 3]}>
              <Callout body={body} image={{alt, src}} title={title} />
            </Box>
          ))}
        </Flex>

        <Box>
          <Image alt={heroImage.value.title} src={heroImage.value.file.url} />
        </Box>
      </Container>

      <Box bg='darkWhite'>
        <Container maxWidth={800}>
          <Flex px={2}>
            {testimonials.map(({node: {body: {body}, name, photo: {file: {url: src}, title: alt}}}) => (
              <Box key={title} mx={-2} my={3} w={[1, 1 / 3]}>
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
  