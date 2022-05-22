import pt from 'prop-types'
import styled, { css } from 'styled-components'
import { useMemo } from 'react'
import Spinner from './Spinner'

const Button = ({ children, size = 'md', color = 'blue', isLoading = false, roundedBorder = true, ...rest }) => {

  const spinnerColor = useMemo(() => {
    switch (color) {
      case 'red':
      case 'blue':
        return 'white'
      case 'grey':
        return 'black'
    }
  }, [color])

  return (
    <StyledWrapper disabled={isLoading} $roundedBorder={roundedBorder} $color={color} $size={size} {...rest}>
      {
        isLoading ? (
          <StyledSpinner color={spinnerColor} />
        ) : (
          children
        )
      }
    </StyledWrapper>
  )
}

Button.propTypes = {
  size: pt.oneOf(['sm', 'md', 'lg']),
  color: pt.oneOf(['blue', 'grey', 'white', 'red']),
  roundedBorder: pt.bool,
  isLoading: pt.bool
}

const StyledWrapper = styled.button`
  padding: 3px 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;

  ${({ $size }) => $size === 'sm' && css`
    height: 30px;
    padding: 3px 6px;
    font-size: 12px;
  `}
  ${({ $size }) => $size === 'md' && css`
    height: 40px;
    padding: 5px 7px;
    font-size: 15px;
  `}
  ${({ $size }) => $size === 'lg' && css`
    height: 40px;
    padding: 7px 10px;
    font-size: 18px;
  `}

  ${({ $color }) => $color === 'blue' && css`
    background-color: rgb(29, 161, 242);
    color: white;

    &:hover {
      background-color: rgb(0, 109, 191);
    }
  `}
  ${({ $color }) => $color === 'grey' && css`
    background-color: rgba(0, 0, 0, 0.1);
    color: black;

    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  `}
  ${({ $color }) => $color === 'red' && css`
    background-color: #ff4d4f;
    color: white;

    &:hover {
      background-color: #d32a2b;
    }
  `}

  ${({ $roundedBorder }) => $roundedBorder && css`
    border-radius: 6px;
  `}
`

const StyledSpinner = styled(Spinner)`
  width: auto;
  height: 100%;  
`

export default Button
