import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '../../index.css'
import axios from 'axios'
import register from '../../assets/register.svg'
import show from '../../assets/show.svg'
import hide from '../../assets/hide.svg'
import { AppContext } from '../../App';
export default function Register() {
    const navigate = useNavigate();

    const notify = (message) => toast(message);
    const { token } = useContext(AppContext)
    const [credentials, setCredentials] = useState({

        name: "",
        username: "",
        contact: "",
        password: "",
        confirmPassword: "",
        address: ""
    })
    const [userExists, setUserExists] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    const handlePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (credentials.password === credentials.confirmPassword) {
                setPasswordMatch(true)
                let res = await axios.post('/register', credentials)
                console.log(res.data)
                setUserExists(res.data.userIsPresent)
                if (res.data.success) {
                    navigate('/login')
                    notify("Registrarion Successfull !")
                }
                else {
                    notify("Something went wrong !")
                }
            }
            else {
                setPasswordMatch(false)
            }
        }
        catch (err) {
            console.log(err.message)
        }

    }

    useEffect(() => {
        token && navigate('/')
    })
    return (
        <>

            <section className="flex items-center justify-evenly flex-wrap h-[calc(100vh-116px)] lg:h-[calc(100vh-68px)] w-screen bg-[var(--primary)]">

                <img src={register} alt="image_login" className='w-[400px] hidden lg:block' />

                <div className="flex flex-col items-center mb-12 lg:mb-0 gap-8 bg-[var(--primary)] text-white rounded-lg w-[330px] sm:w-[400px] xl:w-[520px]">
                    {/* <p className="logo text-2xl sora font-semibold cursor-pointer" onClick={() => navigate('/')}>UrbanCart<span className='text-[var(--secondary)] ml-1 font-extrabold'>.</span></p> */}
                    <h1 className="text-2xl text-center text-[var(--secondary)]">Create Account</h1>
                    <form className='flex flex-col gap-6 w-[90%] xl:w-[65%] sm:w-[75%] items-cener' onSubmit={handleSubmit}>
                        <input type="text" value={credentials.name} required placeholder='Full Name' onChange={(e) => { handleChange(e) }} name='name' className='focus:outline-none bg-[#143d5f] rounded-lg px-3 py-2' autoComplete='off' />
                        <input type="text" value={credentials.contact} required placeholder='Contact' maxLength={10} autoComplete='off' pattern='[0-9]{10}' onChange={(e) => { handleChange(e) }} name='contact' className='focus:outline-none bg-[#143d5f] rounded-lg px-3 py-2' />
                        <input type="text" value={credentials.username} required placeholder='Username' autoComplete='off' onChange={(e) => { handleChange(e) }} name='username' className='focus:outline-none bg-[#143d5f] rounded-lg px-3 py-2' />
                        {userExists && <span className='text-red-500 text-sm'>Username already exists</span>}
                        <div className='flex relative'>
                            <input type={showPassword ? 'text' : 'password'} value={credentials.password} required placeholder='Password' autoComplete='off' onChange={(e) => { handleChange(e) }} name='password' className='focus:outline-none bg-[#143d5f] rounded-lg w-full px-3 py-2' />
                            <button type='button' className='absolute w-7 top-[6px] right-3' onClick={handlePassword}>
                                <img src={showPassword ? show : hide} className='w-full' alt="icon" />
                            </button>
                        </div>
                        <div className='flex relative'>
                            <input type={showPassword ? 'text' : 'password'} value={credentials.confirmPassword} required placeholder='Confirm Password' autoComplete='off' onChange={(e) => { handleChange(e) }} name='confirmPassword' className='focus:outline-none bg-[#143d5f] rounded-lg w-full px-3 py-2' />
                            <button type='button' className='absolute w-7 top-[6px] right-3' onClick={handlePassword}>
                                <img src={showPassword ? show : hide} className='w-full' alt="icon" />
                            </button>
                        </div>
                        {!passwordMatch && <span className='text-red-500 text-sm'>Passwords do not match</span>}
                        {/* <textarea value={credentials.address} placeholder='Complete address' autoComplete='off' onChange={(e) => { handleChange(e) }} name='address' className='focus:outline-none bg-[#143d5f] rounded-lg px-3 py-2' /> */}
                        <input type="submit" value="Register" className='bg-[var(--secondary)] rounded-lg py-2 text-[var(--primary)] self-stretch' />
                        <p className=' self-center'>Already have an account? <Link to={'/login'} className='text-[var(--secondary)]'>Login</Link></p>
                    </form>
                </div>

            </section>

        </>
    )
}
