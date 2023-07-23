import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import edit from '../../assets/edit.svg'
import cross from '../../assets/cross.svg'
import correct from '../../assets/correct.svg'
import axios from 'axios'
import { AppContext } from '../../App'

const Data = (props) => {

    const { setToken, cart, setCart } = useContext(AppContext)
    const [update, setUpdate] = useState()
    const [showEdit, setShowEdit] = useState(false)

    const notify = (msg) => toast(msg)
    const updateData = async (e, field, id) => {
        e.preventDefault();
        try {
            let res = await axios.put(`/update-${field}/${id}`, { field: update })
            console.log(res.data.message)
            notify(res.data.message)
            if (res.data.success) {
                setShowEdit(false)
                if (field === "username") {
                    localStorage.removeItem("authToken")
                    setToken(null)
                }
                setCart(!cart)
                // window.location.reload();

            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const handleChange = (e) => {
        setUpdate(e.target.value)
    }

    return (
        <>
            <div className='flex justify-between bg-red-20'>

                {!showEdit ?
                    <>
                        <p className='py-2 text-lg bg-purpl-400 w-1/3 sm:w-1/4 sora'>{props.field}</p>
                        <div className='py-2 px-4 flex items-center justify-between w-3/4 bg-purpl-600'>
                            <p className='sora'>  : <span className='ml-4'>{props.info}</span></p>
                            <button onClick={() => { setShowEdit(true) }}><img src={edit} alt="edit-icon" className='w-6 h-6 cursor-pointer' /></button>
                        </div>
                    </>
                    :
                    <form className='flex' onSubmit={(e) => { updateData(e, props.value, props.data._id) }}>
                        <input type="text" required name={props.field} placeholder={props.field} value={update} pattern={props.pattern} onChange={handleChange} autoComplete='off' className='focus:outline-none bg-slate-200 px-4 py-2 w-60 rounded-l-lg text-sm' />

                        <button className='text-sm bg-slate-200 flex items-center' onClick={() => { setShowEdit(false) }}><img src={cross} className='w-6' alt="" /></button>
                        <button type="submit" className='text-sm bg-slate-200 rounded-r-lg px-3 flex items-center'><img src={correct} className='w-6' alt="" /></button>
                    </form>}
            </div>
        </>

    )
}

export default Data
