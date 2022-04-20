import styled from 'styled-components'
import Layout from '../../components/common/Layout'
import Container from '../../components/common/Container'

const Home = () => {

  return (
    <StyledWrapper>
      
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  
`

const StyledContainer = styled(Container)`

`

Home.getLayout = (page) => {
  return (
    <Layout>
      {page}
    </Layout> 
  )
}

export default Home
