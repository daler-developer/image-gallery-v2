import pt from 'prop-types'
import styled, { css } from 'styled-components'
import generateErrorMessage  from '../../utils/generateErrorMessage'

const ErrorMessage = ({ type, align = 'left', ...rest }) => {
  return (
    <StyledWrapper {...rest} $align={align}>
      {generateErrorMessage(type)}
    </StyledWrapper>
  )
}

ErrorMessage.propTypes = {
  type: pt.string.isRequired,
  align: pt.string
}

const StyledWrapper = styled.span`
  color: #ff4d4f;

  ${({ $align }) => $align === 'start' && css`
    text-align: left;
  `}
  ${({ $align }) => $align === 'center' && css`
    text-align: center;
  `}
`

export default ErrorMessage
