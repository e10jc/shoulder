import {Box} from 'rebass'
import {display, space} from 'styled-system'

interface Props {
  display: string | string[],
}

export default Box.extend<Props>`
  ${display}
`