"use client"
import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Plus, Search } from 'lucide-react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { OrganizationProfile } from '@clerk/nextjs'
import { useDebounce } from 'use-debounce'
import qs from "query-string"
import { useRouter } from 'next/navigation'
function Navbar() {

  const [value , setValue] = useState<string>("");
  const [debouncing] = useDebounce(value, 500)
  const router = useRouter()

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
     try {
        setValue(e.target.value)
     } catch (error) {
        console.error(error)
     }
  }

  useEffect(()=>{
    const url = qs.stringifyUrl({url: "/", query: {search: debouncing}})
    router.push(url)
  },[debouncing,router])

  return (
    <div className='absolute top-0 right-0 w-full lg:pl-80 pl-18 pr-4 bg-white'>
      <div className='flex justify-center items-center gap-3 lg:px-12 py-2'>
      {/* header desktop */}
      <div className='w-full flex-1 relative hidden lg:block'>

        <Search 
         className='absolute top-1/2 size-5 text-gray-300 left-5 -translate-1/2'
         />

        <input
         type="text" 
         onChange={handleChange}
         className='w-full border rounded-sm pl-10 border-gray-300 py-2 max-w-[700] text-gray-400' placeholder='Search'
        />

        
      </div>

      <div className='flex-1 w-full lg:hidden px-2'>
        {/* header mobile  */}
        <Button variant={"outline"} asChild >
        <OrganizationSwitcher
         hidePersonal
         appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth: "374px",
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
        </Button>
      </div>

            <Dialog>
               <DialogTrigger className="">
        <Button  variant={"outline"} className='text-gray-400 shadow-none mr-8 cursor-pointer w-[100px] tracking-wider' >
                <Plus className='size-4 mt-[3px] text-sm '/> Invite  
        </Button>
              </DialogTrigger>
              
              <DialogContent className='p-0 flex justify-center items-center my-3'>
                 <OrganizationProfile />
              </DialogContent>
            </Dialog>

      <UserButton />
      </div>


      </div>
  )
}

export default Navbar