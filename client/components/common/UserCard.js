import pt from 'prop-types'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import Avatar from './Avatar'
import Button from './Button'
import { usersActions } from '../../redux/reducers/usersReducer'
import { useState } from 'react'

const UserCard = ({ user }) => {
  const [isFollowLoading, setIsFollowLoading] = useState(false)
  const [isUnfollowLoading, setIsUnfollowLoading] = useState(false)
  
  const dispatch = useDispatch()

  const handlers = {
    viewProfileBtnClick() {

    },
    async followBtnClick() {
      setIsFollowLoading(true)
      await dispatch(usersActions.followedUser({ userId: user._id }))
      setIsFollowLoading(false)
    },
    async unfollowBtnClick() {
      setIsUnfollowLoading(true)
      await dispatch(usersActions.unfollowedUser({ userId: user._id }))
      setIsUnfollowLoading(false)
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
          <StyledUnfollowBtn
            onClick={handlers.unfollowBtnClick}
            size='sm'
            color='grey'
            isLoading={isUnfollowLoading}
          >
            unfollow
          </StyledUnfollowBtn>
        ) : (
          <StyledFollowBtn
            onClick={handlers.followBtnClick}
            size='sm'
            color='blue'
            isLoading={isFollowLoading}
          >
            follow
          </StyledFollowBtn>
        )
      }

      <Link href={`/profile/${user._id}`} passHref>
        <StyledViewProfileLink type='button' color='grey' size='sm'>
          view profile
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
`

const StyledAvatar = styled(Avatar)`
  
`

const StyledUsername = styled.span`
  margin-top: 5px;
  font-weight: 500;
  font-size: 18px;
`

const StyledViewProfileLink = styled(Button)`
  margin-top: 2px;
  align-self: stretch;
`

const StyledFollowBtn = styled(Button)`
  margin-top: 30px;
  align-self: stretch;
`

const StyledUnfollowBtn = styled(Button)`
  margin-top: 30px;
  align-self: stretch;
`

export default UserCard
