import React from 'react'

const Gradient = () => {
  return (
    <>
    <section className='w-full p-4 flex items-center justify-center bg-gray-900'>
      {/* <div className='w-[300px] h-[400px] border border-gray-700 rounded-lg p-6 bg-gray-800 text-white relative overflow-hidden'>
        <div className='w-full h-full absolute top-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-50 blur-3xl'></div>
        <div className='relative z-10'>
            <h2 className='text-2xl font-bold mb-4'>Gradient Background</h2>
            <p className='text-gray-300 mb-6'>This component showcases a gradient background with a simple card layout.</p>
            <button className='px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition duration-300 ease-in-out'>
                Click Me
            </button>
            <div className='absolute top-2 right-2 text-gray-400 hover:text-white transition duration-300 ease-in-out cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
      </div> */}

      
      <div className='flex flex-col items-center justify-center gap-4'>
      <div className='w-[600px] h-[80px] rounded-2xl bg-linear-to-t from-red-600 to-red-900 '></div>
      <div className='w-[600px] h-[80px] rounded-2xl bg-linear-to-r from-red-600 to-red-900 '></div>
      <div className='w-[600px] h-[80px] rounded-2xl bg-linear-to-bl from-red-600 to-red-900 '></div>
      <div className='w-[600px] h-[80px] rounded-2xl bg-linear-270 from-red-600 to-red-900 '></div>
      <div className='size-28 rounded-full bg-radial from-red-600 to-red-900 '></div>
      <div className='size-28 rounded-full bg-radial-[at_50%_75%] from-red-400 from-20% via-red-200 via-50% to-red-900 to-30% '></div>
      <div className='size-28 rounded-full bg-radial-[at_25%_25%] from-red-600 to-black '></div>
      <div className='size-28 rounded-full bg-linear-[85deg,red_5%,yellow_60%,lime_90%,teal] '></div>
      </div>
    </section>



    </>
  )
}

export default Gradient
