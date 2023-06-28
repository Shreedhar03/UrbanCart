import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import login from '../../assets/login.svg'
export default function Login() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    })

    const handleChange = (x, value) => {
        setCredentials({ ...credentials, [x]: value })
    }
    return (
        <>

            <section className="flex flex-row-reverse items-center justify-evenly flex-wrap h-screen">

                <img src={login} alt="image_login" className='w-[400px] hidden lg:block' />
                <div className="container-main flex flex-col items-center gap-10 py-16 bg-[var(--primary)] text-white w-[420px] rounded-lg">
                    <p className="logo text-2xl sora font-semibold cursor-pointer" onClick={() => navigate('/')}>UrbanCart<span className='text-[var(--secondary)] ml-1 font-extrabold'>.</span></p>
                    <h1 className="text-2xl text-center text-[var(--secondary)]">Log in To Your Account</h1>
                    <form action="" className='flex flex-col gap-8 w-9/12 items-center'>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor='email'>Email</label>
                            <input type="text" value={credentials.email} onChange={(e) => { handleChange(e.target.name, e.target.value) }} name='email' id='email' className='bg-[#143d5f] focus:outline-none rounded-lg px-3 py-2' autoComplete='off' />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor='password'>Password</label>
                            <input type="password" value={credentials.password} onChange={(e) => { handleChange(e.target.name, e.target.value) }} name='password' id='password' className='bg-[#143d5f] focus:outline-none rounded-lg px-3 py-2' />
                        </div>
                        <input type="submit" value="Submit" className='bg-[var(--secondary)] rounded-lg py-2 self-stretch text-slate-100' />
                        <p>New User? <Link to={'/register'} className='text-[var(--secondary)]'>Create account</Link></p>
                    </form>
                </div>
                </section>
            </>
            )
}
