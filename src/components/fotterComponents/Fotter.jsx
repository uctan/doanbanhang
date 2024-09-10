import React from 'react'
import { FaLocationArrow, FaMobileAlt } from 'react-icons/fa'
const FooterLinks = [
    {
        title: "Home",
        link: "/#",
    },
    {
        title: "About",
        link: "/#",
    },
    {
        title: "Contact",
        link: "/#",
    },
    {
        title: "Blog",
        link: "/#",
    },
]
const Fotter = () => {
  return (
    <div className="dark:bg-gray-950  bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 pb-20 pt-5">
            <div className ="py-8 px-4">
                <a href="#"className="text-brandBlue font-semibold tracking-widest text-2xl uppercase sm:text-3xl">
                    SmarteShop
                </a>
                <p className="text-gray-600 lg:pr-24 pt-3">
                Vietnam's leading technology products lead the digital. Products are made in Vietnam.
                </p>
                <p className="text-gray-500 mt-4">
                    Made with By Duy Tân
                </p>
                <a href="" target="_blank" className="inline-block bg-brandBlue/90 text-white py-2 px-4 mt-5 text-xl rounded-full">
                    Visit our Website Channel
                </a>

            </div>
            <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10">
                <div className="py-8 px-4">
                    <h1 className="text-xl font-bold sm:text-left mb-3">
                        Important Links
                    </h1>
                    <ul className="space-y-3">
                        {FooterLinks.map((data,index) => (
                            <li key={index}>
                              <a href={data.link} className="text-gray-400 hover:text-black duration-300">
                                {data.title}
                              </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="py-8 px-4">
                    <h1 className="text-xl font-bold sm:text-left mb-3">
                        Quicks Links
                    </h1>
                    <ul className="space-y-3">
                        {FooterLinks.map((data,index) => (
                            <li key={index}>
                              <a href={data.link} className="text-gray-400 hover:text-black duration-300">
                                {data.title}
                              </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="py-8 px-4 col-span-2 sm:col-auto">
                    <h1 className="text-xl font-bold sm:text-left mb-3">
                        Contact
                    </h1>
                  <div>
                    <div className="flex items-center gap-3">
                      <FaLocationArrow/>
                      <p>Gò Vấp, Hồ Chí Minh, Việt Nam</p>
                    </div>
                    <div className="flex items-center gap-3 mt-6">
                       <FaMobileAlt/>
                       <p>Nguyễn Trần Duy Tân</p>
                      <p>0399441272 </p>
                    </div>
                    
                  </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Fotter