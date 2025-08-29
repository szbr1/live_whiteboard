import {mutation} from "./_generated/server"
import {v} from "convex/values";

  
const images = [
   "/1.svg",
   "/2.svg",
   "/3.svg",
   "/4.svg",
   "/5.svg",
   "/6.svg",
   "/7.svg",
   "/8.svg",
   "/9.svg"
]

export const create = mutation({

    args: {
            id: v.string(), 
            title: v.string()
          },
    handler: async(ctx , arg)=>{
         
        // clerk user details
        const identity = await ctx.auth.getUserIdentity()

        // user can't create board if he is not logged in.
        if(!identity) return ;

        // this will choose a random image for board
        const randomImage = images[Math.floor(Math.random()*images.length)]

        // this will save this in database
        const board =  await ctx.db.insert("boards", {
            authorId: identity.subject,
            orgId: arg.id,
            title: arg.title,
            imageUrl: randomImage,
            authorName: identity.name!,
            name: "Untitled"
        })

        return board;
    }
})