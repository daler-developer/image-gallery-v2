import pt from 'prop-types'
import styled from 'styled-components'
import emptyAvatar from '../../public/empty-avatar.png'
import Avatar from './Avatar'
import Button from './Button'

const UserCard = ({ user }) => {
  return (
    <StyledWrapper>

      <StyledAvatar
        src={user.avatarUrl}
        size='md'
      />

      <StyledUsername>
        {user.username}
      </StyledUsername>

      <StyledViewProfileBtn type='button' size='md'>
        View profile
      </StyledViewProfileBtn>

    </StyledWrapper>
  )
}

UserCard.propTypes = {
  user: pt.shape({
    _id: pt.string.isRequired,
    username: pt.string.isRequired,
    avatarUrl: pt.string
  })
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid black;
`

const StyledAvatar = styled(Avatar)`
  
`

const StyledUsername = styled.span`
  margin-top: 5px;
  font-weight: 500;
  font-size: 18px;
`

const StyledViewProfileBtn = styled(Button)`
  margin-top: 40px;
`

export default UserCard
