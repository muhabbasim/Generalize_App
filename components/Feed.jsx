"use client"
import { useEffect, useState } from 'react'
import PostCartList from './PostCartList'



function Feed() {

  const [ posts, setPosts ] = useState('')
  
  const [ searchText, setSearchText ] = useState('')
  const [ searchedResult, setSearchedResult ] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null);

  // filter function
  const filterPosts = (textInput) => {
    const regex = new RegExp(textInput, 'i');  // 'i' flag for case-insensitive search

    return posts.filter((post) => 
      regex.test(post.creator.name) ||
      regex.test(post.thought) ||
      regex.test(post.tag)
    );
  };

  //input change handler
  const hanldeSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    
    setSearchTimeout(
      setTimeout(() => {
        const results = filterPosts(searchText);
        setSearchedResult(results)
      }, 500)
    )
  }

  // TagClick function

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const tagFilterResult = filterPosts(tagName)
    setSearchedResult(tagFilterResult)
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
          className='search_input peer'
        />
      </form>

      {searchedResult ? (
        <PostCartList
          data={searchedResult}
          handleTagClick={handleTagClick}
        /> 

      ) : (
          <PostCartList
          data={posts}
          handleTagClick={handleTagClick}
        />
        )
      }
      
    </section>
  )
}

export default Feed