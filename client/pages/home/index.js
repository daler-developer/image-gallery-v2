import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/common/Layout'
import Container from '../../components/common/Container'
import Button from '../../components/common/Button'
import { useEffect, useRef } from 'react'
import { postsActions, selectFeedPosts, selectFeedPostsFetchingStatus } from '../../redux/reducers/postsReducer'
import Posts from '../../components/common/Posts'

const Home = () => {
  const dispatch = useDispatch()

  const imageInputRef = useRef(null)

  const posts = useSelector((state) => selectFeedPosts(state))
  const status = useSelector((state) => selectFeedPostsFetchingStatus(state))

  useEffect(() => {
    if (status === 'idle') {
      dispatch(postsActions.fetchedFeedPosts({ offset: posts.length }))
    }
  }, [])

  const handlers = {
    imageInputChange(e) {
      dispatch(postsActions.created({ image: e.target.files[0] }))
    },
    loadMoreBtnClick() {
      dispatch(postsActions.fetchedFeedPosts({ offset: posts.length }))
    }
  }

  return <>
    <StyledWrapper>
      <StyledPosts list={posts} isFetching={status === 'fetching'} onLoadMoreBtnClick={handlers.loadMoreBtnClick} />
    </StyledWrapper>

    <input type="file" ref={imageInputRef} onChange={handlers.imageInputChange} hidden />
  </>
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledPosts = styled(Posts)`
  margin-top: 20px;
  align-self: center;
  max-width: 500px;
  width: 100%;
`

Home.getLayout = (page) => {
  return (
    <Layout>
      {page}
    </Layout> 
  )
}

export default Home
