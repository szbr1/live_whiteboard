"use client"
import React from 'react'
import { OrganizationSwitcher } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LayoutDashboard, Star } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'



function Featured() {
    const searchParams = useSearchParams()
    const favorites = searchParams.get("favorites")
  return (
    <div className='w-[200px] p-2 h-screen  hidden lg:block'>
       <div className=' flex  px-2 items-center gap-2 py-4 pb-8 uppercase'>
        <Image src={"bag.svg"} height={20} width={20} alt='' />
        <p className='font-semibold text-md'>CarryBoard</p>
       </div>

       <div
       className='flex flex-col gap-3 justify-start items-center '
       >
        <Button variant={"outline"} className='w-[160px] p-0'>

        <OrganizationSwitcher
         hidePersonal
         appearance={{
           elements: {
             rootBox: {
               display: 'flex',
               justifyContent: "space-between",
               alignItems: "center",
               width: "100%",
               fontSize: "12px"
              },
              organizationSwitcherTrigger: {
                padding: "6px",
                width: "100%",
                borderRadius: "4px",
               
              }
            }
          }}
          />
          </Button>
        <div 
        className='flex flex-col gap-2'
        >
          <Button 
           asChild
           variant={favorites ? "ghost" : "secondary"}
          >
            <Link 
            href={"/"} 
            className='flex  items-center  p-1 w-[160px]'>
              <LayoutDashboard />
              Team Boards
            </Link>

          </Button>

          <Button 
           asChild
           variant={favorites ? "secondary" : "ghost"}
          >
            <Link 
             href={{pathname: "/", query: {favorites: true}}} className='flex justify-start p-1  items-center  w-[160px]'>
               <Star />
               Faviorte Board
            </Link>

          </Button>

          
        </div>
       </div>
    </div>
  )
}

export default Featured