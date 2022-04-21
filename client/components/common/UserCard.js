import pt from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import Avatar from './Avatar'
import Button from './Button'

const UserCard = ({ user }) => {
  
  const dispatch = useDispatch()

  const handlers = {
    viewProfileBtnClick() {

    },
    followBtnClick() {

    },
    unfollowBtnClick() {

    }
  }

  return (
    <StyledWrapper>

      <StyledAvatar
        src={user.avatarUrl}
        size='md'
      />

      <StyledUsername>
        {user.username}
      </StyledUsername>

      {
        user.currentUserFollows ? (
          <Button onClick={handlers.unfollowBtnClick} isLoading={false}>
            Unfollow
          </Button>
        ) : (
          <Button onClick={handlers.followBtnClick} isLoading={false}>
            Follow
          </Button>
        )
      }

      <Link href={`/profile/${user._id}`} passHref>
        <StyledViewProfileLink type='button' size='md'>
          View profile
        </StyledViewProfileLink>
      </Link>

    </StyledWrapper>
  )
}

UserCard.propTypes = {
  user: pt.shape({
    _id: pt.string.isRequired,
    username: pt.string.isRequired,
    avatarUrl: pt.string
  }).isRequired
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

const StyledViewProfileLink = styled.a`
  margin-top: 40px;
`

const StyledFollowBtn = styled.button`
  
`

const StyledUnfollowBtn = styled.button`
  
`

export default UserCard
