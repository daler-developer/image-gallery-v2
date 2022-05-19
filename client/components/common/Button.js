import pt from 'prop-types'
import styled from 'styled-components'
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
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }

  ${({ $size }) => $size === 'sm' && `
    height: 30px;
    padding: 3px 3px;
    font-size: 12px;
  `}
  ${({ $size }) => $size === 'md' && `
    height: 40px;
    padding: 5px 7px;
    font-size: 15px;
  `}
  ${({ $size }) => $size === 'lg' && `
    height: 40px;
    padding: 7px 10px;
    font-size: 18px;
  `}

  ${({ $color }) => $color === 'blue' && `
    background-color: #0095f6;
    color: white;
  `}
  ${({ $color }) => $color === 'grey' && `
    background-color: #ced4da;
    color: black;
  `}
  ${({ $color }) => $color === 'red' && `
    background-color: red;
    color: white;
  `}

  ${({ $roundedBorder }) => $roundedBorder && `
    border-radius: 3px;
  `}
`

const StyledSpinner = styled(Spinner)`
  width: auto;
  height: 100%;  
`

export default Button
