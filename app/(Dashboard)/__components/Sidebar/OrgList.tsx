"use client"
import React from 'react'
import {Plus} from "lucide-react"
import { CreateOrganization } from '@clerk/nextjs'
import { Dialog,DialogTrigger,DialogContent  } from '@radix-ui/react-dialog'
import ListOrg from '../Navbar/ListOrg'
import Hint from '@/components/ui/hint'

function OrgList() {

    
  return (
    <div className='h-screen w-[60px] flex justify-start items-center gap-1 flex-col p-1 bg-slate-100'>
        <ListOrg />
        <Dialog>
            <DialogTrigger asChild className=' w-full bg-green-500  flex justify-center'>
                <Hint label='Create Organization' sideOffset={13} side='right' align={"center"}> 

                <button className=''>
                    <Plus className='bg-gray-300 hover:bg-gray-400 cursor-pointer text-white  size-8 p-1 rounded-xs' />
                </button>
                </Hint>

            </DialogTrigger>

            <DialogContent className='md:ml-18 p-0 max-w-[480px] 
            '>
                  <CreateOrganization  />
            </DialogContent>

        </Dialog>
       
    </div>
  )
}

export default OrgList