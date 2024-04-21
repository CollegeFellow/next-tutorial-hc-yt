'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const SignupPage = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  const onSignup = async () => {
    try {
      setLoading(true)

      const response = await axios.post('/api/users/signup', user)
      console.log(
        '🎯  👉(^ . ^)===👉 ~ onSignup ~ response.data:',
        response.data,
      )

      router.push('/login')
    } catch (error: any) {
      console.log('🎯  👉(^ . ^)===👉 ~ onSignup ~ error:', error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? 'Processing' : 'Signup'}</h1>
      <hr />
      <label htmlFor='username'>username</label>
      <input
        className='text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        id='username'
        type='text'
        value={user.username}
        onChange={e => setUser({ ...user, username: e.target.value })}
        placeholder='username'
      />
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
        onClick={onSignup}
      >
        Signup here
      </button>
      <Link href='/login'>Already signed-up? Login here</Link>
    </div>
  )
}

export default SignupPage
