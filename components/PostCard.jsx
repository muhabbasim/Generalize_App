"use client"
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react'


function PostCard({ post, handleTagClick, handleEdit, handleDelete }) {
  
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("")
  
  const handleCopy = () => {
    setCopied(post.thought)
    navigator.clipboard.writeText(post.thought); // to copy the input
    setTimeout(() => setCopied(''), 3000); // delete the copy
  }

  return (
    <div className='prompt_card'>
      <div className='flex jusfiy-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image
            src={post.creator.image}
            alt='user image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='text-gray-900'>{post.creator.name}</h3>
            <p className='text-gray-500 text-sm'>{post.creator.email}</p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={ copied === post.thought 
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
            alt='copy image'
          />

        </div>
      </div>
      <p 
        className='my-4 text-sm text-gray-700'
        onClick={()=> handleTagClick && handleTagClick(post.tag)}
      >
        {post.thought}
      </p>
      <p className='font-inter text-sm blue_gradient cursor-pointer'>
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && 
        pathname === "/profile" && (
          <div className='flex justify-between mt-3 border-t border-gray-100'>
            <p 
              className='font-inter text-sm green_gradient cursor-pointer'
              onClick={handleEdit}
            >
              Edit
            </p>
            <p 
              className='font-inter text-sm orange_gradient cursor-pointer'
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )

      }
    </div>
  )
}

export default PostCard