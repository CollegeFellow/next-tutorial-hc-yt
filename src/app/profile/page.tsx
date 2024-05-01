'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUserAwaited = async () => {
      const res = await axios.get('/api/users/me')
      setUser(res.data.user)
    }

    getUserAwaited()
  }, [])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile Page</h1>
      <hr />
      <h2>Username: {user?.username || 'Not found!'}</h2>
    </div>
  )
}

export default ProfilePage
