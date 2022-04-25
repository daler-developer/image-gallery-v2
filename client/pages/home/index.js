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
  const feedPostsFetchingStatus = useSelector((state) => selectFeedPostsFetchingStatus(state))

  useEffect(() => {
    if (feedPostsFetchingStatus === 'idle') {
      dispatch(postsActions.fetchedFeedPosts())
    }
  }, [])

  const handlers = {
    imageInputChange(e) {
      dispatch(postsActions.created({ image: e.target.files[0] }))
    }
  }

  return <>
    <StyledWrapper>
      <Button onClick={() => imageInputRef.current?.click()} size='md'>
        Add
      </Button>
      <StyledPosts list={posts} />
    </StyledWrapper>

    <input type="file" ref={imageInputRef} onChange={handlers.imageInputChange} hidden />
  </>
}

const StyledWrapper = styled.div`
  
`

const StyledContainer = styled(Container)`

`

const StyledPosts = styled(Posts)`
  margin-top: 20px;
`

Home.getLayout = (page) => {
  return (
    <Layout>
      {page}
    </Layout> 
  )
}

export default Home
