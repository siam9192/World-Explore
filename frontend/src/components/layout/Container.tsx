import React from 'react'
interface Props {
    children:React.ReactNode
}

function Container({children}:Props) {
  return (
    <div className='container mx-auto lg:px-0 px-2 '>{children}</div>
  )
}

export default Container