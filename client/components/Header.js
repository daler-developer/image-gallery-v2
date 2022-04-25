import styled from 'styled-components'
import useCurrentUser from '../hooks/useCurrentUser'
import Container from './common/Container'
import Avatar from './common/Avatar'
import logo from '../public/logo.jpg'

const Header = ({}) => {

  const currentUser = useCurrentUser()

  const handleLogoutBtnClick = () => {
    currentUser.logout()
  }

  return (
    <StyledWrapper>
      <Container>
        <StyledBody>

          <StyledLogo
            src={logo.src}
          />

          <StyledAvatar
            src={currentUser.avatarUrl}
            onClick={() => currentUser.logout()}
          />

        </StyledBody>
      </Container>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 1000;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`

const StyledBody = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
`

const StyledLogo = styled.img`
  aspect-ratio: 1 / 1;
  height: 100%;
`

const StyledAvatar = styled(Avatar)`
`

export default Header
