import User from "@models/user";
import { connectToDB } from "@utils/databas";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  
  callbacks: {
    async session({ session }) {
  
      const sessionUser = await User.findOne({
        email: session.user.email
      })
  
      //update session
      session.user.id = sessionUser._id.toString();
      return session;
    },
  
    async signIn({ profile }) {
  
      try {
        await connectToDB();
  
        // check if user exists already
        const userExist = await User.findOne({
          email: profile.email
        })
  
        // if not, create a new user
        if (!userExist) {
          await User.create({
            email: profile.email,
            name: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture
          })
        }
  
        return true;
      } catch (error) {

        console.log(error);
        return false;
      }
      
    }

  }

})

export { handler as GET, handler as POST }
