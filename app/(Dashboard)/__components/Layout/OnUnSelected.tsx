import Image from "next/image";
import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { CreateOrganization } from "@clerk/nextjs";

const poppins = Poppins({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
});

function OnUnSelected() {

  return (
    <div className="h-full w-full flex justify-center items-center bg-white">
      <div className="flex flex-col gap-5 justify-center items-center ">
        <div>
          <Image src={"bag.svg"} height={200} width={200} alt="" />
        </div>

        <div className="flex justify-center items-center flex-col">
          <p className={` ${poppins.className} font-semibold text-xl `}>
            Welcome to Board
          </p>
          <p className={cn(poppins.className, "text-sm text-gray-500")}>
            Create an organization to get started
          </p>

              <Dialog>
          <Button className="my-4 text-md  " asChild>
                 <DialogTrigger> Create Organization</DialogTrigger>
          </Button>

                 <DialogContent className="absolute lg:top-12 top-20 lg:left-80 z-20 left-5">
                   <CreateOrganization />
                 </DialogContent>
              </Dialog>
        </div>
      </div>
    </div>
  );
}

export default OnUnSelected;
