'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast'

const Header = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/users/logout')
      toast.success(response.data.message)
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <header className='container p-4'>
      <Toaster />
      <div className='flex flex-row justify-between'>
        <div className='flex gap-4'>
          <Link href='/'>Home</Link>
          <Link href='/profile'>Profile</Link>
        </div>
        <div>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
