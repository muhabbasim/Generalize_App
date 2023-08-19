"use client"
import { useEffect, useState } from 'react'
import PostCartList from './PostCartList'



function Feed() {

  const [ posts, setPosts ] = useState('')
  const [ searchText, setSearchText ] = useState('')

  const hanldeSearchChange = () => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/post')
      const data = await response.json()

      setPosts(data);
    }
    fetchPosts();
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type="text" 
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={hanldeSearchChange}
          required
          className='search_input peer outline-none'
        />
      </form>


      <PostCartList
        data={posts}
      />
    </section>
  )
}

export default Feed