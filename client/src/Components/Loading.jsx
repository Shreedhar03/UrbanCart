import React from 'react'

const Loading = () => {
  return (
    <>
      <div className="max-w-3xl mx-8 sm:mx-auto h-[70vh] flex items-center justify-center my-12 bg-gray-10">
        {/* <div class="flex justify-center items-center h-screen"> */}
          <div class="flex gap-7">
            <div class="h-6 w-6 rounded-full bg-blue-500 animate-pulse"></div>
            <div class="h-6 w-6 rounded-full bg-blue-500 animate-pulse"></div>
            <div class="h-6 w-6 rounded-full bg-blue-500 animate-pulse"></div>
          {/* </div> */}
        </div>

      </div>
    </>
  )
}

export default Loading
