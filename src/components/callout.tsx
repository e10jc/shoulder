import * as React from 'react'
import {BackgroundImage, Box, Heading, Text} from 'rebass'

interface Props {
  body: string,
  image: {
    alt: string,
    src: string,
  },
  title: string,
}

export default ({body, image, title}: Props) => (
  <Box>
    <BackgroundImage image={image.src} ratio={1} />
    <Heading className='serif' textAlign='center' fontSize={3} my={2}>{title}</Heading>
    <Text textAlign='center'>{body}</Text>
  </Box>
)
