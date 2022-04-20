import pt from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import Avatar from './Avatar'
import Button from './Button'
import useFollow from '../../hooks/useFollow'
import useUnfollow from '../../hooks/useUnfollow'

const UserCard = ({ user }) => {

  const follow = useFollow()
  const unfollow = useUnfollow()

  const handlers = {
    viewProfileBtnClick() {

    },
    followBtnClick() {
      follow.mutate({ _id: user._id })
    },
    unfollowBtnClick() {
      unfollow.mutate({ _id: user._id })
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
          <Button onClick={handlers.unfollowBtnClick} isLoading={unfollow.isLoading}>
            Unfollow
          </Button>
        ) : (
          <Button onClick={handlers.followBtnClick} isLoading={follow.isLoading}>
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
