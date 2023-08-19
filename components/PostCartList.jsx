import React from 'react'
import PostCard from './PostCard'

function PostCartList({ data }) {
  return (
    <div className='mt-6 prompt_layout'>
      {data && data.map((post) => {
        return (
          <PostCard
            key={post._id}
            post={post}

          />
        )
      })}
    </div>
  )
}

export default PostCartList