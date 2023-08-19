import Post from "@models/thought";
import { connectToDB } from "@utils/databas"

export const GET = async (request) => {
  try {
    await connectToDB();
    const posts = await Post.find({}).populate('creator') // populate function to get creator info
    return new Response(JSON.stringify(posts), { status: 200 })
  } catch (error) {
    return new Response('Failed to find all posts', { status: 500})
  }
}

