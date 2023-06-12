import React,{useState} from 'react'

export default function Size() {

    const [size, setSize] = useState(2)

    const handleChange = (e) => {
        setSize(e.target.value)
    }

    const sizes = ["S", "M", "L", "XL", "XXL"]

    return (
        <>
            <div className="size flex flex-col gap-2">
                <h2 className='text-xl'>Select Size</h2>
                <div className='flex gap-2'>
                    <input type="range" name="size" id="size" min={0} max={4} step={1} value={size} onChange={handleChange} />
                    <p className='text-lg bg-black text-white w-12 h-8 rounded-xl flex items-center justify-center'>{sizes[size]}</p>
                </div>
            </div>
        </>
    )
}
