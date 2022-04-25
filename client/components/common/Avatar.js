import pt from 'prop-types'
import styled from 'styled-components'
import emptyAvatar from '../../public/empty-avatar.png'

const Avatar = ({ size, src, ...rest }) => {
  return (
    <StyledWrapper
      $size={size}
      src={src || emptyAvatar.src}
      {...rest}
    >

    </StyledWrapper>
  )
}

Avatar.propTypes = {
  size: pt.oneOf(['sm', 'md', 'lg']),
}

const StyledWrapper = styled.img`
  border-radius: 50%;
  aspect-ratio: 1 / 1;

  ${({ $size }) => $size === 'sm' && `
    width: 40px;
  `}
  ${({ $size }) => $size === 'md' && `
    width: 60px;
  `}
  ${({ $size }) => $size === 'lg' && `
    width: 80px;
  `}
`

export default Avatar
