import Comments from "@models/comments";
import { connectToDB } from "@utils/databas"
import { NextResponse } from "next/server";

export const GET = async (res, { params }) => {

  const postId = params.id
  try {
    await connectToDB();
    const comments = await Comments.find({ postId: params.id }).populate('creator')

    if(!comments) {
      return NextResponse.json({ message: "Comments not found"}, { status: 500 });
    } 

    return NextResponse.json( comments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error}, { status: 500 });
  }
}