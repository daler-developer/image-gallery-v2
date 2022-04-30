import styled from 'styled-components'
import Link from 'next/link'
import useCurrentUser from '../hooks/useCurrentUser'
import Container from './common/Container'
import Avatar from './common/Avatar'
import logo from '../public/logo.jpg'
import IconButton from './common/IconButton'
import { useDispatch } from 'react-redux'
import { uiActions } from '../redux/reducers/uiReducer'

const Header = ({}) => {
  const currentUser = useCurrentUser()

  const dispatch = useDispatch()

  const handlers = {
    addPostBtnClick() {
      dispatch(uiActions.changedActiveModal('add-post'))
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
              <IconButton size='sm'>
                home
              </IconButton>
            </Link>

            <Link href='/users' passHref>
              <IconButton size='sm'>
                people
              </IconButton>
            </Link>

            <IconButton size='sm' title='add image' onClick={handlers.addPostBtnClick}>
              add
            </IconButton>
            
            <Link href={`/profile/${currentUser._id}`} passHref>
              <StyledAvatar
                src={currentUser.avatarUrl}
                size='sm'
              />
            </Link>

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
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`

const StyledBody = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
`

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  column-gap: 4px;
`

const StyledLogo = styled.img`
  aspect-ratio: 1 / 1;
  height: 100%;
`

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
`

export default Header
