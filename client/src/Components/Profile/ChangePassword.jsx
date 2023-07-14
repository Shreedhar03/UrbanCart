import React, { useContext, useState } from 'react'
import { AppContext } from '../../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const UpdateInfo = () => {
    const [credentials, setCredentials] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    })
    const notify = (msg) => toast(msg)
    const [message,setMessage] = useState(null)
    const { data,setToken } = useContext(AppContext)

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    const updateData = async (e,id) => {
        e.preventDefault();
        try {
            let res = await axios.put(`http://localhost:5000/update-password/${id}`, credentials)
            console.log(res.data)
            if(res.data.success){
                setMessage(null)
                notify(res.data.message)
                    localStorage.removeItem("authToken")
                    setToken(null)
            }else{
                setMessage(res.data.message)
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }
    return (
        <div className='flex flex-col gap-6 w-80 md:w-96 md:px-12 md:border-l-2 border-slate-300'>
            <h2 className='text-xl'>Change Password</h2>
            <form className='flex flex-col gap-4' onSubmit={(e) => { updateData(e,data.userData._id) }}>
                <input type="password" className='bg-slate-200 rounded-lg px-2 py-2 text-sm focus:outline-none' required placeholder='Old Password' name='oldPassword' value={credentials.oldPassword} onChange={(e) => { handleChange(e) }} />
                {message && <span className='text-sm text-red-500'>{message}</span>}
                <input type="password" className='bg-slate-200 rounded-lg px-2 py-2 text-sm focus:outline-none' required placeholder='New Password' name='newPassword' value={credentials.newPassword} onChange={(e) => { handleChange(e) }} />
                <input type="password" className='bg-slate-200 rounded-lg px-2 py-2 text-sm focus:outline-none' required placeholder='Confirm New Password' name='confirmNewPassword' value={credentials.confirmNewPassword} onChange={(e) => { handleChange(e) }} />
                <input type="submit" value="Update" className='bg-[var(--secondary)] py-2 rounded-lg' />
            </form>
        </div>
    )
}

export default UpdateInfo
