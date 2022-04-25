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
  border: 1px solid black;
`

const StyledInput = styled.input`
  text-indent: 4px;
  height: 35px; 
`
  // ${({ size }) => size === 'ms' && `
  //   height: 40px; 
  // `}
  // ${({ size }) => size === 'md' && `
  //   height: 40px; 
  // `}
  // ${({ size }) => size === 'lg' && `
  //   padding: 7px 0;  
  // `}

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 13px;
`

export default Input
