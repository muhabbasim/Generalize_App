import Post from "@models/thought";
import { connectToDB } from "@utils/databas"

export const GET = async (req, res) => {

  const { searchParams } = new URL(req.url);

  const limit = 6
  const page = searchParams.get('page');
  const skip = (page - 1) * limit;
  
  try {
    await connectToDB();

    const posts = await Post
      .find({})
      .skip(skip)
      .limit(parseInt(limit))
      .sort({'createdAt': -1})
      .populate('creator') // populate function to get creator info
    
    const totalPosts = await Post.countDocuments();

    return new Response(JSON.stringify({posts: posts, totalPosts:totalPosts}), { status: 200 })
  } catch (error) {
    return new Response('Failed to find all posts', { status: 500})
  }
}
