import pt from 'prop-types'
import { forwardRef } from 'react'
import styled, { css } from 'styled-components'

const Input = forwardRef(({ size = 'md', error, inputProps = {}, ...rest }, ref) => {
  return (
    <StyledWrapper {...rest}>

      <StyledInput
        ref={ref}
        $size={size}
        $error={error}
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
`

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  text-indent: 8px;
  border: 1px solid #d9d9d9;
  
  &:focus {
    box-shadow: 0 0 0 2px rgba(24, 144, 255, .2);
  }
  
  &:hover {
    border-color: #40a9ff;
  }

  ${({ $size }) => $size === 'sm' && css`
    height: 30px;
  `}
  ${({ $size }) => $size === 'md' && css`
    height: 40px;
  `}

  ${({ $error }) => $error && css`
    border-color: #ff4d4f !important;

    &:focus {
      box-shadow: 0 0 0 2px rgba(255, 77, 79, .2) !important;
    }
  `}
`

const StyledErrorMessage = styled.div`
  font-size: 13px;
  position: absolute;
  top: calc(100%);
  left: 0;
  right: 0;
  padding: 3px;
  background-color: rgba(255, 77, 79, 1);
  color: white;
  border-radius: 0 0 3px 3px;
  z-index: 100;
`

export default Input
