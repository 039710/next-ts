import axios from 'axios'
export async function getServerSideProps(context : any) {
  const { req, res,query } = context
  let user = await axios.get('https://randomuser.me/api/')
  user = user.data.results[0]
  console.log(query)
  // console.log('user', user)
  if (!user) {
    // redirect to login page
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
      props : {}
    }
  }
  return {
    props: { user },
  }

}


const Profile = ({ user }) => {
  // Show the user. No loading state is required
  // because the page will redirect if the user is not authenticated
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <p className='text-2xl'>Your Profile</p>
      <p className="text-[30px]">{user.name.title} {user.name.first} {user.name.last}</p>
    </div>
  )
}

export default Profile
