import React from 'react'
import PostCard from './PostCard'

function PostCartList({ data, handleTagClick }) {
  return (
    <div className='mt-6 prompt_layout'>
      {/* {data && data.map((post) => post.thought.includes(searchText) (
        <PostCard/>
      ))} */}
      {data && data.map((post) => {
        return (
          <PostCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        )
      })}
    </div>
  )
}

export default PostCartList