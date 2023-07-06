import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import login from '../../assets/login.svg'
import show from '../../assets/show.svg'
import hide from '../../assets/hide.svg'
import { AppContext } from '../../App';
export default function Login() {

    const notify = (message) => toast(message);

    const { token, setToken } = useContext(AppContext)
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    })
    const [errorMessage, setErrorMessage] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post('http://localhost:5000/login', credentials)
            // console.log(res.data)
            setErrorMessage(!res.data.user)
            if (res.data.user) {
                localStorage.setItem("authToken", res.data.authToken)
                notify("Logged In !")
                setTimeout(() => {
                    setToken(res.data.authToken)
                    navigate('/')
                }, 2000)

            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handlePassword=()=>{
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        token && navigate('/')
    })
    return (
        <>

            {
                <>

                    <section className="flex flex-row-reverse items-center justify-evenly flex-wrap h-screen bg-[var(--primary)] w-screen">

                        <img src={login} alt="image_login" className='w-[400px] hidden lg:block' />
                        <div className="container-main flex flex-col items-center gap-10 py-16 bg-[var(--primary)] text-white w-[420px] rounded-lg">
                            <p className="logo text-2xl sora font-semibold cursor-pointer" onClick={() => navigate('/')}>UrbanCart<span className='text-[var(--secondary)] ml-1 font-extrabold'>.</span></p>
                            <h1 className="text-2xl text-center text-[var(--secondary)]">Log in To Your Account</h1>
                            <form action="" className='flex flex-col gap-8 w-4/5' onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor='username'>Username</label>
                                    <input type="text" value={credentials.username} required onChange={(e) => { handleChange(e) }} name='username' id='username' className='bg-[#143d5f] focus:outline-none rounded-lg px-3 py-2' autoComplete='off' />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor='password'>Password</label>
                                    <div className='flex relative'>
                                        <input type={showPassword ? 'text' : 'password'} value={credentials.password} required onChange={(e) => { handleChange(e) }} name='password' id='password' className='bg-[#143d5f] focus:outline-none rounded-lg px-3 py-2 w-full' />
                                        <button type='button' className='absolute w-7 top-[6px] right-3' onClick={handlePassword}>
                                            <img src={showPassword ? show : hide} className='w-full' alt="icon" />
                                        </button>
                                    </div>
                                </div>

                                {errorMessage && <span className='text-sm text-red-500'>Invalid Credentials</span>}

                                <input type="submit" value="Submit" className='bg-[var(--secondary)] rounded-lg py-2 self-stretch text-slate-100' />
                                <p className='self-center'>New User? <Link to={'/register'} className='text-[var(--secondary)]'>Create account</Link></p>
                            </form>
                        </div>
                    </section>
                    <ToastContainer theme='dark' position='top-center' autoClose={2000} hideProgressBar={true} />
                </>
            }

        </>
    )
}
