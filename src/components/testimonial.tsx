import * as React from 'react'
import {Box, Image, Small, Text} from 'rebass'

interface Props {
  body: string,
  image: {
    alt: string,
    src: string,
  },
  name: string,
}

export default ({body, image, name}: Props) => (
  <Box bg='white' p={2}>
    <Text textAlign='center'>{body}</Text>
    <Image alt={image.alt} my={2} mx='auto' src={image.src} w={60} />
    <Text textAlign='center'>
      <Small>{name}</Small>
    </Text>
  </Box>
)
