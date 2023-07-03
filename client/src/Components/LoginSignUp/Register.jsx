import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import register from '../../assets/register.svg'
export default function Register() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({

        name: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
        address: ""
    })
    const [userExists, setUserExists] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(true)

    const handleChange = (x, value) => {
        setCredentials({ ...credentials, [x]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (credentials.password === credentials.confirmPassword) {
                setPasswordMatch(true)
                let res = await axios.post('http://localhost:5000/register', credentials)
                console.log(res.data)
                setUserExists(res.data.userIsPresent)
                if (res.data.success) {
                    navigate('/login')
                }
            }
            else{
                setPasswordMatch(false)
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }
    return (
        <>

            <section className="flex items-center justify-evenly flex-wrap h-screen bg-[var(--primary)]">

                <img src={register} alt="image_login" className='w-[400px] hidden lg:block' />

                <div className="flex flex-col items-center gap-8 sm:py-10 bg-[var(--primary)] text-white rounded-lg w-[330px] sm:w-[400px] xl:w-[520px]">
                    <p className="logo text-2xl sora font-semibold cursor-pointer" onClick={() => navigate('/')}>UrbanCart<span className='text-[var(--secondary)] ml-1 font-extrabold'>.</span></p>
                    <h1 className="text-2xl text-center text-[var(--secondary)]">Create Account</h1>
                    <form action="" className='flex flex-col gap-6 w-[90%] xl:w-[65%] sm:w-[75%]' onSubmit={handleSubmit}>
                        <input type="text" value={credentials.name} required placeholder='Full Name' onChange={(e) => { handleChange(e.target.name, e.target.value) }} name='name' className='focus:outline-none bg-[#143d5f] rounded-lg px-3 py-2' autoComplete='off' />
                        <input type="email" value={credentials.email} required placeholder='Email' autoComplete='off' onChange={(e) => { handleChange(e.target.name, e.target.value) }} name='email' className='focus:outline-none bg-[#143d5f] rounded-lg px-3 py-2' />
                        {userExists && <span className='text-red-500 text-sm'>Email already exists</span>}
                        <input type="text" value={credentials.contact} required placeholder='Contact' autoComplete='off' pattern='[0-9]{10}' onChange={(e) => { handleChange(e.target.name, e.target.value) }} name='contact' className='focus:outline-none bg-[#143d5f] rounded-lg px-3 py-2' />
                        <input type="password" value={credentials.password} required placeholder='Password' autoComplete='off' onChange={(e) => { handleChange(e.target.name, e.target.value) }} name='password' className='focus:outline-none bg-[#143d5f] rounded-lg px-3 py-2' />
                        <input type="password" value={credentials.confirmPassword} required placeholder='Confirm Password' autoComplete='off' onChange={(e) => { handleChange(e.target.name, e.target.value) }} name='confirmPassword' className='focus:outline-none bg-[#143d5f] rounded-lg px-3 py-2' />
                        {!passwordMatch && <span className='text-red-500 text-sm'>Passwords do not match</span>}
                        <textarea value={credentials.address} placeholder='Complete address' autoComplete='off' onChange={(e) => { handleChange(e.target.name, e.target.value) }} name='address' className='focus:outline-none bg-[#143d5f] rounded-lg px-3 py-2' />
                        <input type="submit" value="Register" className='bg-[var(--secondary)] rounded-lg py-2 text-[var(--primary)]' />
                        <p className=' self-center'>Already have an account? <Link to={'/login'} className='text-[var(--secondary)]'>Login</Link></p>
                    </form>
                </div>

            </section>

        </>
    )
}
