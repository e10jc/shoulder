import Link from 'gatsby-link'
import * as React from 'react'
import {Box, Flex, Heading, Text} from 'rebass'

import {AuthContext} from '../layouts/index'
import Div from './div'

interface Props {
  canViewGuide: boolean,
}

class Header extends React.Component<Props> {
  render () {
    const {canViewGuide} = this.props

    return (
      <Box bg='purple' className='sans-2'>
        <Flex justifyContent='space-between'>
          <Box>
            <Link to='/'>
              <Heading className='serif' color='white' fontSize={3} p={3}>Shoulder.</Heading>
            </Link>
          </Box>
          <Div display={['none', 'block']}>
            <Flex>
              <Link to={canViewGuide ? '/guide/' : '/quiz/'}>
                <Text color='white' p={3}>Guide</Text>
              </Link>
              <Link to='/about/'>
                <Text color='white' p={3}>About</Text>
              </Link>
            </Flex>
          </Div>
        </Flex>
      </Box>
    )
  }
}

export default props => (
  <AuthContext.Consumer>
    {({canViewGuide}) => <Header {...props} canViewGuide={canViewGuide} />}
  </AuthContext.Consumer>
)
