import React from 'react'
interface Props {
    children:React.ReactNode,
    className?:string
}

function Container({children,className}:Props) {
  return (
    <div className={`container mx-auto lg:px-0 px-2 ${className||""} `}>{children}</div>
  )
}

export default Container