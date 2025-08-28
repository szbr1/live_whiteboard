"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { useOrganization } from '@clerk/nextjs'

interface MessageProps {
  message: string,
  imageUrl: string
  btn? : string
}

function SearchResults({message, imageUrl, btn, }:MessageProps ) {

  const createApi = useMutation(api.board.create)
  const {organization} = useOrganization()


  return (
    <div className='h-[calc(100vh-70px)] w-full flex justify-center items-center flex-col gap-6  font-semibold'>
      <Image
       src={imageUrl}
       height={300}
       width={300}
       alt=''
      />
      <p className='text-4xl '>
        {message}
      </p> 
      {
        btn ? <Button onClick={
                                ()=>{
                                  if(!organization) return 
                                  createApi({id:organization.id, title:"Untitled"})
                                }
                              }
           className={cn("py-4 cursor-pointer px-8")}>{btn}</Button>
        : null
      }
    </div>
  )
}

export default SearchResults