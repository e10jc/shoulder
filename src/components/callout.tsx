import * as React from 'react'
import {Box, Image, Text} from 'rebass'

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
    <Text>{title}</Text>
    <Image alt={image.alt} src={image.src} />
    <Text>{body}</Text>
  </Box>
)
