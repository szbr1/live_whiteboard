import {mutation} from "./_generated/server"
import {v} from "convex/values";

  
const images = [
    "/"
]

export const create = mutation({

    args: {
            id: v.string(), 
            title: v.string()
          },
    handler: async(ctx , arg)=>{
         

        const identity = await ctx.auth.getUserIdentity()
        if(!identity) return ;

        const board =  await ctx.db.insert("boards", {
            authorId: identity.subject,
            orgId: arg.id,
            title: arg.title,
            imageUrl: identity.pictureUrl!,
            authorName: identity.name!,
            name: "Untitled"
        })

        return board;
    }
})