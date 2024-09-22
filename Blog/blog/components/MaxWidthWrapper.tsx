import React from 'react'
import { cn } from '@/lib/utils'

interface maxprops{
    classname: string
    children: React.ReactNode
}

const MaxWidthWrapper = ({classname, children}:maxprops) => {
  return (
    <div className={cn('ml-5 xl:mx-auto max-w-screen-xl w-full my-12 :', classname)}>
        {children}
    </div>
  )
}

export default MaxWidthWrapper