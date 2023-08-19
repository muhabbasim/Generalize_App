"use client"

import Form from "@components/Form"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react"

function CreatePost() {
  
  const router = useRouter();

  const { data: session } = useSession();

  const [submitting, setsSubmitting] = useState(false)
  const [post, setPost] = useState({
    thought: "",
    tag: "",
  })

  const createPost = async (e) => {
    e.preventDefault();
    setsSubmitting(true);

    try {
      const response = await fetch('/api/post/new', {
        method: 'POST',
        body: JSON.stringify({
          thought: post.thought,
          tag: post.tag,
          userId: session?.user.id
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
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  )
}

export default CreatePost