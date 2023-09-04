
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
    username: "",
    email: "",
    password: "",
    validatePassword: "",
  }

  const [err, setErr] = useState("")
  const [ formData, setFormData ] = useState(initialData)
  const { username, email, password, validatePassword } = formData

  console.log(err)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }
  
  const RegisterUser = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password,
          validatePassword,
        })
      })
      
      const registerRes = await res.json()
      setErr(registerRes.message)

      if (res.ok) {
        console.log('Successfully registered')
        router.push('/login')
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
        <h1>Register</h1>
        <div className='center-all' style={{marginBottom: 10}}>
          <button  onClick={() => signIn('google')} className='btn' style={{marginBottom: 10}}>Login With Google</button>
          <span>or</span>
        </div>

        <form>
          <input required 
            className='email-input'
            type="name" 
            placeholder='Username' 
            name='username' 
            value={username} 
            onChange={handleInputChange}
          />
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
          <PasswordInput
            placeholder='Validate Password' 
            name='validatePassword' 
            value={validatePassword}  
            onChange={handleInputChange}
          />

          { err && 
            <h3 className='text-orange-700 text-center'>{err}</h3>
          }
          
          <button className='btn login-btn'  
            onClick={RegisterUser}
          >
            Register
          </button>

          <span>You have an account? <Link className='--link text-black ml-2' href='/login'>Login</Link></span>
          <Link className='link' href='/'>
            <small>Home</small>
          </Link>
        </form>
      </div>
    </section>
  )
}

export default Login