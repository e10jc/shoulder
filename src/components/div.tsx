import {Box} from 'rebass'
import {display, height, position, opacity} from 'styled-system'

interface Props {
  display: string | string[],
}

export default Box.extend<Props>`
  ${display}
  ${height}
  ${position}
  ${opacity}
`