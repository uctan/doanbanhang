import React from 'react'
import {
    FaCarSide,
    FaHeadphonesAlt,
    FaWallet,
    FaCheckCircle,
} from "react-icons/fa"

const ServiceData = [
    {
        id: 1,
        icon: <FaCarSide className="text-7xl md:text-8xl text-brandBlue" />,
        title: (
          <h2 className="text-2xl md:text-3xl font-bold">
              Free Shipping
          </h2>
      ),
      description: (
          <p className="text-xl md:text-2xl">
              Free Shipping On All Order
          </p>
      ),
    },
    {
        id: 2,
        icon: <FaCheckCircle className="text-7xl md:text-8xl text-brandBlue" />,
        title: (
          <h2 className="text-2xl md:text-3xl font-bold">
              Safe Money
          </h2>
        ),
        description: (
          <p className="text-xl md:text-2xl">
              30 days Money Back
          </p>
      ),
    },
    {
        id: 3,
        icon: <FaWallet className="text-7xl md:text-8xl text-brandBlue" />,
        title: (
          <h2 className="text-2xl md:text-3xl font-bold">
              Secure Payment
          </h2>
        ),
        description: (
          <p className="text-xl md:text-2xl">
              Secure Payment
          </p>
      ),
    },
    {
        id: 4,
        icon: <FaHeadphonesAlt className="text-7xl md:text-8xl text-brandBlue" />,
        title: (
          <h2 className="text-2xl md:text-3xl font-bold">
              Online Suport 24/7
          </h2>
        ),
        description: (
          <p className="text-xl md:text-2xl">
              Technical Suport 24/7
          </p>
      ),
    },
]

const Service = () => {
  return <div>
    <div className="container my-14 md:my-20">
    <div className="grid grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">

          {ServiceData.map((data) => (
            <div className="flex flex-col items-start sm:flex-row gap-4">
              {data.icon}
              <div>
                <h1 className="lg:text-xl font-bold">{data.title}</h1>
                <h1 className="text-gray-400 text-sm">{data.description}</h1>
              </div>
              
           </div>
        ))}
       </div>
    </div>
  </div>
}

export default Service