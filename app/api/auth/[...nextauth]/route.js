import { connectToDB } from "@utils/databas";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'; 
import RegisterUser from "@models/users";


const authOptions = ({

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      async signIn({ profile }) {
    
        try {
          await connectToDB();
    
          // check if user exists already
          const userExist = await RegisterUser.findOne({
            email: profile.email
          })
    
          // if not, create a new user
          if (!userExist) {
            await RegisterUser.create({
              email: profile.email,
              name: profile.name.replace(" ", ""),
              image: profile.picture
            })
          }
    
          return true;
        } catch (error) {
  
          console.log(error);
          return false;
        }
        
      },

    }), 

    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        if(!email || !password) {
          throw new Error("Please provide email and password")
        }

        try {
          await connectToDB()
          const user = await RegisterUser.findOne({ email })
          if(!user) throw new Error("User is not registered")

          const correctPassword = await bcrypt.compare(password, user.password);

          if (!correctPassword) {
            throw new Error("Incorrect password")
          }

          return user
        } catch (error) {
          console.log(error);
        }
      },

     
    })
    
  ],

  callbacks: {

    async jwt({ token, user, session }) {
      // console.log("jwt callback", {token, user, session}) 

      // passing user id to the token
      if(user) {
        const sessionUser = await RegisterUser.findOne({
          email: user.email
        })
    
        //update session
        user._id = sessionUser._id.toString();

        return {
          ...token,
          id: user._id
        }
      }
      return token
    },

    async session({ session, user, token }) {
      // console.log("session callback", {token, user, session})

      // passing in user id to the session
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        }
      }
    },

  },


})

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }


