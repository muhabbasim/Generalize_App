import Post from "@models/thought";
import { connectToDB } from "@utils/databas";

export const POST = async (req) => {

  const { tag, thought, userId } = await req.json();
  try {

    await connectToDB();
    const newPost = new Post({
      thought,
      tag,
      creator: userId,
    });

    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 200 });
  } catch (error) {
    // return new Response("Failed to create a new prompt", { status: 500 });
    
  }


}