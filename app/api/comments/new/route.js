import Comments from "@models/comments";
import { connectToDB } from "@utils/databas";
import { NextResponse } from "next/server";

export const POST = async (req) => {

  const { postId, comment, userId } = await req.json();

  try {
    await connectToDB();

    if(!comment) {
      return  NextResponse.json({ message: "comment is required"}, { status: 500 });
    }
    
    const newComment = new Comments({
      creator: userId,
      comment,
      postId,
    })

    await newComment.save()
    return  NextResponse.json({ message: "comment is created successfully"}, { status: 200 });

  } catch (error) {
    return  NextResponse.json({ message: error}, { status: 500 });
  }
}