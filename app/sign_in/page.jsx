"use client"

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function page() {

const router = useRouter();
  const hanldeSignIn = () => {
    signIn()
    router.push('/')
  }
  return (
    <section>
      <form>
        <button
          className='bg-black px-5 py-2 text-white rounded'
          onClick={hanldeSignIn}
        >
          Sign In with Google Account
        </button>
      </form>
    </section>
  )
}

export default page