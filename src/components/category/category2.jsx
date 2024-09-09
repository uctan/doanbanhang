import React from 'react';
import Image1 from "../../assets/category/gaming.png";
import Image2 from "../../assets/category/vr.png";
import Image3 from "../../assets/category/speaker.png";
import Button from '../ButtonTaliwind/button';

const Category2 = () => {
  return (
    <div className="py-8" style={{marginTop : '6px'}}>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-2 h-auto py-10 pl-5 bg-gradient-to-br from-gray-300/90 to-gray/100 text-white rounded-3xl relative flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-gray-400">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">Laptop</p>
                <Button text="Browse" bgColor="bg-primary" textColor={"text-white"} />
              </div>
            </div>
            <img src={Image1} alt="" className="w-[280px] absolute -right-2 lg:top-[30px]" />
          </div>
          <div className="py-10 pl-5 bg-gradient-to-br from-brandGreen/90 to-brandGreen/90 text-white rounded-3xl relative h-[320px] flex items-start">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white-400">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl  xl:text-5xl font-bold opacity-20 mb-2">Earphone</p>
                <Button text="Browse" bgColor="bg-white" textColor={"text-brandGreen"} />
              </div>
            </div>
            <img src={Image2} alt="" className="w-[240px] absolute bottom-0 -right-5 " />
          </div>

          <div className="py-10 pl-5 bg-gradient-to-br from-brandBlue to-brandBlue/90 text-white rounded-3xl relative h-[320px] flex items-start">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-gray-400">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">Gadget</p>
                <Button text="Browse" bgColor="bg-white" textColor={"text-brandBlue"} />
              </div>
            </div>
            <img src={Image3} alt="" className="w-[220px] absolute -right-4 lg:top-[50px]" />
          </div>

          {/*row 3 */}
         
        </div>
      </div>
    </div>
  );
};

export default Category2;
