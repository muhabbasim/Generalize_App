"use client"

import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useRouter, redirect } from "next/navigation";
import { useEffect, useState } from "react";

function page() {
  const router = useRouter()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated(){
      redirect('/login?callbackUrl=/profile')
    }
  });
  const userId = session?.user.id

  const [myPosts, setMyPosts] = useState([])


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`)
      const data = await response.json()

      setMyPosts(data);
    }

    if(userId) fetchPosts();
  }, [userId])

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
        
        const filteredPost = myPosts.filter((p) => post._id !== p._id )
        setMyPosts(filteredPost)
  
      } catch (error) {
        console.log(error);
      } 
    }
  }



  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default page