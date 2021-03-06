import Link, {navigateTo} from 'gatsby-link'
import * as React from 'react'
import {Box, Drawer, Flex, Heading, Text} from 'rebass'

import Div from './div'
import {AuthContext} from './layout'

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
        <Flex alignItems='center' justifyContent='space-between'>
          <Box>
            <Link to='/'>
              <Heading className='serif' color='white' fontSize={3} lineHeight={1} p={3}>Shoulder.</Heading>
            </Link>
          </Box>
          <Div display={['none', 'block']}>
            <Flex>
              {links.map(([to, text]) => (
                <Link key={to} to={to}>
                  <Text color='white' lineHeight={1} p={3}>{text}</Text>
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
            <a href='javascript:void(0)' key={to} onClick={this.navigateAndCloseMenu(to)}>
              <Text color='white' p={3}>{text}</Text>
            </a>
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

  navigateAndCloseMenu = to => () => {
    this.handleMobileMenuClose()
    navigateTo(to)
  }
}

export default props => (
  <AuthContext.Consumer>
    {({canViewGuide}) => <Header {...props} canViewGuide={canViewGuide} />}
  </AuthContext.Consumer>
)
