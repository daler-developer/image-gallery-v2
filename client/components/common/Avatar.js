import pt from 'prop-types'
import Image from 'next/image'
import styled from 'styled-components'
import emptyAvatar from '../../public/empty-avatar.png'

const Avatar = ({ size = 'md', src = null, ...rest }) => {
  return (
    <StyledWrapper
      $size={size}
      {...rest}
    >
      <Image src={src || emptyAvatar} layout='fill' />
    </StyledWrapper>
  )
}

Avatar.propTypes = {
  size: pt.oneOf(['sm', 'md', 'lg']),
  src: pt.string
}

const StyledWrapper = styled.div`
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  position: relative;
  overflow: hidden;

  ${({ $size }) => $size === 'sm' && `
    width: 34px;
  `}
  ${({ $size }) => $size === 'md' && `
    width: 40px;
  `}
  ${({ $size }) => $size === 'lg' && `
    width: 120px;
  `}
`

export default Avatar
