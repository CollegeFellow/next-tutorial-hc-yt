'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  const onLogin = async () => {
    try {
      setLoading(true)

      const response = await axios.post('/api/users/login', user)
      console.log('🎯  👉(^ . ^)===👉 ~ onLogin ~ response:', response)
      toast.success('Login success')

      router.push('/profile')
    } catch (error: any) {
      console.log('🎯  👉(^ . ^)===👉 ~ onLogin ~ error:', error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? 'Processing' : 'Login'}</h1>
      <hr />
      <label htmlFor='email'>email</label>
      <input
        className='text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        id='email'
        type='email'
        value={user.email}
        onChange={e => setUser({ ...user, email: e.target.value })}
        placeholder='email'
      />
      <label htmlFor='password'>password</label>
      <input
        className='text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        id='password'
        type='password'
        value={user.password}
        onChange={e => setUser({ ...user, password: e.target.value })}
        placeholder='password'
      />
      <button
        className={`p-2 border ${
          buttonDisabled
            ? 'text-gray-600 cursor-not-allowed'
            : 'text-white cursor-pointer'
        } border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600`}
        onClick={onLogin}
      >
        Login here
      </button>
      <Link href='/signup'>Don't have an account? Sign-up here.</Link>
    </div>
  )
}

export default LoginPage
