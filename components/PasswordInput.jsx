"use client"
import React, { useState } from 'react'
import './PasswordInput.scss'
import {AiOutlineEyeInvisible} from 'react-icons/ai'
import {MdOutlineVisibility} from 'react-icons/md'


export default function PasswordInput({placeholder, value, onChange, name}) {
  const [ showPassword, setShowPassword ] = useState(false)


  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='password-input'>
      <input 
        required 
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        name={name}
        value={value}  
        onChange={onChange}
      />
      <div className="visiblePassword" onClick={togglePassword}>
        { showPassword
          ? <MdOutlineVisibility size={18}/>
          : <AiOutlineEyeInvisible size={18}/>
        }
      </div>
    </div>
  )
}
