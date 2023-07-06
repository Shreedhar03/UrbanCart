import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserInfo from './UserInfo'
import Navbar from '../Navbar'
import { AppContext } from '../../App'
import UpdateInfo from './ChangePassword'

const Profile = () => {
    const { token, data } = useContext(AppContext);
    const navigate = useNavigate();
    return (

        <>
            <Navbar />

            {
                token ?
                    <section className='p-6 flex justify-center'>
                        <div className='flex flex-col gap-8'>
                            <h2 className='text-2xl'>Your Account</h2>
                            <div className='flex items-center gap-6'>
                                <button className='user-icon w-20 h-20 bg-[var(--secondary)] rounded-full text-black text-4xl'>{data?.userData?.name.slice(0, 1).toUpperCase()}</button>
                                <div>
                                    <p className='text-xl'>{data?.userData?.name}</p>
                                    <p>{data?.userData?.address}</p>
                                </div>
                            </div>
                            <div className='flex gap-12 sm:gap-4 md:gap-24 flex-wrap'>
                                <UserInfo />
                                <UpdateInfo />
                            </div>
                        </div>
                    </section>
                    :
                    <p className='text-center text-2xl my-24' onClick={() => { navigate('/login') }}><button>Login to Continue</button></p>
            }
        </>
    )
}

export default Profile
