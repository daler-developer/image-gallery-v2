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

      <Link href={`/profile/${user._id}`} passHref>
        <StyledUsername>
          {user.username}
        </StyledUsername>
      </Link>

      {
        !user.isCurrentUser && (
          user.currentUserFollows ? (
            <StyledUnfollowBtn
              onClick={handlers.unfollowBtnClick}
              size='md'
              color='grey'
              isLoading={isUnfollowLoading}
            >
              UNFOLLOW
            </StyledUnfollowBtn>
          ) : (
            <StyledFollowBtn
              onClick={handlers.followBtnClick}
              size='md'
              color='blue'
              isLoading={isFollowLoading}
            >
              FOLLOW
            </StyledFollowBtn>
          )
        )
      }

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
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`

const StyledAvatar = styled(Avatar)`
  
`

const StyledUsername = styled.span`
  margin-left: 10px;
  font-weight: 500;
  font-size: 22px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const StyledFollowBtn = styled(Button)`
  margin-left: auto;
  align-self: stretch;
`

const StyledUnfollowBtn = styled(Button)`
  margin-left: auto;
  align-self: stretch;
`

export default UserCard
