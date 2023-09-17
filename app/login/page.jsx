
"use client"

import { signIn } from 'next-auth/react';
import { useState } from 'react'
import './style.scss'
import {SlLogin} from 'react-icons/sl'
import PasswordInput from '@components/PasswordInput'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

function Login() {

  const router = useRouter()

  const initialData = {
    email: "",
    password: "",
  }

  const [error, setError] = useState("");
  const [ formData, setFormData ] = useState(initialData)
  const { email, password } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }
  
  const loginUser = async (e) => {
    e.preventDefault()

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/"
      });
      
      if( res && !res.error) {
        router.push(res.url)

      } else {
        setError("Wrong email or password")
        console.log('Error', res)
      }
      
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className='login-auth '>
      <div className='login-page glassmorphism'>
        <div className='center-all' >
          <SlLogin size={25} color="gray"/>
        </div>
        <h1>Login</h1>
        <div className='center-all' style={{marginBottom: 10}}>
          <button  onClick={() => signIn('google', { callbackUrl: '/' })} className='btn' style={{marginBottom: 10}}>Login With Google</button>
          <span>or</span>
        </div>

        <form>
          <input required 
            className='email-input'
            type="email" 
            placeholder='Email' 
            name='email' 
            value={email} 
            onChange={handleInputChange}
          />
          <PasswordInput
            placeholder='Password' 
            name='password' 
            value={password}  
            onChange={handleInputChange}
          />

          { error && 
            <h3 className='text-orange-700 text-center'>{error}</h3>
          }
          
          <button className='btn login-btn'  
            onClick={loginUser}
          >
            Login
          </button>

          <span>You don't have an account? <Link className='--link text-black ml-3' href='/register'>Register</Link></span>
          <Link className='link' href='/'>
            <small>Home</small>
          </Link>
        </form>
      </div>
    </section>
  )
}

export default Login