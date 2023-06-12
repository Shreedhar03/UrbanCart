import React from 'react'

export default function Checkbox(props) {
    return (
        <>
            <input type="radio" name="colour" id={props.id} value={props.value} className='hidden' onClick={(e) => { console.log(e.target.id) }} />
            <div className="flex p-[2px] border-2 border-transparent rounded-full radio-div">
                <label htmlFor={props.id} className='w-[30px] h-[30px] cursor-pointer rounded-full text-2xl'
                    style={{ background: props.colour }}>{props.label}</label>
            </div>
        </>
    )
}
