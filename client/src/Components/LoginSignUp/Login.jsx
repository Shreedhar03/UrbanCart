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

            <section className="flex flex-row-reverse items-center justify-evenly flex-wrap my-8">

                <img src={login} alt="image_login" className='w-[400px] hidden lg:block' />
                <div className="container-main flex flex-col items-center gap-14 py-16 bg-slate-200 w-[420px] rounded-lg">
                    <p className="logo text-2xl sora font-semibold cursor-pointer" onClick={() => navigate('/')}>UrbanCart<span className='text-[var(--primary)] ml-1 font-extrabold'>.</span></p>
                    <h1 className="text-xl text-center font-semibold text-[var(--primary)]">Login To Continue</h1>
                    <form action="" className='flex flex-col items-center gap-8'>
                        <div className="flex flex-col gap-2">
                            <label htmlFor='email' className='text-xl'>Email</label>
                            <input type="text" value={credentials.email} onChange={(e) => { handleChange(e.target.name, e.target.value) }} name='email' id='email' className='focus:outline-none rounded-lg px-3 py-2 text-xl' autoComplete='off' />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor='password' className='text-xl'>Password</label>
                            <input type="password" value={credentials.password} onChange={(e) => { handleChange(e.target.name, e.target.value) }} name='password' id='password' className='focus:outline-none rounded-lg px-3 py-2 text-xl' />
                        </div>
                        <input type="submit" value="Submit" className='bg-[var(--primary)] rounded-lg py-2 self-stretch text-slate-100' />
                        <p>New User? <Link to={'/register'} className='text-[var(--primary)]'>Create account</Link></p>
                    </form>
                </div>
                </section>
            </>
            )
}
