"use client"
import React from 'react'
import OnUnSelected from './__components/Layout/OnUnSelected'
import { useOrganization } from '@clerk/nextjs'

// interfaces or types

interface ParamsInteface {
  searchParams: {
    search?: string,
    favorites?: string
  }
}

function Page({searchParams }: ParamsInteface) {
  const {organization} = useOrganization()
  return (
    <div className='h-[calc(100vh-70px)] w-full overflow-y-auto'>
      {
        !organization ?    <OnUnSelected />  : 

        <div>
           {JSON.stringify(searchParams)}
        </div>
      }
   
      
    </div>
  )
}

export default Page