"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useRenameBoardStore } from '@/store/RenameBoards'
import { Button } from './ui/button'
import toast from 'react-hot-toast'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

function ActionInput() {

    const {isOpen, onClose,initialValue} = useRenameBoardStore()
    const [titleChange, setTitleChange] = useState("")
    const rename = useMutation(api.board.rename);
  return (
    
    <Dialog onOpenChange={onClose} open={isOpen} >
        <form>
            <DialogTrigger>Hello</DialogTrigger>
            <DialogHeader>Rename Board Name</DialogHeader>
            <DialogContent className='mt-8'>
                <input 
                type="text" 
                defaultValue={initialValue.title} 
                onChange={(e)=> setTitleChange(e.target.value)}
                value={titleChange}
                className='py-3 mt-8 border border-b-gray-200 rounded-sm  px-3 w-full text-sm'
               />
                <div className='flex justify-end items-center gap-4 my-3'>
                  <Button variant={"ghost"} onClick={onClose}>Cancel</Button>
                  <Button className='bg-green-500' onClick={()=>{
                    if(titleChange.length > 3){
                      //@ts-ignore
                        rename({_id: initialValue.id, title: titleChange})
                        .then(()=>{
                          toast.success("Renamed")
                          onClose()
                        }
                        )
                        
                    }else{
                      toast.error("title should be atleast 3 letters")
                    }
                  }} >Submit</Button>
                </div>
            </DialogContent>
        
        </form>
    </Dialog>

  )
}

export default ActionInput