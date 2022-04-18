import pt from 'prop-types'
import styled from 'styled-components'

const Input = ({ size, error, inputProps, ...rest }) => {
  return (
    <StyledWrapper>

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
`

const StyledInput = styled.input`
  text-indent: 4px;

  ${({ size }) => size === 'ms' && `
    padding: 2px 0;  
  `}
  ${({ size }) => size === 'md' && `
    padding: 4px 0;  
  `}
  ${({ size }) => size === 'lg' && `
    padding: 7px 0;  
  `}
`

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 13px;
`

export default Input
