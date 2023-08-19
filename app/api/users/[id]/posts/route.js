import Post from "@models/thought"
import { connectToDB } from "@utils/databas";

export const GET = async (request, { params }) => {
  // params populated if we pass a dinamic variable "the file [id]" into the URL
  try {

    await connectToDB();
    const posts = await Post.find({ 
      creator: params.id
    }).populate('creator');

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response('failed to get specified post', { status: 500 })
  }
} 