"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {

  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const postId = searchParams.get('id')
  const [post, setPost] = useState("")
  const [comments, setComments] = useState("")
  const [input, setInput] = useState(false)
  const [submitting, setSubmitting] = useState("")

  useEffect(() => {

    // post api fetching 
    const getPostDetails = async () => {
      const response = await fetch(`/api/post/${postId}`)
      const data = await response.json();
      setPost(data)
    };

    // comments api fetching 
    const getComments = async () => {
      const response = await fetch(`/api/comments/${postId}`)
      const data = await response.json();

      setComments(data)
    };
    
    if(postId) {
      getPostDetails();
      getComments();
    } 

  }, [postId])



  const addComment = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if(!session) return alert("Sign in to add a comment")
      const response = await fetch('/api/comments/new', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          comment: input,
          postId: post._id,
          userId: session?.user.id
        })
      })

      if (response.ok) {
        console.log('comment added successfully')
      }

    } catch (error) {
      console.log(error);

    } finally {
      setSubmitting(false);
      setInput("")
    }

  }


  return (
    <div className="grid gap-6">
      <span className="text-xl text-sky-500"># {post?.tag}</span>
      
      <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
      >
        { post && <Image
          src={post?.creator?.image}
          alt='user image'
          width={40}
          height={40}
          className='rounded-full object-contain'
        />}

        <div className='flex flex-col'>
          <h3 className='text-gray-900'>{post?.creator?.name}</h3>
          <p className='text-gray-500 text-sm'>{post?.creator?.email}</p>
        </div>
      </div>

      <div className="">
        <h3>{post?.thought}</h3>
      </div>

      <div className="mt-9">
        <h1 className="text-orange-400">Write a comments</h1>
        <div className="max-w-xl flex gap-3 mt-5">
          <form className='relative w-full flex-center w-70px'>
            <textarea type="text" 
              placeholder='Share your opinion here!'
              onChange={(e) => setInput(e.target.value)}
              required
              className='search_input peer'
            />
          </form>
          
          <button 
            className="bg-sky-300 px-5 py-2 rounded text-white"
            onClick={addComment}
            >
            {submitting? "Sending" : "Send"}
          </button>
        </div>
      </div>

      <div>
        
        <div className="my-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
          <h1>Comments</h1>

          {comments.length != 0 ? comments?.map((item) => {
            return (
              <div 
                className="p-3"
                key={item._id} 
              >
                <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
                >
                 {item && <Image
                    src={item?.creator?.image}
                    alt='user image'
                    width={40}
                    height={40}
                    className='rounded-full object-contain'
                  />}

                  <div className='flex flex-col'>
                    <h3 className='text-gray-900'>{item?.creator?.name}</h3>
                    {/* <p className='text-gray-500 text-sm'>{post?.creator?.email}</p> */}
                  </div>
                </div>
                <p className="mt-5 text-gray-600">{item.comment}</p>
              </div>
            )
          }) : <div className="text-rose-400"> Be the first to comment!</div> }
        </div>
      </div>
    </div>
  )
}
