import {Box} from 'rebass'
import {display, height, position} from 'styled-system'

interface Props {
  display: string | string[],
}

export default Box.extend<Props>`
  ${display}
  ${height}
  ${position}
`