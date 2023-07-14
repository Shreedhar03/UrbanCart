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
            let res = await axios.put(`http://localhost:5000/update-${field}/${id}`, { field: update })
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
            <div className='flex justify-between items-center bg-red-20 w-full bg-slate-0'>

                {!showEdit ?
                    <>
                        <p className='py-2 text-lg w-[30%] sm:w-[40%] bg-purple-40'>{props.field}</p>
                        <div className='py-2 px-4 w-[70%] sm:w-[60%] flex items-center justify-between gap-3 bg-purple-00'>
                            <p className='w-[90%]'>{props.info}</p>
                            <span onClick={() => { setShowEdit(true) }} className='w-[10%]'><img src={edit} alt="edit-icon" className='w-6 h-6 cursor-pointer' /></span>
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
