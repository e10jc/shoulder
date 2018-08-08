import * as React from 'react'
import {Box, Button, Fixed, Heading, Text} from 'rebass'

import Meta from '../components/meta'
import Layout from '../components/layout'

interface Props {
  data: {
    bgImage: any,
    contentfulPreLaunchPage: {
      body: {body: string},
      lead: {lead: string},
      meta: Meta,
    },
  }
}

const PreLaunchPage = ({
  data: {
    bgImage,
    contentfulPreLaunchPage: {
      body: {body},
      lead: {lead},
      meta,
    }, 
  }
}: Props) => (
  <Layout hideFooter hideHeader>
    <Wrapper color='white' style={{backgroundImage: `url(${bgImage.childImageSharp.sizes.src})`}}>
      <Meta meta={meta} />

      <Box mt={[5, 6]} px={3}>
        <Heading className='serif' fontSize={[6, 7]} mb={3}>Shoulder</Heading>
        <Heading fontSize={[2, 3]} mb={4}>{lead}</Heading>
        <Text mb={4} mx='auto' style={{maxWidth: '500px'}}>{body}</Text>
        <Button bg='lightPurple' borderRadius='20px' onClick={() => window.location.href = 'mailto:alex@shoulder.com'} px={3}>Contact us</Button>
      </Box>
    </Wrapper>
  </Layout>
)

export default PreLaunchPage

export const query = graphql`
  query preLaunchPageQuery {
    bgImage: file (relativePath: {eq: "hero-bg.jpg"}) {
      childImageSharp {
        sizes(maxWidth: 2400) {
          src
        }
      }
    }

    contentfulPreLaunchPage (contentful_id: {eq: "6U1oJ8iYVyGIUGSA26wIWg"}) {
      body {body}
      lead {lead}
  
      meta {
        description
        image {
          title
          file {url}
        }
        title
      }  
    }
  }`
  
  const Wrapper = Fixed.extend`
    background-position: center bottom;
    background-size: cover;
    bottom: 0;
    display: flex;
    left: 0;
    justify-content: center;
    right: 0;
    text-align: center;
    top: 0;
  `