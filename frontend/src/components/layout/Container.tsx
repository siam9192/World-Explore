import React from 'react'
interface Props {
    children:React.ReactNode
}

function Container({children}:Props) {
  return (
    <div className='container mx-auto lg:px-0 md:px-2 px-1'>{children}</div>
  )
}

export default Container