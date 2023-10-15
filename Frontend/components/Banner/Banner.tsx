import Image from "next/image";



const Banner = () => {
    return (
        <main>
            <div className="px-6 lg:px-8">
                <div className="mx-auto max-w-7xl pt-16 sm:pt-20 pb-20 banner-image">
                    <div className="text-center"> 
                    <br />
                        <h1 className="text-4xl font-semibold text-navyblue sm:text-5xl  lg:text-7xl md:4px lh-96">
                        Track and Stay Updated<br />   with Hashtags on Twitter .
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-bluegray">
                        Monitor specific Twitter hashtags, stay connected with conversations and trending topics, collect real-time posts,<br /> receive instant notifications, and stay ahead of the curve!
                        </p>
                    </div>


                  <br /> 
                  <br /> <br />
                  <br /> 
                  <br />
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/assets/logo/3.png" alt="banner-image" style={{ width: '230%', height: 'auto', maxHeight: '500px' }} />
</div>



                </div>
            </div>
        </main>
    )
}

export default Banner;
