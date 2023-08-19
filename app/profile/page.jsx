"use client"

import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function page() {
  const router = useRouter()
  const { data: session } = useSession();
  const [posts, setPosts] = useState([])


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()

      setPosts(data);
    }

    if(session?.user.id) fetchPosts();
  }, [])

  // Edit function
  const handleEdit = async (post) => {
    router.push(`/update_post?id=${post._id}`)
  }

  // Delete function
  const handleDelete = async (post) => {

    const hasConfirmed = confirm(`Are you sure you want to delete this post?`);

    if(hasConfirmed) {
      try {
        const response = await fetch(`/api/post/${post._id}`, {
          method: 'DELETE',
        })
        
        const filteredPost = posts.filter((p) => post._id !== p._id )
        setPosts(filteredPost)
  
      } catch (error) {
        console.log(error);
      } 
    }
  }



  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default page