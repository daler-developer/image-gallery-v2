import pt from 'prop-types'
import styled from 'styled-components'
import generateErrorMessage  from '../../utils/generateErrorMessage'

const ErrorMessage = ({ type, ...rest }) => {
  return (
    <StyledWrapper>
      {generateErrorMessage(type)}
    </StyledWrapper>
  )
}

ErrorMessage.propTypes = {
 type: pt.string.isRequired
}

const StyledWrapper = styled.span`
  color: red;
`

export default ErrorMessage
