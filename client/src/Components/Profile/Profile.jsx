import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserInfo from './UserInfo'
import { AppContext } from '../../App'
import ChangePassword from './ChangePassword'
import BottomNav from '../BottomNav'

const Profile = () => {
    const { token, data } = useContext(AppContext);
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(data)
    },[])
    return (

        <>

            {
                token ?
                    <section>
                        <div className='flex flex-col gap-8 max-w-4xl mx-auto bg-gray-30 p-6 mt-4'>
                            <h2 className='text-2xl'>Your Account</h2>
                            <div className='flex items-center gap-6'>
                                <button className='user-icon w-20 h-20 bg-[var(--secondary)] rounded-full text-black text-4xl sora'>{data?.userData?.name.slice(0, 1).toUpperCase()}</button>
                                <div>
                                    <p className='text-xl'>{data?.userData?.name}</p>
                                    {/* <p>{data?.userData?.address}</p> */}
                                </div>
                            </div>
                            <div className='flex gap-12 sm:gap-4 flex-col md:flex-row items-center w-full justify-between'>
                                <UserInfo />
                                <ChangePassword />
                            </div>
                            {/* <p className='bg-slate-500'>Hello</p> */}
                        </div>
                    </section>
                    :
                    <p className='text-center text-2xl my-24' onClick={() => { navigate('/login') }}><button>Login to Continue</button></p>
            }
            <BottomNav />
        </>
    )
}

export default Profile
