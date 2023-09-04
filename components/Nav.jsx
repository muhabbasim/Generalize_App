"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'


function Nav() {
  const router = useRouter();
  const { data: session } = useSession()
  const [ toggleDropDown, setToggleDropDown ] = useState(false);

  return (
    <div className='flex-between w-full my-4 mb-16'>
      <Link href="/" className='flex gap-2 flex-center '>
        <span className='logo_text'>Generatorize App</span>
      </Link>

      {/* Desktop Navigation  */}
      <div className='sm:flex hidden'>
        { session?.user ? (
            <div className='flex justify-center items-center gap-3 md:gap-4'>
              <Link className='gray_btn' href="/create-post">
                Create Post
              </Link>
              
              <button type='button' className='gray_btn' onClick={() => signOut()}>
                Sign Out
              </button>

              <Link href='/profile'>
                <Image
                  src={session.user.image}
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile image'
                />
              </Link>

              <span>{session.user.name}</span>
            </div>
          ) : (
            <>
            { !session && 
              <button
                type='button'
                onClick={() => router.push('/login')}
                className='gray_btn'
              >
                Sign In
              </button>
            }
          </>
          )
        }
      </div>

      {/* Mobile Navigation  */}
        <div className='sm:hidden flex relative'>
          { session?.user ? (
            <div>
              <Image
                src={session.user.image}
                width={37}
                height={37}
                className='rounded-full cursor-pointer'
                alt='profile image'
                onClick={() => setToggleDropDown((perv) => !perv)}
              />

              { toggleDropDown && 
                <div className='dropdown'>
                  <Link
                    href="/profile"
                    className='dropdown_link'
                    onClick={() => setToggleDropDown(false)}
                  >
                    My profile
                  </Link>
                  <Link
                    href="/create-one"
                    className='dropdown_link'
                    onClick={() => setToggleDropDown(false)}
                  >
                    Create one
                  </Link>
                  <button 
                    className='mt-5 w-full gray_btn' 
                    type='button'
                    onClick={() => {
                      setToggleDropDown(false)
                      signOut();
                    }}
                  >
                    Sign out
                  </button>
                </div>
              }
            </div>
          ) : (
            <>
              { !session && 
                <button
                  type='button'
                  onClick={() => router.push('/login')}
                  className='gray_btn'
                >
                  Sign In
                </button>
              }
            </>
          )
        }
        </div>
    </div>
  )
}

export default Nav