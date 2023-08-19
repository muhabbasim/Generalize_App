import Post from "@models/thought";
import { connectToDB } from "@utils/databas";


// Get
export const GET = async (request, {params}) => {
  try {

    await connectToDB();
    const post = await Post.findById({ _id: params.id }).populate('creator');
    if(!post) return new Response("post not found", {status: 404})

    return new Response(JSON.stringify(post), { status: 200 })
  } catch (error) {
    return new Response('Failed to find the posts', { status: 500})
  }
}

// Patch (update)
export const PATCH = async (request, {params}) => {
  const { thought, tag } = await request.json();
  
  try {

    await connectToDB();

    const existingPost = await Post.findById({ _id: params.id });
    if(!existingPost) return new Response('posts not found', { status: 404 })

    existingPost.thought = thought
    existingPost.tag = tag

    await existingPost.save();

    return new Response(JSON.stringify(existingPost), { status: 200 })
  } catch (error) {
    return new Response('Failed to find update post', { status: 500})
  }
}

// Delete
export const DELETE = async (request, {params}) => {

  try {
    await connectToDB();

    const post = await Post.findByIdAndRemove({ _id: params.id });

    return new Response("posts deleted successfully", { status: 200 })
  } catch (error) {
    return new Response('Failed to delete post', { status: 500})
  }
}


