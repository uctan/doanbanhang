import React from 'react'
import Heading from '../HeadingTaliwinds/heading'
import Img1 from "../../assets/blog/blog-1.jpg"
import Img2 from "../../assets/blog/blog-2.jpg"
import Img3 from "../../assets/blog/blog-3.jpg"

const BlogData = [
    {
        title: "How to choose perfect smartwatch",
        subtitle: "You can find the most advanced favorite technology products developed by smartshop, so choose us.",
        published : "Jan 20,2024 by Duy Tan",
        image: Img1,
    },
    {
        title: "How to choose perfect smartwatch",
        subtitle: "You can find the most advanced favorite technology products developed by smartshop, so choose us.",
        published : "Jan 20,2024 by Duy Tan",
        image: Img2,
    },
    {
        title: "How to choose perfect smartwatch",
        subtitle: "You can find the most advanced favorite technology products developed by smartshop, so choose us.",
        published : "Jan 20,2024 by Duy Tan",
        image: Img3,
    },
 
]
const Blog = ({ style }) => {
  return (
    <div style={{marginTop : '40px'}}>
        <div className="container">
          <Heading title ="Recent News" subtitle = {"Explore Our Blogs"}/>
          <div className= "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8 sm:gap-4 md:gap-7">
             {BlogData.map((data) => (
               <div>
                <div className="overflow-hidden rounded-2xl mb-2">
            <img
                src={data.image}
                alt=""
                className="w-full h-[220px] object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
            />
        </div>
        <div className="space-y-3"> 
            <p className="text-base text-gray-500"> 
                {data.published}
            </p>
            <p className="font-bold text-2xl line-clamp-1"> 
                {data.title}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 line-clamp-2"> 
                {data.subtitle}
            </p>
            </div>
        </div>
        ))}
          </div>
        </div>
    </div>
  )
}

export default Blog