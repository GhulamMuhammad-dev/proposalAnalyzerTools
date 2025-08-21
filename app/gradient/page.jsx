import React from 'react'

const page = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center flex-col gap-2'>
     
      <div className='  py-4 px-20  bg-linear-to-t from-primaryColor-200 to-primaryColor-700 text-darkColor                       '>Hlo</div>
      <div className='  py-4 px-20  bg-linear-to-b from-primaryColor-500 to-primaryColor-900 text-darkColor                       '>Hlo</div>
      <div className='  py-4 px-20  bg-linear-to-l from-primaryColor-300 to-primaryColor-700 text-darkColor                       '>Hlo</div>

      <div className='  py-4 px-20  bg-linear-to-t from-secondaryColor-400 to-secondaryColor-700 text-darkColor                       '>Hlo</div>

      <div className='  py-4 px-20  bg-linear-to-t from-secondaryColor-500 to-secondaryColor-900 text-darkColor                       '>Hlo</div>

      <div className='  p-[2px]  bg-linear-to-t from-lightColor  to-dimDarkColor text-darkColor                       '><h1 className='bg-darkColor text-lightColor py-4 px-20 '>Hlo</h1></div>


      <div className='  p-[2px]  bg-linear-to-r from-secondaryColor-500 to-secondaryColor-900  text-darkColor rounded                       '><h1 className='bg-darkColor text-lightColor py-4 px-20 hover:bg-linear-to-r hover:from-secondaryColor-500 hover:to-secondaryColor-900 cursor-pointer rounded transition duration-300 ease-in '>Hlo</h1></div>
    
    
    
    </div>
  )
}

export default page
