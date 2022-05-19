import styled from 'styled-components'
import Link from 'next/link'
import useCurrentUser from '../hooks/useCurrentUser'
import Container from './common/Container'
import Avatar from './common/Avatar'
import logo from '../public/logo.jpg'
import IconButton from './common/IconButton'
import { useDispatch } from 'react-redux'
import { uiActions } from '../redux/reducers/uiReducer'
import Popup from './common/Popup'
import { useState } from 'react'
import { useRouter } from 'next/router'
import useAuth from '../hooks/useAuth'

const Header = ({}) => {
  const [isPopupHidden, setIsPopupHidden] = useState(true)

  const { currentUser, logout } = useAuth()

  const router = useRouter()

  const dispatch = useDispatch()

  const handlers = {
    addPostBtnClick() {
      dispatch(uiActions.changedActiveModal('add-post'))
    },
    logoutBtnClick() {
      logout()
    },
    viewProfileBtnClick() {
      setIsPopupHidden(true)

      router.push(`/profile/${currentUser._id}`)
    }
  }

  return (
    <StyledWrapper>
      <Container>
        <StyledBody>


          <StyledLogo
            src={logo.src}
          />
          

          <StyledNav>

            <Link href='/home' passHref>
              <IconButton size='md'>
                home
              </IconButton>
            </Link>

            <Link href='/users' passHref>
              <IconButton size='md'>
                people
              </IconButton>
            </Link>

            <IconButton size='md' title='add image' onClick={handlers.addPostBtnClick}>
              add
            </IconButton>
            
            <StyledAvatarWrapper>
              <StyledAvatar
                src={currentUser.avatarUrl}
                size='md'
                onClick={() => setIsPopupHidden(false)}
              />
              <StyledPopup
                isHidden={isPopupHidden}
                onClose={() => setIsPopupHidden(true)}
                btns={[
                  { text: 'Logout', onClick: handlers.logoutBtnClick },
                  { text: 'Profile', onClick: handlers.viewProfileBtnClick }
                ]}
              />
            </StyledAvatarWrapper>

          </StyledNav>


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
  border: 1px solid rgb(219,219,219);
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

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  column-gap: 4px;
`

const StyledAvatarWrapper = styled.div`
  position: relative;
`

const StyledPopup = styled(Popup)`
  position: absolute;
  top: 100%;
  right: 0;
`

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
`

export default Header
