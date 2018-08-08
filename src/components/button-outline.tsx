import * as React from 'react'
import {ButtonOutline} from 'rebass'

import {theme} from './layout'

export default (props: any) => {
  const {isSelected} = props
  const spreadProps = Object.keys(props).filter(p => p !== 'isSelected').reduce((h, x) => {
    h[x] = props[x]
    return h
  }, {})

  return <Button 
    bg={isSelected ? 'purple' : 'white'}
    border={`2px solid ${theme.colors.purple}`}
    color={isSelected ? 'white' : 'purple'}
    hover={{color: 'white', backgroundColor: 'purple'}}
    {...spreadProps}
  /> 
} 

const Button = ButtonOutline.extend`
  box-shadow: none;
  &:focus { box-shadow: none; }
  &:hover { cursor: pointer; }
`