import * as React from 'react'
import {Box, Image, Text} from 'rebass'

interface Props {
  body: string,
  image: {
    alt: string,
    src: string,
  },
  name: string,
}

export default ({body, image, name}: Props) => (
  <Box>
    <Text>{body}</Text>
    <Image alt={image.alt} src={image.src} />
    <Text>{name}</Text>
  </Box>
)
