import RegisterUser from "@models/users";
import { connectToDB } from "@utils/databas"
import bcrypt from 'bcryptjs'; 
import { NextResponse } from "next/server";

export const POST = async (req) => {

  const { username, email, password, validatePassword } = await req.json();
  
  try {
    await connectToDB()

    if( !username || !email || !password || !validatePassword ) {
      return NextResponse.json({ message: "Please all fields required"}, { status: 500 });
    }
    
    if (password === validatePassword) {
      
      const userExists = await RegisterUser.findOne({ email })
      if(userExists) return  NextResponse.json({ message: "User already exists"}, { status: 500 });
  
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt)
  
      const user = new RegisterUser({
        name: username,
        email,
        password: hashedPassword
      })
  
      await user.save()
      return NextResponse.json({ message: "User successfully registered ", data: user }, { status: 200 });

    } else {
      return NextResponse.json({ message: "Password doe not match"}, { status: 500 });
    }

  } catch (error) {
    console.log(error);
    return NextResponse.json({message: error.message}, { status: 500 });
  }

} 
