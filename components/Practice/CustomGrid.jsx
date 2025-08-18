import React from "react";

const CustomGrid = () => {
  return (
    <section className="bg-gray-800 text-white min-h-screen flex items-center justify-center p-6">
      <div className="grid grid-cols-1 grid-rows-3 gap-4 sm:grid-cols-1 sm:grid-rows-3 sm:gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-2 lg:grid-cols-2 lg:grid-rows-2 lg:gap-2 xl:grid-cols-2 xl:grid-rows-2 xl:gap-2 p-4 bg-gray-900 w-full h-[600px]">
        
        <div className="bg-blue-400 p-4 rounded-lg shadow-md text-center font-bold 
          col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1 xl:col-span-2 xl:row-span-1">
          Box 1
        </div>

        <div className="bg-blue-400 p-4 rounded-lg shadow-md text-center font-bold 
          col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1 xl:col-span-1 xl:row-span-1">
          Box 2
        </div>

        <div className="bg-blue-400 p-4 rounded-lg shadow-md text-center font-bold 
          col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1 xl:col-span-1 xl:row-span-1">
          Box 3
        </div>
      </div>
    </section>
  );
};

export default CustomGrid;
