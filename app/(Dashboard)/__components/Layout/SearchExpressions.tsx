"use client";
import SearchResults from "@/components/ui/SearchResults";
import React from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { Plus, Star } from "lucide-react";
import toast from "react-hot-toast";

interface SearchProps {
  orgId: string;
  searchParams: {
    search?: string;
    favorites?: boolean;
  };
}

type boardProps  = {
  authorId: string,
  orgId: string,
  title: string,
  imageUrl: string,
  authorName:  string,
  name: string
  
}

function SearchExpressions({ orgId, searchParams }: SearchProps) {
  const { organization } = useOrganization();
  const createApi = useMutation(api.board.create);
  const data = useQuery(
    api.boards.get,
    organization ? { orgId: organization.id } : "skip"
  );

  if (!organization) return null;

  if (data === undefined) {
    return <SearchResults message="Loading..." imageUrl="/loading.svg" />;
  }

  if (orgId && !searchParams.search && !searchParams.favorites && !data?.length) {
    return (
      <SearchResults
        message="Create Your Board"
        imageUrl="/clipboard.svg"
        btn="Create Board"
      />
    );
  }

  if (orgId && !searchParams.search && searchParams.favorites && !data?.length) {
    return <SearchResults message="favorites" imageUrl="/bag.svg" />;
  }

  if (orgId && searchParams.search && !data?.length) {
    return (
      <SearchResults
        message="No WhiteBoard Found"
        imageUrl="/not-found.svg"
      />
    );
  }

  if (orgId && data?.length) {
    return(

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-3 md:grid-cols-3 sm:grid-cols-2">
        {/* // create new board card  */}
        <div
        onClick={()=>{
          createApi({id: organization.id, title: "Untitled"})
          toast.success("Board Created")
        }}
         className="h-[22rem] group flex justify-center gap-2 items-center flex-col gap-3  w-full rounded-sm overflow-hidden relative border bg-blue-700  border-gray-200"
        >
           <Plus className="text-white size-20"/>
          <p className="text-xs text-gray-200">Add New Board</p> 
           {/* // overlay  */}
           <div className="absolute top-0 left-0 h-full w-full group-hover:bg-black/20   "></div>

        </div>

        {
          data.map((board: boardProps, index) => {
            return (
               <div
                className="h-[22rem] group  w-full rounded-sm overflow-hidden relative border border-gray-200"
                key={index + 1}>
                  {/* // overlay  */}
                  <div className="absolute top-0 left-0 h-full w-full group-hover:bg-black/10   "></div>


                    <div className="w-full h-[86%]">
                    <Image 
                     src={board.imageUrl}
                     height={100}
                     width={100}
                     alt={board.title}
                     className="w-full h-full object-cover"
                     />
                     </div>
                     <div className="px-2 flex justify-between w-full items-center ">
                      <p className="text-md py-2 font-semibold">{board.title}</p>
                      <div className="hidden group-hover:block cursor-pointer"><Star className="size-5" /></div>
                     </div>
                  
               </div>
            )
          })
        }
      </div>
    )
  }

  return null;
}

export default SearchExpressions;
