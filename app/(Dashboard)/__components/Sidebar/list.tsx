"use client"
import React from 'react'
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Hint from '@/components/ui/hint';

interface OrganizationProps {
    name: string,
    id: string,
    key: string,
    url: string
}


function List({name, id, url}:OrganizationProps) {

    const {setActive} = useOrganizationList();
    const {organization} = useOrganization()

    const isActive = organization?.id === id 

    const handleClick = ()=>{
        try {
            if(!setActive) return 

            setActive({organization: id})
            
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <Hint align={"center"} label={name} sideOffset={13} side='right' >

    <div className='cursor-pointer'>
        <Image 
         src={url}
         alt={name}
         onClick={handleClick}
         height={100}
         width={100}
         className={cn("rounded-sm size-8", isActive && "bg-white border-2 border-black ")}
         />

    </div>
         </Hint>
  )
}

export default List