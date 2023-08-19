"use client"

import Form from "@components/Form"
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

function EditPost() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const postId = searchParams.get('id')


  const [submitting, setsSubmitting] = useState(false)
  const [post, setPost] = useState({
    thought: "",
    tag: "",
  })

  useEffect(() => {
    const postDetails = async () => {
      const response = await fetch(`/api/post/${postId}`)
      const data = await response.json();

      setPost({
        thought: data.thought,
        tag: data.tag
      })
    }

    if(postId) postDetails();
  }, [postId])
  
  const updatePost = async (e) => {
    e.preventDefault();
    setsSubmitting(true);

    if(!postId) return alert('Post ID not found')

    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          thought: post.thought,
          tag: post.tag,
        })
      })

      if (response.ok) {
        router.push('/');
      }

    } catch (error) {
      console.log(error);

    } finally {
      setsSubmitting(false);
    }

  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePost}
    />
  )
}

export default EditPost