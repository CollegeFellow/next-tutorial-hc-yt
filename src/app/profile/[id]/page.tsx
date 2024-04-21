const UserProfile = ({ params }: any) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>
        User Details{' '}
        <span className='bg-orange-500 text-black'>{params.id}</span>
      </h1>
    </div>
  )
}

export default UserProfile
