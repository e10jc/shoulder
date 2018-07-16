import * as React from 'react'
import {Avatar, Box, Image, Small, Text} from 'rebass'

interface Props {
  body: string,
  image: {
    alt: string,
    src: string,
  },
  name: string,
}

export default ({body, image, name}: Props) => (
  <Box bg='white' className='text-center' p={2}>
    <Text textAlign='center'>
      <Text mb={2}>&ldquo;{body}&rdquo;</Text>
      <Box mb={1}>
        <Avatar alt={image.alt} src={image.src} size={60} />
      </Box>
      <Text color='gray'>
        <Small>{name}</Small>
      </Text>
    </Text>
  </Box>
)
