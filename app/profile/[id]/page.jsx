"use client"

import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function PosterProfile({ params }) {
  const searchParams = useSearchParams()
  const posterName = searchParams.get('name')

  const [userPosts, setuserPosts] = useState([])
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`)
      const data = await response.json()

      setuserPosts(data);
    }

    if(params.id) fetchPosts();
  }, [params.id])


  return (
    <Profile
      name={posterName}
      desc={`Welcome to ${posterName}'s personalized profile page.`}
      data={userPosts}
    />
  )
}

export default PosterProfile