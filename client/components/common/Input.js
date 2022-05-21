import pt from 'prop-types'
import { forwardRef } from 'react'
import styled, { css } from 'styled-components'

const Input = forwardRef(({ size = 'md', error, inputProps = {}, ...rest }, ref) => {
  return (
    <StyledWrapper $size={size} $error={error} {...rest}>

      <StyledInput
        ref={ref}
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
})

Input.propTypes = {
  size: pt.oneOf(['sm', 'md', 'lg']),
  error: pt.string,
  inputProps: pt.object
}

const StyledWrapper = styled.div`
  position: relative;

  ${({ $size }) => $size === 'sm' && css`
    height: 30px;
  `}
  ${({ $size }) => $size === 'md' && css`
    height: 40px;
  `}

  ${({ $error }) => $error && css`
    border: 1px solid red;
  `}
`

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  text-indent: 8px;
  background-color: rgba(0, 0, 0, .05);
`

const StyledErrorMessage = styled.div`
  font-size: 13px;
  position: absolute;
  top: calc(100%);
  left: 0;
  right: 0;
  padding: 3px;
  background-color: red;
  color: white;
  border-radius: 3px;
  z-index: 100;
`

export default Input
