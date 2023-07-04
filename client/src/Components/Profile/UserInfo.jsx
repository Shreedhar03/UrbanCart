import React, { useContext, useState } from 'react'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import Data from './Data'
import axios from 'axios'
import ConfirmDelete from '../LoginSignUp/ConfirmDelete'

const UserInfo = () => {

    const { setToken, data } = useContext(AppContext)
    const [popUp, setPopUp] = useState(false)

    const navigate = useNavigate()
    const deleteUser = async (id) => {

        try {
            console.log(id)
            let res = await axios.delete(`http://localhost:5000/delete/${id}`)
            navigate('/')
            setToken(null)
            console.log(res.data.message)
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>

            <div className='flex flex-col relative justify-center w-[340px] sm:w-[500px] md:w-[600px]'>

                <div className={`flex flex-col gap-8 mx-auto w-full bg-green-00 ${popUp && 'opacity-10'}`}>

                    <div className="info flex flex-col gap-6 bg-blue-40 w-full">
                        <p className='text-xl'>Personal Information</p>
                        <div className='flex flex-col gap-2 w-full bg-red-00'>
                            <Data value="name" field="Name" info={data?.userData?.name} data={data?.userData}/>
                            <Data value="username" field="Username" info={data?.userData?.username} data={data?.userData}/>
                            <Data pattern="[0-9]{10}" value="contact" field="Contact" info={data?.userData?.contact} data={data?.userData}/>
                            <Data value="address" field="Address" info={data?.userData?.address} data={data?.userData}/>
                        </div>
                    </div>

                    <button className='text-lg bg-red-500 self-start px-3 py-1 rounded-lg' onClick={() => {
                        setPopUp(!popUp)
                    }}>Delete Account</button>
                </div>

                {popUp && <ConfirmDelete handleDelete={() => { deleteUser(data?.userData?._id) }} handlePopUp={() => { setPopUp(!popUp) }} />}

            </div>

            
        </>
    )
}

export default UserInfo
