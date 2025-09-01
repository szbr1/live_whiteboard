"use client"

import React from 'react';
import {Link2, Pen} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { DropdownMenuContentProps, DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import toast from 'react-hot-toast';
import { Button } from './button';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useRenameBoardStore } from '@/store/RenameBoards';


interface DropDownProps {
       
    children?: React.ReactNode,
    side: DropdownMenuContentProps["side"],
    sideOffset: DropdownMenuContentProps["sideOffset"],
    id: string,
    title?: string   
}

function Actions({children, side, sideOffset, id, title}: DropDownProps) {
  const {onOpen} = useRenameBoardStore()
  const remove = useMutation(api.board.remove)
  const CopyHandler = ()=>{
    navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
    toast.success("url copied")
  }
   
  return (
    <div className='absolute top-2 right-2'>
        <DropdownMenu>
             <DropdownMenuTrigger >
                {children}
             </DropdownMenuTrigger>
             <DropdownMenuContent className='w-[158px]' onClick={(e) => e.stopPropagation()}  side={side} sideOffset={sideOffset} >

              <DropdownMenuItem>
               <Button variant={"ghost"} onClick={CopyHandler} className='w-full flex items-center justify-start cursor-pointer '>
                 <Link2 className='size-4 mr-2' /> Copy url 
               </Button>
              </DropdownMenuItem>
              
               <DropdownMenuItem>
               <Button variant={"ghost"} onClick={()=>{
              // @ts-ignore
                remove({_id: id}).then(toast.success("Deleted")).catch(err => console.error)
                
              }} className='w-full flex items-center justify-start cursor-pointer '>
                 <Link2 className='size-4 mr-2' /> Delete
               </Button>
               </DropdownMenuItem>

               <DropdownMenuItem onClick={()=> onOpen(id, title!) } >
               <Button variant={"ghost"}  className='w-full flex items-center justify-start cursor-pointer '>
               <Pen className='size-4 mr-2' /> Rename
               </Button>
                
               </DropdownMenuItem>

             </DropdownMenuContent>
 

        </DropdownMenu>
    </div>
  )
}

export default Actions