import React from 'react'
import ProductCategory from '../ProductCategory'

export default function Category() {

    const images = ["https://img.freepik.com/free-psd/minimal-living-room-with-classic-sofa-carpet-interior-design-ideas_176382-1528.jpg?size=626&ext=jpg&ga=GA1.1.397493846.1668271889&semt=sph",
        "https://img.freepik.com/free-vector/household-appliances-realistic-composition_1284-65307.jpg?size=626&ext=jpg&ga=GA1.1.397493846.1668271889&semt=ais",
        "https://img.freepik.com/free-photo/clothing-rack-with-floral-hawaiian-shirts-hangers-hat_23-2149366018.jpg?size=626&ext=jpg&ga=GA1.1.397493846.1668271889&semt=sph",
        "https://img.freepik.com/premium-psd/shoes-3d-rendering-isolated_625075-30.jpg?size=626&ext=jpg&ga=GA1.1.397493846.1668271889&semt=sph",
        "https://img.freepik.com/premium-psd/floating-laptops-mockup-design-rendering_80802-1149.jpg?size=626&ext=jpg&ga=GA1.2.397493846.1668271889&semt=sph",
        "https://img.freepik.com/free-vector/ui-design-concept-with-clock-collection-web-elements-task-application-illustration_1284-44785.jpg?size=626&ext=jpg&ga=GA1.2.397493846.1668271889&semt=ais",
        "https://img.freepik.com/premium-psd/realistic-purple-phone-screen-mockup_99366-526.jpg?size=626&ext=jpg&ga=GA1.1.397493846.1668271889&semt=ais",
        "https://images.unsplash.com/photo-1673442598728-71caf1f15820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyZnVtZSUyMGNvbGxlY3Rpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        "https://media.istockphoto.com/id/1136422297/photo/face-cream-serum-lotion-moisturizer-and-sea-salt-among-bamboo-leaves.webp?b=1&s=170667a&w=0&k=20&c=5oz0kcPJV_1adVbwNdkFt-X5tTOfBWTZevStbZEyi_Q=",
        "https://img.freepik.com/premium-photo/minimalist-living-room-interior-stylish-house-with-design-velvet-sofa-carpet-floor-brown-wooden-furniture-plant-book-pendant-lamp_431307-2672.jpg?size=626&ext=jpg&ga=GA1.2.397493846.1668271889&semt=ais"        
    
    ]

    return (
        <>
            <div className="flex flex-col max-w-[90%]  mx-auto gap-8 py-12">
                <h3 className='text-2xl font-semibold'>Shop Our Top Categories</h3>
                <section className='flex overflow-scroll lg:flex-wrap gap-8 snap-mandatory snap-x'>
                    <ProductCategory src={images[5]} search="watches" category="Watches" />
                    <ProductCategory src={images[0]} search="furniture" category="Furniture" />
                    <ProductCategory src={images[1]} search="appliances" category="Appliances" />
                    <ProductCategory src={images[4]} search="laptops" category="Laptops" />
                    <ProductCategory src={images[2]} search="clothing" category="Clothing" />
                    {/* <ProductCategory src={images[8]} search="skincare" category="SkinCare" /> */}
                    <ProductCategory src={images[3]} search="footware" category="Footware" />
                    <ProductCategory src={images[6]} search="smartphones" category="Smartphones" />
                    <ProductCategory src={images[9]} search="home-decoration" category="Home" />
                    {/* <ProductCategory src={images[7]} search="fragrances" category="Fragrances" /> */}
                </section>
            </div>
        </>
    )
}
