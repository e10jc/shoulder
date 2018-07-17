import Link from 'gatsby-link'
import * as React from 'react'
import {Box, Drawer, Flex, Heading, Text} from 'rebass'

import {AuthContext} from '../layouts/index'
import Div from './div'

interface Props {
  canViewGuide: boolean,
}

interface State {
  isMobileMenuOpen: boolean,
}

class Header extends React.Component<Props> {
  state = {
    isMobileMenuOpen: false,
  }

  render () {
    const {canViewGuide} = this.props

    const links = [
      [canViewGuide ? '/guide/' : '/quiz/', 'Guide'],
      ['/about/', 'About'],
    ]

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
              {links.map(([to, text]) => (
                <Link key={to} to={to}>
                  <Text color='white' p={3}>{text}</Text>
                </Link>
              ))}
            </Flex>
          </Div>
          <Div display={['block', 'none']}>
            <a href='javascript:void(0)' onClick={this.handleMobileMenuOpen}>
              <Text color='white' p={3}>Menu</Text>
            </a>
          </Div>
        </Flex>

        <Drawer
          bg='darkPurple'
          color='white'
          open={this.state.isMobileMenuOpen}
          p={3}
          side='right'
          zIndex={1}
        >
          <a href='javascript:void(0)' onClick={this.handleMobileMenuClose}>
            <Text color='white' p={3}>Close</Text>
          </a>
          {links.map(([to, text]) => (
            <Link key={to} to={to}>
              <Text color='white' p={3}>{text}</Text>
            </Link>
          ))}
        </Drawer>
      </Box>
    )
  }

  handleMobileMenuClose = () => {
    this.setState({...this.state, isMobileMenuOpen: false})
  }

  handleMobileMenuOpen = () => {
    this.setState({...this.state, isMobileMenuOpen: true})
  }
}

export default props => (
  <AuthContext.Consumer>
    {({canViewGuide}) => <Header {...props} canViewGuide={canViewGuide} />}
  </AuthContext.Consumer>
)
