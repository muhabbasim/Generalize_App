"use client"

import Form from "@components/Form"
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react"

function CreatePost() {
  
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated(){
      redirect('/login?callbackUrl=/create-post')
    }
  });

  const [submitting, setsSubmitting] = useState(false)
  const [err, setErr] = useState("")
  const [post, setPost] = useState({
    thought: "",
    tag: "",
  })

  console.log(err)

  const createPost = async (e) => {
    e.preventDefault();
    setsSubmitting(true);

    try {
      const response = await fetch('/api/post/new', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          thought: post.thought,
          tag: post.tag,
          userId: session?.user.id
        })
      })

      const createRes = await response.json();
      setErr(createRes)

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