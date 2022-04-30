import pt from 'prop-types'
import styled from 'styled-components'

const Input = ({ size, error, inputProps, ...rest }) => {
  return (
    <StyledWrapper {...rest}>

      <StyledInput
        size={size}
        {...inputProps}
      />

      {
        error && (
          <StyledErrorMessage>
            {error}
          </StyledErrorMessage>
        )
      }

    </StyledWrapper>
  )
}

Input.defaultProps = {
  size: 'md',
  inputProps: {}
}

Input.propTypes = {
  size: pt.oneOf(['sm', 'md', 'lg']),
  error: pt.string,
  inputProps: pt.object
}

const StyledWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  row-gap: 3px;
  background-color: rgba(0, 0, 0, .05);
`

const StyledInput = styled.input`
  flex: 1 0 0;
  text-indent: 8px;

  ${({ size }) => size === 'md' && `
    flex: 0 0 40px;
  `}
`

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 13px;
`

export default Input
