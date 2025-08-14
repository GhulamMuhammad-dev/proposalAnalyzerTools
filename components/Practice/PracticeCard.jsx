'use client'
import React from 'react'

const PracticeCard = () => {
  return (
    <>
    <section className='w-full  gap-4 h-screen flex items-center justify-center bg-gray-900'>
    <h1>PracticeCard.jsx</h1>
    <div className='w-[300px] h-[400px] border border-gray-700 rounded-lg p-6  text-white relative overflow-hidden'>
      <div className='w-[100%] h-[40%] bg-purple-700 absolute bottom-0 left-0 blur-3xl '></div>
      <div className='w-[100%] h-[20%] bg-purple-400 absolute bottom-0 left-0 blur-2xl '></div>
      <div className='w-[600px] h-[10%] bg-amber-100 absolute bottom-10 left-0 blur-2xl mix-blend-plus-lighter '></div>
      <div className='w-[100%] h-[100%] bg-linear-to-t from-white/10 to-white/0 absolute top-0 left-0 backdrop-blur-2xl  '></div>
      {/* <div className='relative z-10 flex flex-col items-center justify-center h-full'> */}
      <div className=' z-10 relative'>
      <h2 className='text-2xl font-bold mb-4'>Practice Card</h2>
      <p className='text-gray-300 mb-6'>This is a practice card component designed to showcase a simple layout with background effects.</p>
      <button className='px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition duration-300 ease-in-out'>
        Click Me
      </button>
      <div className='absolute top-2 right-2 text-gray-400 hover:text-white transition duration-300 ease-in-out cursor-pointer'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        </div>
        </div>
    </div>

    <div className='w-[300px] h-[400px] border border-gray-700 rounded-lg p-6  text-white relative overflow-hidden'>
      <div className='w-[40%] h-[100%] bg-purple-700 absolute right-0 top-20 rotate-45 blur-3xl '></div>
      <div className='w-[20%] h-[100%] bg-purple-400 absolute right-0 top-20   rotate-45  blur-2xl '></div>
      {/* <div className='w-[20%] h-[100%] bg-purple-400 absolute  top-2/4 left-2/4 -translate-2/4  blur-2xl '></div> */}
      <div className='w-[20%] h-[100%] bg-amber-100 absolute  right-0 top-20  rotate-45  blur-2xl mix-blend-plus-lighter '></div>
      
      {/* <div className='w-[100%] h-[100%] bg-linear-to-t from-white/10 to-white/0 absolute top-0 left-0 backdrop-blur-2xl  '></div> */}

      <div className="bg-[url('/images/noise.png')]  top-0 left-0  w-[100%] h-[100%] mix-blend-overlay opacity-15 absolute "></div>




      {/* <div className='relative z-10 flex flex-col items-center justify-center h-full'> */}
      <div className=' z-10 relative'>
      <h2 className='text-2xl font-bold mb-4'>Practice Card</h2>
      <p className='text-gray-300 mb-6'>This is a practice card component designed to showcase a simple layout with background effects.</p>
      <button className='px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition duration-300 ease-in-out'>
        Click Me
      </button>
      <div className='absolute top-2 right-2 text-gray-400 hover:text-white transition duration-300 ease-in-out cursor-pointer'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        </div>
        </div>
    </div>




    <div className='w-[300px] h-[400px] border border-gray-700 rounded-lg p-6  text-white relative overflow-hidden'>
      <div className='w-[40%] h-[100%] bg-gray-700 absolute right-0 top-24 rotate-45 blur-3xl '></div>
      <div className='w-[20%] h-[100%] bg-gray-400 absolute right-0 top-24   rotate-45  blur-2xl '></div>
      {/* <div className='w-[20%] h-[100%] bg-purple-400 absolute  top-2/4 left-2/4 -translate-2/4  blur-2xl '></div> */}
      <div className='w-[20%] h-[100%] bg-amber-100 absolute  right-0 top-24  rotate-45  blur-2xl mix-blend-plus-lighter '></div>
      
      {/* <div className='w-[100%] h-[100%] bg-linear-to-t from-white/10 to-white/0 absolute top-0 left-0 backdrop-blur-2xl  '></div> */}

      <div className="bg-[url('/images/noise.png')]  top-0 left-0  w-[100%] h-[100%] mix-blend-overlay opacity-15 absolute "></div>




      {/* <div className='relative z-10 flex flex-col items-center justify-center h-full'> */}
      <div className=' z-10 relative'>
      <h2 className='text-2xl font-bold mb-4'>Practice Card</h2>
      <p className='text-gray-300 mb-6'>This is a practice card component designed to showcase a simple layout with background effects.</p>
      <button className='px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition duration-300 ease-in-out'>
        Click Me
      </button>
      <div className='absolute top-2 right-2 text-gray-400 hover:text-white transition duration-300 ease-in-out cursor-pointer'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        </div>
        </div>
    </div>
    
    </section>
    </>
  )
}

export default PracticeCard
