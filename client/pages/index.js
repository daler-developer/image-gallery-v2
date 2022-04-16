import { useQuery } from 'react-query'
import axios from 'axios'
import Link from 'next/link'

const Home = () => {
  const posts = useQuery('posts', async () => await axios.get('https://jsonplaceholder.typicode.com/posts'))

  return (

    <div>
      <Link href="/about">About</Link>
      {
        posts.data?.data.map((post) => (
          <h4>{post.title}</h4>
        ))
      }
    </div>
  )
}

export default Home
