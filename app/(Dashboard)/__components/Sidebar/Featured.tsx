"use client"
import React from 'react'
import Image from 'next/image'
import { OrganizationSwitcher } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LayoutDashboard, Star } from 'lucide-react'
import { useSearchParams } from 'next/navigation'



function Featured() {
    const searchParams = useSearchParams()
    const favorites = searchParams.get("favorites")
  return (
    <div className='w-[200px] p-2  bg-green-400'>
       <div className='py-4'>
        logo
       </div>

       <div
       className='flex flex-col gap-3 justify-start items-center '
       >
        <OrganizationSwitcher
         hidePersonal
         appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              fontSize: "12px"
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #000000",
              background: "white"
              }
              }
             }}
        />
        <div 
        className='flex flex-col gap-2'
        >
          <Button 
           asChild
           variant={favorites ? "ghost" : "secondary"}
          >
            <Link 
            href={"/"} 
            className='flex  items-center  p-1 w-[140px]'>
              <LayoutDashboard />
              Team Boards
            </Link>

          </Button>

          <Button 
           asChild
           variant={favorites ? "secondary" : "ghost"}
          >
            <Link 
             href={{pathname: "/", query: {favorites: true}}} className='flex justify-start p-1  items-center  w-[140px]'>
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