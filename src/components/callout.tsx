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
    <Image alt={image.alt} src={image.src} />
    <Text textAlign='center' fontSize={3} fontWeight='bold'>{title}</Text>
    <Text textAlign='center'>{body}</Text>
  </Box>
)
