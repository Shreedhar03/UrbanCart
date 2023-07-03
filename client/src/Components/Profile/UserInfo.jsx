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

            <div className='flex flex-col relative w-80'>

                <div className={`flex flex-col gap-8 mx-auto w-full bg-green-40 ${popUp && 'opacity-10'}`}>

                    <div className="info flex flex-col gap-6 bg-blue-40 w-full">
                        <p className='text-xl'>Personal Information</p>
                        <div className='flex flex-col gap-2 w-full'>
                            <Data field="Name" info={data?.userData?.name} />
                            <Data field="Email" info={data?.userData?.email} />
                            <Data field="Contact" info={data?.userData?.contact} />
                            <Data field="Address" info={data?.userData?.address} />
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
