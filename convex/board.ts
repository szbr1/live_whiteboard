import {mutation, query} from "./_generated/server"
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


export const remove = mutation({
  args: {_id: v.id("boards")},
  handler: async (ctx, arg)=>{
    const identity =await ctx.auth.getUserIdentity();

    if(!identity) return;

    if(!arg._id) throw Error("Id needed to delete")

    await ctx.db.delete(arg._id)

 }
})

export const rename = mutation({
  args: {_id: v.id("boards"), title: v.string()},
  handler: async (ctx , arg)=>{
    const identity =await  ctx.auth.getUserIdentity();

    if(!identity) return;

    const board = await ctx.db.patch(arg._id , {title: arg.title})

    return board
  }
})


export const favorite = mutation({
  args: {_id: v.id("boards"), orgId: v.string()},

  handler : async (ctx, arg) =>{
       const identity =await ctx.auth.getUserIdentity()
       if(!identity) return;
       if(!arg._id) return ;

       const userId = identity.subject
       
       const isFavoriteExisting =  await ctx.db.query("favorite").withIndex("by_user_org_board", q => q
                                                                                                  .eq("boardId", arg._id)
                                                                                                  .eq("orgId", arg.orgId)
                                                                                                  .eq("userId", userId)
                                                                                                ).unique()
      if(isFavoriteExisting){
        throw new Error("Board is Already Favorited")
      }                 
      
      await ctx.db.insert("favorite", {boardId: arg._id, orgId: arg.orgId, userId: userId} )
      
       
  } 

  


})




export const unFavorite = mutation({
  args: {_id: v.id("boards"), orgId: v.string()},

  handler : async (ctx, arg) =>{
       const identity =await ctx.auth.getUserIdentity()
       if(!identity) return;
       if(!arg._id) return ;

       const userId = identity.subject
       
       const isFavoriteExisting = await ctx.db.query("favorite").withIndex("by_user_org_board", q => q
                                                                                                  .eq("boardId", arg._id)
                                                                                                  .eq("orgId", arg.orgId)
                                                                                                  .eq("userId", userId)
                                                                                                ).unique()
      if(!isFavoriteExisting){
        throw new Error("Board is Not Favorited")
      }                 
      
      await ctx.db.delete(isFavoriteExisting._id)
      
       
  } 

  


})