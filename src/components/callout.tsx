import * as React from 'react'
import {Image, Box, Heading, Text} from 'rebass'

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
    <Image alt={image.alt} mx='auto' p={3} src={image.src} style={{height: '120px'}} />
    <Heading className='serif' textAlign='center' fontSize={3} my={2}>{title}</Heading>
    <Text textAlign='center'>{body}</Text>
  </Box>
)
