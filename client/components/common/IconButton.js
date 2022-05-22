import pt from 'prop-types'
import styled, { css } from 'styled-components'
import Icon from './Icon'

const IconButton = ({ variant = 'outlined', color='light', size = 'md', children, ...rest }) => {
  return (
    <StyledWrapper $size={size} $color={color} {...rest}>
      <Icon variant={variant}>{children}</Icon>
    </StyledWrapper>
  )
}

IconButton.propTypes = {
  color: pt.oneOf(['grey', 'light']),
  size: pt.oneOf(['sm', 'md', 'lg']),
  variant: pt.string,
  children: pt.any
}

const StyledWrapper = styled.button`
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $size }) => $size === 'sm' && css`
    width: 35px;
    font-size: 20px;
  `}
  ${({ $size }) => $size === 'md' && css`
    width: 40px;
    font-size: 25px;
  `}
  ${({ $size }) => $size === 'lg' && css`
    width: 50px;
  `}

  ${({ $color }) => $color === 'grey' && css`
    background-color: #ced4da;
    color: black;
  `}
  ${({ $color }) => $color === 'red' && css`
    background-color: #ff4d4f14;
    color: #ff4d4f;

    &:hover {
      background-color: #ff4d4f2e;
    }
  `}
  ${({ $color }) => $color === 'light' && css`
    background-color: transparent;
    color: black;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `}
`

export default IconButton
