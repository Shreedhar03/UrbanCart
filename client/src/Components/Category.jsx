import React from 'react'
import ProductCategory from './ProductCategory'

export default function Category() {

    const images = ["https://img.freepik.com/free-psd/minimal-living-room-with-classic-sofa-carpet-interior-design-ideas_176382-1528.jpg?size=626&ext=jpg&ga=GA1.1.397493846.1668271889&semt=sph",
        "https://img.freepik.com/free-vector/household-appliances-realistic-composition_1284-65307.jpg?size=626&ext=jpg&ga=GA1.1.397493846.1668271889&semt=ais",
        "https://img.freepik.com/free-photo/clothing-rack-with-floral-hawaiian-shirts-hangers-hat_23-2149366018.jpg?size=626&ext=jpg&ga=GA1.1.397493846.1668271889&semt=sph",
        "https://img.freepik.com/premium-psd/shoes-3d-rendering-isolated_625075-30.jpg?size=626&ext=jpg&ga=GA1.1.397493846.1668271889&semt=sph",
        "https://img.freepik.com/premium-psd/floating-laptops-mockup-design-rendering_80802-1149.jpg?size=626&ext=jpg&ga=GA1.2.397493846.1668271889&semt=sph",
        "https://img.freepik.com/free-vector/ui-design-concept-with-clock-collection-web-elements-task-application-illustration_1284-44785.jpg?size=626&ext=jpg&ga=GA1.2.397493846.1668271889&semt=ais",
        "https://img.freepik.com/premium-psd/realistic-purple-phone-screen-mockup_99366-526.jpg?size=626&ext=jpg&ga=GA1.1.397493846.1668271889&semt=ais"]

    return (
        <>
            <div className="flex flex-col max-w-[90%]  mx-auto gap-8 py-12">
                <h3 className='text-2xl font-semibold'>Shop Our Top Categories</h3>
                <section className='flex overflow-scroll lg:flex-wrap gap-8'>
                    <ProductCategory src={images[5]} category="Watches"/>
                    <ProductCategory src={images[0]} category="Furniture"/>
                    <ProductCategory src={images[1]} category="Appliances"/>
                    <ProductCategory src={images[4]} category="Laptops"/>
                    <ProductCategory src={images[2]} category="Clothing"/>
                    <ProductCategory src={images[3]} category="Footware"/>
                    <ProductCategory src={images[6]} category="Smartphones"/>
                </section>
            </div>
        </>
    )
}
