import styled from 'styled-components'
import {display} from 'styled-system'

interface Props {
  display: string | string[],
}

export default styled.div<Props>`
  ${display}
`