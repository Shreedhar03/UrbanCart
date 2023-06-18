import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import register from '../../assets/register.svg'
export default function Register() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({

        name: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (x, value) => {
        setCredentials({ ...credentials, [x]: value })
    }
    return (
        <>

            <section className="flex items-center justify-evenly flex-wrap my-8">

            <img src={register} alt="image_login" className='w-[400px] hidden lg:block'/>

                <div className="flex flex-col items-center gap-8 py-10 bg-slate-200 rounded-lg w-[420px]">
                    <p className="logo text-2xl sora font-semibold cursor-pointer" onClick={() => navigate('/')}>UrbanCart<span className='text-[var(--primary)] ml-1 font-extrabold'>.</span></p>
                    <h1 className="text-2xl text-center font-semibold text-[var(--primary)]">Create Account</h1>
                    <form action="" className='flex flex-col items-center gap-6'>
                        <div className="flex flex-col w-[120%] gap-1">
                            <input type="text" value={credentials.name} placeholder='Full Name' onChange={(e) => { handleChange(e.target.name, e.target.value) }} name='name' id='name' className='focus:outline-none rounded-lg px-3 py-2' autoComplete='off' />
                        </div>
                        <div className="flex flex-col w-[120%] gap-1">
                            <input type="email" value={credentials.email} placeholder='Email' autoComplete='off' onChange={(e) => { handleChange(e.target.name, e.target.value) }} name='email' id='email' className='focus:outline-none rounded-lg px-3 py-2' />
                        </div>
                        <div className="flex flex-col w-[120%] gap-1">
                            <input type="number" value={credentials.contact} placeholder='Contact' autoComplete='off' onChange={(e) => { handleChange(e.target.name, e.target.value) }} name='contact' id='contact' className='focus:outline-none rounded-lg px-3 py-2' />
                        </div>
                        <div className="flex flex-col w-[120%] gap-1">
                            <input type="password" value={credentials.password} placeholder='Password' autoComplete='off' onChange={(e) => { handleChange(e.target.name, e.target.value) }} name='password' id='password' className='focus:outline-none rounded-lg px-3 py-2' />
                        </div>
                        <div className="flex flex-col w-[120%] gap-1">
                            <input type="password" value={credentials.confirmPassword} placeholder='Confirm Password' autoComplete='off' onChange={(e) => { handleChange(e.target.name, e.target.value) }} name='confirmPassword' id='cPassword' className='focus:outline-none rounded-lg px-3 py-2' />
                        </div>
                        <input type="submit" value="Register" className='bg-[var(--primary)] rounded-lg py-2 text-slate-100 w-[120%]' />

                        <p>Already have an account? <Link to={'/login'} className='text-[var(--primary)]'>Login</Link></p>
                    </form>
                </div>

            </section>

        </>
    )
}
