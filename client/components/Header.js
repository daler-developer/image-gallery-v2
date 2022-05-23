import styled, { css } from 'styled-components'
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
    leftClick(e) {
      setIsPopupHidden(false)
    },
    addPostBtnClick() {
      dispatch(uiActions.changedActiveModal('add-post'))
    },
    logoutBtnClick() {
      logout()
    },
    viewProfileBtnClick() {
      setIsPopupHidden(true)

      router.push(`/profile/${currentUser._id}`)
    },
    updateProfileBtnClick() {
      setIsPopupHidden(true)
      
      dispatch(uiActions.changedActiveModal('update-profile'))
    }
  }

  return (
    <StyledWrapper>
      <Container>
        <StyledBody>

          <StyledLeft onClick={handlers.leftClick}>
            <StyledAvatarWrapper>
              <StyledAvatar
                src={currentUser.avatarUrl}
                size='sm'
              />
              <StyledPopup
                isHidden={isPopupHidden}
                onClick={(e) => e.stopPropagation()}
                onClose={() => setIsPopupHidden(true)}
                btns={[
                  { text: 'Logout', onClick: handlers.logoutBtnClick },
                  { text: 'Profile', onClick: handlers.viewProfileBtnClick },
                  { text: 'Update profile', onClick: handlers.updateProfileBtnClick }
                ]}
              />
            </StyledAvatarWrapper>
            <StyledUsername>
              {currentUser.username}
            </StyledUsername>
          </StyledLeft>
          

          <StyledNav>

            <Link href='/home' passHref>
              <StyledLink $isActive={router.route === '/home'}>
                Home
              </StyledLink>
            </Link>

            <Link href='/users' passHref>
              <StyledLink $isActive={router.route === '/users'}>
                Users
              </StyledLink>
            </Link>

            <StyledLink onClick={handlers.addPostBtnClick}>
              Create
            </StyledLink>

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
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 5px 0px;
`

const StyledBody = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  column-gap: 6px;
`

const StyledLeft = styled.div`
  height: 90%;
  align-self: center;
  display: flex;
  column-gap: 6px;
  padding: 5px;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`

const StyledAvatarWrapper = styled.div`
  position: relative;
`

const StyledAvatar = styled(Avatar)`
  width: auto;
  height: 100%;
  cursor: pointer;
`

const StyledPopup = styled(Popup)`
  position: absolute;
  top: 100%;
  left: 0;
`

const StyledUsername = styled.span`
  font-weight: 600;
  font-size: 17px;
  align-self: center;
`

const StyledNav = styled.nav`
  align-self: stretch;
  display: flex;
  column-gap: 4px;
`

const StyledLink = styled.a`
  color: rgb(103, 117, 127);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  font-weight: 600;
  font-size: 14px;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom-color: rgb(41, 163, 239);
    color: rgb(41, 163, 239);
  }

  ${({ $isActive }) => $isActive && css`
    border-bottom-color: rgb(41, 163, 239);
    color: rgb(41, 163, 239);
  `}
`

export default Header
